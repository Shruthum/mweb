"use server"

import { v4 as uuidv4 } from 'uuid'
import { getVerificationTokenByEmail } from './verification_token'
import { db } from '@/lib/db'
import { getPasswordResetTokenByEmail } from './password-reset'

export const generateVerificationToken = async(email:string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existing_token = await getVerificationTokenByEmail(email)
    if(existing_token){
        await db.verificationToken.delete({
            where:{
                id: existing_token.id
            }
        })
    }
    const verification_token = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verification_token
}
export const generatePasswordResetToken = async(email:string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 10)
    const existing_token = await getPasswordResetTokenByEmail(email)
    if(existing_token){
        await db.passwordResetToken.delete({
            where: { id: existing_token.id }
        }) 
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return passwordResetToken
}