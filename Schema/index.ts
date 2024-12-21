import * as z from "zod"

export const SignUpSchema = z.object({
 email: z.string().email({
    message: "Please enter a valid email address"
}),
name: z.string().min(1, {
    message: "Please enter your name"
}),
password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
}),
})

export const LogInSchema = z.object({
    email:z.string().email({
        message: "Please enter valid email "
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
})
