"use client"

import { signIn } from 'next-auth/react'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import { Button } from './ui/button'
import { REDIRECT_ROUTE } from '@/lib/routes'
export default function Social(){

    const onClick = (provider: "google" | "facebook") => {
        signIn(provider,{
            callbackUrl: REDIRECT_ROUTE
        })
    }
    return(
        <div className="flex md:flex-row md:gap-x-2 flex-col items-center w-full gap-y-2">
            <Button className="w-full" variant={"outline"} onClick={()=> onClick("google")} >
                <FcGoogle className='size-5' />
            </Button>
            <Button className='w-full text-white' onClick={()=> onClick("facebook")}  variant={"facebook"}>
                <FaFacebook className='size-5' />
            </Button>
        </div>
    )
}