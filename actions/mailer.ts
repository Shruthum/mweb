"use server"

import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_MAIL!,
        pass: process.env.NODEMAILER_PASSWORD!
    }
})
export const sendingMail = (email: string) => {
    return {
        from: process.env.NODEMAILER_MAIL!,
        to: email
    }
}