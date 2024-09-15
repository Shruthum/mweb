"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { IoMdExit } from 'react-icons/io'

export default function SignOut(){

    useGSAP(() => {
        gsap.fromTo(".button",{ opacity: 0,delay: 2 },{ opacity: 1,duration: 4 })
    })
    return (
        <Button onClick={() => signOut()} className="button rounded-full absolute p-4 top-[26px] right-20 md:right-11">
            <IoMdExit className="size-5"/>
        </Button>
    )
}
