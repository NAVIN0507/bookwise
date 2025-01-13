"use server"

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
export const  signInWithCredentails= async(params :Pick<AuthCredentials , "email" | "password">) =>{
     const {email , password} = params;
     const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const {success} = await ratelimit.limit(ip);
    if(!success) return redirect("/too-fast")
    
try {
   
     
    const result = await signIn('credentials' ,{
        email,
        password,
        redirect:false
    })
    if(result?.error ){
        return {success : false , error : result.error}
    }
//  !  const data =  await db.select().from(users).where(eq(users.email , email))
  
 
    return {success : true } // !data
} catch (error) {
    console.log(error , "SignIN ERROR")
        return {success : false ,error :"Sign In Error"}
}
}
export const SignUp = async(params : AuthCredentials)=>{
    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const {success} = await ratelimit.limit(ip);
    if(!success) return redirect("/too-fast")
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