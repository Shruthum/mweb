
import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    }),
    password: z.string({
        message:"Password is Required"
    })
})

export const registerSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    }),
    password: z.string().min(6,{
        message: "Password is Required & minimum 6 length"
    }),
    name: z.string().min(1,{
        message: "Name is Required"
    })
})

export const resetSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    })
})
export const tokenschema = z.object({
    token: z.string({
        message: "Token is Required"
    })
})
export const passwordResetSchema = z.object({
    password: z.string().min(6,{
        message: "Password is Required & minimum 6 length"
    }),
    confirmPassword: z.string().min(6,{
        message: "Password is required and should match password stated..."
    })
})
export const resetTokenSchema = tokenschema

export const college_schema = z.object({
    code: z.string({
        message: "Enter code"
    }),
    name: z.string({
        message: "Enter name of the College"
    }),
    heademaster: z.string({
        message: "Enter headmaster name"
    }),
    phoneno: z.string({
        message: "Enter phonenumber of college"
    }),
    email: z.string().email({
        message: "Enter email"
    }),
    highersecondary : z.string({
        message: "Required Yes or No"
    }),
    lowersecondary: z.string({
        message: "Required Yes or No"
    }),
    district: z.string({
        message: "District is required"
    }),
    block: z.string({
        message: "Block is required"
    }),
    police_station: z.string({
        message: "Required"
    })
})

export const input_schema = z.object({
    input: z.string({
        message: "Enter a code or College Name"
    })
})