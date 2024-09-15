"use client"

import CardWrapper from "./card-wrapper";
import SpinnerInfinite from "./spinner";
import { useState,useTransition} from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError, FormSucess } from "./form-status";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { tokenschema } from "@/schemas/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function NewVerificationForm(){
    
    const [ispending,startTransition] = useTransition()
    const [success,setSuccess] = useState<string | undefined>('')
    const [error,setError] = useState<string | undefined>('')
    const form = useForm<z.infer<typeof tokenschema>>({
        resolver: zodResolver(tokenschema),
        defaultValues:{
            token: ""
        }
    })
    const onsubmit = ({ token }: z.infer<typeof tokenschema>) => {
        startTransition(() => {
            if(!token){
                setError("Missing Token")
                return
            }
            newVerification(token)
                .then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
                .catch(() => {
                    setError("Something went wrong")
                })
        })
    }
    return(
        <CardWrapper
            headerLabel="Confirm your verification"
            backButtonHref="/auth/login"
            backButtonLabel="Back to Login"
        >
        {!success && !error ? <Form {...form} >
            <form className="px-4 md:px-20 space-y-4" onSubmit={form.handleSubmit(onsubmit)}>
                <FormField 
                    control={form.control}
                    name="token"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Token</FormLabel>
                            <FormControl>
                                <Input disabled={ispending} type="text" className="placeholder:text-red-500" placeholder="Enter token..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <Button disabled={ispending} className="w-full hover:shadow-md" variant={"gradient"}>
                    {ispending? <SpinnerInfinite color="#FFFF"/>: "Check Token"}
                </Button>
                    </form>
                </Form> : (
                    <div className="flex items-center justify-center">
                        <FormSucess message={success!} />
                        <FormError message={error!} />
                    </div>
                )}
        </CardWrapper>
    )
}