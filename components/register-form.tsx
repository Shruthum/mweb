"use client"

import { useForm } from "react-hook-form"
import CardWrapper from "./card-wrapper"
import { z } from 'zod'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "./ui/form"
import { registerSchema } from "@/schemas/validate"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerservice } from "@/actions/service"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { FormError, FormSucess } from "./form-status"
import SpinnerInfinite from "./spinner"

export default function RegisterForm(){

    const [success,setSuccess] = useState<string | undefined>('')
    const [error,setError] = useState<string | undefined>('')
    const [open,setOpen] = useState<boolean>(false)
    const [isPending,startTransition] = useTransition()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })
    function onsubmit(values: z.infer<typeof registerSchema>){
        setError('')
        setSuccess('')
        startTransition(() => {
            registerservice(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }
    
    return (
        <CardWrapper
        headerLabel="Register"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account"
        message="Sign Up in Management Web"
        showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)}>
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="username" type="text" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type="email" placeholder = "example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="password"
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="********" type="password" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && <FormError message={error}/>}
                        {success && <FormSucess message={success} />}
                        <Button onClick={() => setOpen(true)} disabled = {isPending} type="submit" className="w-full" variant={"gradient"}>
                            {isPending? <SpinnerInfinite color="#FFFF" /> :"Register"}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}