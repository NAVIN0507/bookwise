"use client"
import AuthForm from '@/components/AuthForm'
import { signInSchema, signUpSchema } from '@/lib/validation'
import React from 'react'

const page = () => {
  return (
   <AuthForm
   type="SIGN_IN"
   schema={signInSchema}
   defaultValues={{
    email:"",
    password:""
   }}
   onSubmit={()=>{}}
   />
  )
}

export default page