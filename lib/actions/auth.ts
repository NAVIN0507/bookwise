"use server"

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
export const  signInWithCredentails= async(params :Pick<AuthCredentials , "email" | "password">) =>{
try {
    const {email , password} = params;
    const result = await signIn('credentials' ,{
        email,
        password,
        redirect:false
    })
    if(result?.error ){
        return {success : false , error : result.error}
    }
    return {success : true }
} catch (error) {
    console.log(error , "SignIN ERROR")
        return {success : false ,error :"Sign In Error"}
}
}
export const SignUp = async(params : AuthCredentials)=>{
     const {fullName , email , universityCard , universityId , password} = params;
     const existingUser = await db.select().from(users).where(eq(users.email , email)).limit(1);
     if(existingUser.length >0){
        return {success : false ,error :"User already exists"}

     }
     const hashedPassword = await hash(password , 10);
     try {
        await db.insert(users).values({
            fullName,
            email,
             universityId,
            password : hashedPassword,
            universityCard,
         });
         await signInWithCredentails({email , password})
        return {success : true }
         
     } catch (error) {
        console.log(error , "Signup ERROR")
        return {success : false ,error :"Sign up Error"}
     }
}