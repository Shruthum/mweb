import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import type { NextAuthConfig } from 'next-auth'
import { loginSchema } from './schemas/validate'
import { getuserByEmail } from './actions/getuserdetails'
import bcrypt from 'bcryptjs'

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials){
                const validateFields = loginSchema.safeParse(credentials)
                if(validateFields.success){
                    const { email,password } = validateFields.data
                    const user = await getuserByEmail(email)
                    if(!user || !user.password) {
                        return null
                    }
                    const passwordMatch = await bcrypt.compare(password,user.password)
                    if(passwordMatch){
                        return user
                    }
                }
                return null
            }
        })
    ]
} satisfies NextAuthConfig