"use server"

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs"

export const borrowBook = async(params:BorrowBookParams)=>{
    const {userId , bookId} = params;
    try {
        const book  = await db.select({availabelCopies : books.availabelCopies}).from(books).where(eq(books.id , bookId)).limit(1);
        if(!book.length || book[0].availabelCopies <=0){
            return {sucess:false , error:"Book is not available"}
        }
        const dueDate = dayjs().add(7 , 'day').toDate().toDateString();
        //! const record = db.insert()
        const record = db.insert(borrowRecords).values({
            userId,
            bookId,
            dueDate,
            status:"BORROWED"
        })
        await db.update(books).set({availabelCopies:book[0].availabelCopies -1}).where(eq(books.id , bookId))
        return{success:true , record}
    } catch (error) {
        console.log(error)
        return{sucess:false , error:"An error occured while borrowing book"}
    }
}