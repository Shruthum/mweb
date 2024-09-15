"use server"

import { drizzle_db } from "@/drizzle/drizzle_client";
import { manage_schema } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getData(){
    try {
        const data = await drizzle_db.select().from(manage_schema).orderBy(manage_schema.code)
        return data
    } catch (error) {
        console.error("Bad fetching...")
    }
}

export async function getDataOfCollege(input:string | undefined){

    if(!input){
        return new Error("Problem fetching the data")
    }
    try {
        if(input.charAt(0) === '1'){
            const data = await drizzle_db.select().from(manage_schema).where(eq(manage_schema.code,input))
            return data
        }
        else if(input.charAt(0) === 'a'){
            const data = await drizzle_db.select().from(manage_schema).where(eq(manage_schema.name,input))
            return data
        }
        else if(input.charAt(0) === 'h'){
            const required_data = input.split(' ')[1]
            const data = await drizzle_db.select().from(manage_schema).where(eq(manage_schema.headmaster,required_data))
            return data
        }
        
    } catch (error) {
        console.error("Error while finding the data")
    }
}