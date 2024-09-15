"use client"

export const runtime = "edge"
import { UpdateForm } from "@/components/update-delete";
import { useSearchParams } from "next/navigation";

export default function UpdatePage(){

    const searchparams = useSearchParams()
    const code = searchparams.get("code") as string
    return (
        <div>
            <UpdateForm code={code}/>
        </div>
    )
}