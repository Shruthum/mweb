"use client"

import { Button } from "./ui/button";
import { useState,useTransition } from "react";
import { CombinedSchema } from "./college-form";
import { college_schema } from "@/schemas/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import SpinnerInfinite from "./spinner";
import { FormError, FormSucess } from "./form-status";
import { del, update } from "@/actions/college-data/service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";

interface FormForUpdateAndDelete {
    code: string
}
export const UpdateForm = ({ code }: FormForUpdateAndDelete) => {

    const router = useRouter()
    const [error,setError] = useState<string | undefined>('')
    const [success,setSuccess] = useState<string | undefined>('')
    const [ispending,startTransition] = useTransition()
    const form = useForm<CombinedSchema>({
        resolver: zodResolver(college_schema),
        defaultValues:{
            code: "",
            email: "",
            heademaster: "",
            highersecondary: "",
            lowersecondary: "",
            phoneno: "",
            name: ""
        }
    })

    function onsubmit(values: CombinedSchema){
        startTransition(() => {
            update(code,values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })    
        })
        if(success!){
            setTimeout(() => {
                router.back()
            },500)
        }
    }

    return (
        <Card className="w-[450px] md:w-[680px] lg:w-[800px] mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl">Update College Details</CardTitle>
                <CardDescription>
                    Enter Information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)}>
                            <div className='space-y-4'>
                                <section className='grid grid-cols-3 gap-x-4'>
                                    <FormField 
                                        control={form.control}
                                        name='code'
                                        render={({field}) => (
                                            <FormItem className='col-span-1'>
                                                <FormLabel>Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter code' type='text' {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    <FormField 
                                        control={form.control}
                                        name='name'
                                        render={({field}) => (
                                            <FormItem className='col-span-2'>
                                                <FormLabel>College Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter Name' {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                </section>
                                    <FormField 
                                    control={form.control}
                                    name='heademaster'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Head Master Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Enter name' {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                <FormField 
                                    control={form.control}
                                    name='email'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder='example@gmail.com' type='email' {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <section>
                                    <FormLabel>Type of College</FormLabel>
                                    <div className='flex items-center justify-between gap-x-10 px-20'>
                                        <FormField 
                                            control={form.control}
                                            name='lowersecondary'
                                            render={({field}) => (
                                                <FormItem className='text-center'>
                                                    <FormLabel>8+</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='Y/N' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        <FormField 
                                            control={form.control}
                                            name='highersecondary'
                                            render={({field}) => (
                                                <FormItem className='text-center'>
                                                    <FormLabel>10+</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='Y/N' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                </section>
                                <FormField 
                                    control={form.control}
                                    name='phoneno'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Enter No.' {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                
                                <FormSucess message={success!}/>
                                <FormError message={error!} />
                                <Button disabled={ispending} variant={"gradient"} className='w-full'>
                                    {ispending? <SpinnerInfinite color='#FFFF'/>: "Update"}
                                </Button>
                            </div>
                        </form>
                    </Form>
            </CardContent>
        </Card>
    )
}

export const DeleteForm = ({ code }: FormForUpdateAndDelete) => {

    const router = useRouter()
    const [ispending,startTransition] = useTransition()
    function handleDelete(){
        startTransition(() => {
            del(code)
        })
        setTimeout(() => {
            router.replace('/work')
        },500)
    }

    return (
        <Card className="w-[450px] md:w-[680px] lg:w-[800px] mx-auto">
            <CardHeader>
                <CardTitle>Are you Sure?</CardTitle>
                <CardDescription>This Action will Delete the Data from database</CardDescription>
            </CardHeader>
            <CardContent>
                    <CardContent>
                        <form onSubmit={handleDelete} className="flex justify-end gap-x-2">
                            <Button variant={"ghost"} className="px-10" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button disabled={ispending} type="submit" className="px-10">
                                {ispending? <SpinnerInfinite color='#FFFF'/>: "Delete"}
                            </Button>
                        </form>
                    </CardContent>
            </CardContent>
        </Card>
    )
}