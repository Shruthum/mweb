import { db } from "@/lib/db";
export const getuserByEmail = async(email: string) => {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })
        return user
}

export const getuserById = async(id: string) => {
    const user = await db.user.findUnique({
        where:{
            id
        }
    }) 
    return user
}