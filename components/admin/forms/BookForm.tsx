"use client"
import React from 'react'
import { DefaultValues, FieldValues , Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { z, ZodType} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'

import { useRouter } from 'next/navigation'
import { bookSchema } from '@/lib/validation'
import { Textarea } from '@/components/ui/textarea'
interface Props extends Partial<Book> {
type:"create"|"update"
}
const BookForm = <T extends FieldValues>({type}:Props) => {
  const router = useRouter();
    const isSignIn = type ==="create"
      const { toast } = useToast()

     const form  = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
        title:"",
author:"",
genre:"",
rating:1,
totalCopies:1,
description:"",
coverUrl:"",
coverColor:"",
videoUrl:"",
summary:"",
    }
  })
 
 const onSubmit = async(values : z.infer<typeof bookSchema>)=>{

 } // 2. Define a submit handler.
 
  return (
  
 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
   
           <FormField
          
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Title
                </FormLabel>
              <FormControl>
                <Input required placeholder='Book Title'{...field} className='book-form_input' />
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Author
                </FormLabel>
              <FormControl>
                <Input required placeholder='Book Author'{...field} className='book-form_input' />
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Genra
                </FormLabel>
              <FormControl>
                <Input required placeholder='Book Genra'{...field} className='book-form_input' />
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Rating
                </FormLabel>
              <FormControl>
                <Input required type='number'  min={1} max={5} placeholder='Book Rating'{...field} className='book-form_input' />
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Total Copies
                </FormLabel>
              <FormControl>
                <Input required type='number'  min={0} max={10000} placeholder='Total Copies of book'{...field} className='book-form_input' />
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Cover Url
                </FormLabel>
              <FormControl>
              {/* File Upload component */}
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Cover Color
                </FormLabel>
              <FormControl>
               {/* cover color */}
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Description
                </FormLabel>
              <FormControl>
                <Textarea rows={10} placeholder='Book Description' {...field} className='book-form_input'/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
Video Trailer                </FormLabel>
              <FormControl>
               {/* File Upload */}
               
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
               Book Summary
                </FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder='Book Summary' {...field} className='book-form_input'/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form> 
    
   
     )
}

export default BookForm