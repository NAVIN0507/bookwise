import {z} from "zod"
export const signUpSchema = z.object({
    fullName:z.string().min(3),
    email:z.string().email(),
    universityId:z.coerce.number(),
    universityCard:z.string().nonempty('University Card is required'),
    password:z.string().min(8)

})
export const signInSchema = z.object({
    
    email:z.string().email(),
    password:z.string().min(8)

})