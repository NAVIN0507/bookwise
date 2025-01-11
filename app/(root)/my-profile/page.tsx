
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants';
import { signOut } from '@/auth';
import React from 'react'

const page = () => {
  return (
   <>
   <form action={async()=>{
    "use server";
    await signOut();
   }}>
    <Button>Logout</Button>
    <BookList title='Borrowed Books' books={sampleBooks} containerClassName='mt-10'/>
   </form>
   </>
  )
}

export default page