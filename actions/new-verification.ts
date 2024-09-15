"use server"

import { db } from "@/lib/db"
import { getuserByEmail } from "./getuserdetails"
import { getVerificationTokenByToken } from "./verification_token"

export const newVerification = async(token: string) => {
    const exisiting_token = await getVerificationTokenByToken(token)
    if(!exisiting_token){
        return {
            error: "Token doesn't exists"
        }
    }
    const hasexpired = new Date(exisiting_token.expires) < new Date()
    if(hasexpired){
        return {
            error: "Token has expired"
        }
    }
    const existing_user = await getuserByEmail(exisiting_token.email)
    if(!existing_user){
        return {
            error: "Email doesn't exists"
        }
    }
    await db.user.update({
        where:{
            id: existing_user.id
        },
        data:{
            emailVerified: new Date(),
            email: exisiting_token.email
        }
    })
    await db.verificationToken.delete({
        where:{
            id: exisiting_token.id
        }
    })
    return {
        success: "Email Verified"
    }
}