"use server"

import { db } from "@/database/drizzle"
import { eq } from "drizzle-orm"
import { books } from "@/database/schema"

export const createBook = async(params : BookParams)=>{
try {
    const newBook = await db.insert(books).values({
        ...params,
        availabelCopies:params.totalCopies
    }).returning();
    return{
        success:true,
        data:JSON.parse(JSON.stringify(newBook[0]))
    }
} catch (error) {
    console.log(error)
    return {
        error:true,
        message:"Error creating in book"
    }
}
}
export const getBookById = async(bookId:string)=>{
    try {
        const data = await db.select().from(books).where(eq(books.id , bookId)).limit(1);
        return{
            success:true,
            data:JSON.parse(JSON.stringify(data[0]))
        }
    } catch (error) {
        throw new Error("Error fetching book")
    }
}