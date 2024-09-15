"use client"

import { useTransition,useState } from "react"
import { useSearchParams } from "next/navigation"
import CardWrapper from "./card-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { passwordResetSchema } from "@/schemas/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import SpinnerInfinite from "./spinner"
import { Input } from "./ui/input"
import { newpasswordservice } from "@/actions/service"
import { FormError, FormSucess } from "./form-status"

export default function NewPasswordVerification(){

    const [error,setError] = useState<string | undefined>('')
    const [success,setSuccess] = useState<string | undefined>('')
    const paramSearch = useSearchParams()
    const token = paramSearch.get('token')
    const [ispending,startTransition] = useTransition()
    const form = useForm<z.infer<typeof passwordResetSchema>>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues:{
            password: "",
            confirmPassword: ""
        }
    })
    const onsubmit = ({ password,confirmPassword }: z.infer<typeof passwordResetSchema>) => {
        if(!token){
            setError('Token error....')
            return
        }
        if(!confirmPassword.includes(password)){
            setError('Passwords didnt Match')
            return
        }
        startTransition(() => {
            newpasswordservice({ password,confirmPassword },token)
                .then((data) => {
                    setSuccess(data?.success)
                    setError(data?.error)
                })
        })
    }
    return (
        <CardWrapper
         headerLabel="Reset Password Form"
         backButtonHref="/auth/login"
         backButtonLabel="Back to Login"
        >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onsubmit)}>
                    <div className="space-y-4">
                        <FormField 
                         control={form.control}
                         name="password"
                         render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="*******" {...field} className="placeholder:text-red-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )}
                        />
                        <FormField 
                         control={form.control}
                         name="confirmPassword"
                         render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="*******" {...field} className="placeholder:text-red-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )}
                        />
                        {success && <FormSucess message={success}/>}
                        {error && <FormError message={error} /> }
                        {!success && <Button variant={"gradient"} className="w-full">
                            {ispending? <SpinnerInfinite color="#FFFF" />: "Confirm"}
                        </Button>}
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}