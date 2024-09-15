"use server"

import bcrypt from 'bcryptjs'
import { loginSchema, passwordResetSchema, registerSchema, resetSchema } from "@/schemas/validate"
import { z } from 'zod'
import { db } from '@/lib/db'
import { signIn } from "@/lib/auth"
import { REDIRECT_ROUTE } from '@/lib/routes'
import { AuthError } from 'next-auth'
import { generatePasswordResetToken, generateVerificationToken } from './tokens'
import { getuserByEmail } from './getuserdetails'
import { sendingMail, transporter } from './mailer'
import { redirect } from 'next/navigation'
import { getPasswordResetTokenByToken } from './password-reset'

type RegisterType = z.infer<typeof registerSchema>
type SignInType = z.infer<typeof loginSchema>
type ResetType = z.infer<typeof resetSchema>
type PasswordResetType = z.infer<typeof passwordResetSchema>
type MailerType = "registration" | "passwordReset"

export const loginservice = async (values: SignInType ) => {
    //Here we can validate the passed values and we can parse it here using schemas safe parser
    const validateFields = loginSchema.safeParse(values)
    if(!validateFields.success){
        return { 
            error: "Invalid Fields"
         }
    }
    const { email,password } = validateFields.data
    const exisiting_user = await getuserByEmail(email)
    if(exisiting_user){
        try {
            await signIn("credentials",{
                email,
                password,
                redirectTo: REDIRECT_ROUTE
            })
        } catch (error) {
            if (error instanceof AuthError){
                switch(error.type){
                    case "CredentialsSignin": return {
                        error: "Invalid Credentials"
                    }
                    default: return {
                        error: "Something went wrong!"
                    }
                }
            }
            throw error
        }
        return {
            success: "Sign In Successfully"
        }
    }else{
        return {
            error: "Invalid Credentials"
        }
    }
}

export const registerservice = async(values: RegisterType ) => {
    const validateFields = registerSchema.safeParse(values)
    if(!validateFields.success){
        return { 
            error: "Invalid Fields"
         }
    }
    const { email,name,password } = validateFields.data
    const existing_user = await db.user.findUnique({
        where:{
            email
        }
    })
    if(existing_user){
        return {
            error: "Email already exists"
        }
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await db.user.create({
        data:{
            email: email,
            name : name,
            password: hashedPassword
        }
    })
    const { email : emailfromdb ,token } = await generateVerificationToken(email)
    await send(emailfromdb,token,"registration")
    return {
        success: "Confirmation Token Sent in Email!"
    }
}

export const resetservice = async(values: ResetType ) => {

    const validateFields = resetSchema.safeParse(values)
    if(!validateFields.success){
        return {
            error: "Invalid email!"
        }
    }
    const { email } = validateFields.data
    const exisiting_user = await getuserByEmail(email)
    if(!exisiting_user){
        return {
            error: "Email doesn't exists!"
        }
    }
    const { email: emailfromdb , token } = await generatePasswordResetToken(email)
    await send(emailfromdb,token,"passwordReset")
    return {
        success: "Reset Token Sent in Email!"
    }
}

export const newpasswordservice = async( values : PasswordResetType ,token:string) => {
    if(!token){
        return {
            error: "Missing Token"
        }
    }
    const validateFields = passwordResetSchema.safeParse(values)
    if(!validateFields.success){
        return {
            error: "Invalid Fields"
        }
    }
    const { password } = validateFields.data
    const existing_token = await getPasswordResetTokenByToken(token)
    if(!existing_token){
        return {
            error: "Invalid Token"
        }
    }
    const hasexpired = new Date(existing_token.expires) < new Date()
    if(hasexpired){
        return {
            error: "Token has expired"
        }
    }
    const existing_user = await getuserByEmail(existing_token.email)
    if(!existing_user){
        return {
            error: "Email doesn't exists"
        }
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await db.user.update({
        where: { id: existing_user.id },
        data: {
            password: hashedPassword
        }
    })
    await db.passwordResetToken.delete({
        where: { id: existing_token.id }
    })
    return {
        success: "Password reset successfully..."
    }
}
/**
 * send function will be used to send mail to the registered user
 * @param email 
 */
export const send = async (email :string,token:string,type_mail:MailerType) => {

    if(type_mail == "registration"){
        await transporter.sendMail({
            ...sendingMail(email),
            subject: "Registration Token",
            html: `Hello From ${process.env.NODEMAILER_MAIL}
                    Use this token to confirm your email
                   <p style={{color: red; font-size:20px;}}>${token}</p>
                   
                   <span>For safety delete this email because third party can use it to login to your system</span>
                   `
        })
        redirect(`/auth/newverify?token=${token}`)
    }else{
        await transporter.sendMail({
            ...sendingMail(email),
            subject: "Password Reset Token",
            html: `
                    Hello From ${process.env.NODEMAILER_MAIL}
                    Use this token to reset your password
                    <p>${token}</p>
                    <span>For safety delete this email because third party can use it to login to your system</span>
                  `
        })
        redirect(`/auth/newpassword?token=${token}`)
    }
}   