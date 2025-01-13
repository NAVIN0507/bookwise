import { getBookById } from '@/lib/admin/action/book'
import React from 'react'

const page = async({ params }: { params: { id: string } }) => {
    const result = await getBookById(params.id);
  return (
    <div>{result.data.title}</div>
  )
}

export default page