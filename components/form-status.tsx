"use client"

import { FaExclamationTriangle,FaCheck } from "react-icons/fa"
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import Link from "next/link"
interface FormErrorProps{
    message: string
}
interface FormSucessProps{
    message: string
}
export const FormError = ({message}:FormErrorProps) => {
    if(!message) return null
    return(
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <FaExclamationTriangle className="size-5" />
            <p>{message}</p>
        </div>
    )
}

export const FormSucess = ({message}:FormSucessProps) => {
    if(!message) return null
    return(
        <div className="bg-green-400/90 p-3 rounded-md flex items-center gap-x-2 text-sm text-white">
            <FaCheck className="size-5" />
            <p className="cursor-pointer">{message}</p>
        </div>
    )
}