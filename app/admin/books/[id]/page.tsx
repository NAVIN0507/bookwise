import { getBookById } from '@/lib/admin/action/book'
import Image from 'next/image';
import React from 'react'

const page = async({ params }: { params: { id: string } }) => {
    const result = await getBookById(params.id);
  return (
    <div>
 
        
    </div>
  )
}

export default page