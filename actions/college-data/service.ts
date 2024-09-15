"use server"

import { drizzle_db } from "@/drizzle/drizzle_client"
import { CombinedSchema } from "@/components/college-form"
import { college_schema } from "@/schemas/validate"
import { manage_schema } from "@/drizzle/schema"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

export const add = async(values: CombinedSchema) => {
    
    const validateFields = college_schema.safeParse(values)
    if(!validateFields.success){
        return {
            error: "Invalid Fields"
        }
    }
    const { block,code,district,email,heademaster,highersecondary,lowersecondary,name,phoneno,police_station } = validateFields.data
    
    await drizzle_db.insert(manage_schema).values({
        code,
        block,
        district,
        email,
        headmaster: heademaster,
        highersecondary,
        loweersecondary: lowersecondary,
        name,
        phoneno,
        ps: police_station
    })
    revalidatePath('/work')
    return {
        success: "Data Added Successfully!"
    }
}

export const update = async(code:string,values: CombinedSchema) => {

    const validateFields = college_schema.safeParse(values)
    if(!validateFields.success){
        return {
            error: "Invalid Fields"
        }
    }
    await drizzle_db.update(manage_schema).set({
        code: values.code,
        phoneno: values.phoneno,
        email: values.email,
        headmaster: values.heademaster,
        highersecondary: values.highersecondary,
        loweersecondary: values.lowersecondary,
        name: values.name
    })
    .where(eq(manage_schema.code,code))
    
    revalidatePath('/work')
    return {
        success: "Data Updated Successfully!"
    }
}

export const del = async(code: string) => {

    await drizzle_db.delete(manage_schema).where(eq(manage_schema.code,code))
    revalidatePath('/work')
}