"use client"

import { college_schema } from '@/schemas/validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Separator } from './ui/separator'
import { useEffect, useState, useTransition } from 'react'
import SpinnerInfinite from './spinner'
import { add } from '@/actions/college-data/service'
import { FormError, FormSucess } from './form-status'

export type CombinedSchema = z.infer<typeof college_schema>

export default function CollegeForm(){

    const [open,setOpen] = useState(false)
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
            name: "",
            phoneno: "",
            block: "",
            district: "",
            police_station: ""
        }
    })
    function onsubmit(values: CombinedSchema){
        startTransition(() => {
            add(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })    
        })
        form.reset()
    }
    

    return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setOpen(true)} variant={"gradient"} size={"lg"}>Add College</Button>
                </DialogTrigger>
                <DialogContent  className='w-[30rem] md:w-[52rem]'>
                    <DialogHeader>
                        <DialogTitle className='text-3xl'>Add College Details</DialogTitle>
                        <DialogDescription>
                            Enter college information
                        </DialogDescription>
                    </DialogHeader>    
                    <Separator />
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
                                <section className='flex gap-x-4'>
                                    <FormField 
                                        control={form.control}
                                        name='block'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Block</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter Block' {...field}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                        />
                                    <FormField 
                                        control={form.control}
                                        name='district'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>District</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter District' {...field}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                        />
                                </section>
                                <FormField 
                                    control={form.control}
                                    name='police_station'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Police Station</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Police Station' {...field}/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
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
                                    {ispending? <SpinnerInfinite color='#FFFF'/>: "Add"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
    )
}