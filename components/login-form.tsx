"use client"

import CardWrapper from "./card-wrapper";
import { useForm } from 'react-hook-form'
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "./ui/form";
import { loginSchema } from "@/schemas/validate";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError,FormSucess } from "./form-status";
import { loginservice } from "@/actions/service";
import Link from "next/link";
import SpinnerInfinite from "./spinner";

export default function LoginForm(){

    const [isPending,startTransition] = useTransition()
    const [error,setError] = useState<string | undefined>('')
    const [success,setSucess] = useState<string | undefined>('')
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })
    function onsubmit(values: z.infer<typeof loginSchema>){
        setError('') 
        setSucess('')
        startTransition(() => {
            loginservice(values)
                .then((data) => {
                    setError(data?.error)
                    setSucess(data?.success)
                })
        })
    }
    return(
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account"
            backButtonHref="/auth/register"
            showSocial
            message="Sign In"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)}>
                    <div className="space-y-6">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type="email" placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <Button asChild variant={"link"} size={"sm"}>
                                        <Link href={"/auth/reset"} className="px-0">
                                            Forgot password ?
                                        </Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && <FormError message={error}/>}
                        {success && <FormSucess message={success} />}
                        <Button disabled={isPending} type="submit" className="w-full text-neutral-50" variant={'gradient'}>
                            {isPending? <SpinnerInfinite color={"#FFFF"} /> :"Sign In"}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}