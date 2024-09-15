"use client"

import Link from "next/link";
import PopOverMobile from "./popover-mobile";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"


export type Links = {
    href: string
    title: string
}
const links:Links[] = [
    {
        href: "/",
        title: "Home"
    },
    {
        href: "/work",
        title: "Work"
    },
    {
        href: "/contact",
        title: "Contact"
    },
    {
        href: "/about",
        title: "About"
    }
]
export default function Header(){

    useGSAP(() => {
        gsap.fromTo(".navbar",{ y : -80, delay: 2, opacity:0 },{ y : 10, opacity:1,duration:1 })
    })
    
    return (
        <div className="navbar max-w-4xl w-full absolute -translate-y-[100px] left-1/2 -translate-x-1/2">
            <div className="flex items-center justify-between gap-x-20 px-8 md:px-20 py-4 w-full bg-gradient-to-r from-pink-100/50 to-blue-50 rounded-full">
                <h1 className="font-bold text-3xl">
                    <Link href={"/"}>MWeb</Link>
                </h1>
                <nav className="hidden md:flex md:gap-x-1 md:items-center md:justify-end">
                    {links.map((item) => (
                        <Link className="button px-6 py-2" key={item.href} href={item.href}>
                            {item.title}
                        </Link>
                    ))}
                </nav>
                <PopOverMobile className="block md:hidden" links={links}/>
            </div>
        </div>
    )
}