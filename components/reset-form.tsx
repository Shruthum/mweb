"use client"

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod"
import { resetSchema } from "@/schemas/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState,useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError, FormSucess } from "./form-status";
import { resetservice } from "@/actions/service";
import SpinnerInfinite from "./spinner";
import { useRouter } from "next/navigation";


export default function ResetForm() {

    const [ispending,startTransition] = useTransition()
    const [error,setError] = useState<string | undefined>('')
    const [success,setSuccess] = useState<string | undefined>('')
    const router = useRouter()
    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues:{
            email: ""
        }
    })
    function onsubmit(values: z.infer<typeof resetSchema>){
        setError('')
        setSuccess('')
        startTransition(() => {
            resetservice(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }
    useEffect(() => {
        if(success){
            router.push('/auth/newpassword')
        }
    },[success])
    return(
        <CardWrapper 
        headerLabel="Forgot your password"
        backButtonLabel="Back to Login"
        backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)}>
                    <div className="space-y-4">
                        <FormField 
                         control={form.control}
                         name="email"
                         render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={ispending} type="email" placeholder="reset password email..." {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )}
                        />
                        {error && <FormError message={error} />}
                        {success && <FormSucess message={success} />}
                        <Button disabled={ispending} type="submit" className="w-full" variant={"gradient"}>
                            {ispending? <SpinnerInfinite color="#FFFF"/>: "Send Reset Email"}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}