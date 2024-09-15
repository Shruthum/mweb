"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home(){  
  return(
    <>
      <div className="flex-col flex items-center gap-y-2 justify-center h-full">
        <div className="p-4 text-center text-5xl md:text-6xl font-semibold bg-gradient-to-r text-transparent bg-clip-text from-pink-400 to-sky-500">
          <h1>Management Web</h1>
          <span className="text-xl md:text-3xl">
            Developed for Managing Colleges
            <p>and Admininstrative details.</p>
          </span>
        </div>
        <div className="flex gap-x-6">
          <Link href={"/auth/login"}>
            <Button size={"lg"} className="text-[1.1rem] px-10 shadow-md hover:shadow-2xl duration-150">
              Login
            </Button>
          </Link>
          <Link href={"/auth/register"}>
            <Button variant={"gradient"} size={"lg"} className="text-[1.1rem] px-8 shadow-md hover:shadow-2xl duration-150">
              Register    
            </Button>
          </Link>
        </div>   
      </div>
    </>
  )
}