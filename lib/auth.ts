import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './db'
import { getuserById } from '@/actions/getuserdetails'
import { UserRole } from '@prisma/client'


export const { handlers:{ GET,POST },auth,signIn,signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    events:{
        async linkAccount({user}){
            await db.user.update({
                where:{
                    id: user.id
                },
                data:{
                    emailVerified: new Date()
                }
            })
        }
    },
    pages:{
        signIn: "/auth/login",
        error: "/auth/error"
    },
    callbacks:{
        async session({token,session}){
            if (token.sub && session.user){
                session.user.id = token.sub
            }
            if (token.role && session.user){
                session.user.role = token.role as UserRole
            }
            return session
        },
        async jwt({token}){
            if(!token.sub) return token
            const existing_user = await getuserById(token.sub)
            if(!existing_user){
                return token
            }
            token.role = existing_user.role
            return token
        }
    },
    ...authConfig
})