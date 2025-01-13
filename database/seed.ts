import ImageKit from 'imagekit'
import dummybooks from '../dummybooks.json'


import { books } from './schema'
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

config({path:".env.local"})
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({client:sql})
const imageKit = new ImageKit({
   urlEndpoint:'https://ik.imagekit.io/mnsnavin',
            publicKey:'public_KALsYmzE0AOK1pjnNsKfGrcFlkE=',
            privateKey:'private_VxrymIfUE6HADGnJ/Qw2AlBlvVk=',
})
const uploadToImageKit = async (url: string, filename: string, folder: string) => {
    try {
        const response = await imageKit.upload({
            file:url,
            fileName:filename,
            folder:folder
        })
        return response.filePath
    } catch (error) {
        console.log(error)
    }
}
const seed = async()=>{
    console.log("Seeding data...")
    try {
        for(const book of dummybooks){
            const coverUrl = await uploadToImageKit(
                book.coverUrl , `${book.title}.jpeg` ,"/books/covers") as string;
         const videoUrl = await uploadToImageKit(
                book.videoUrl , `${book.title}.jpeg` ,"/books/videos") as string;
                 await db.insert(books).values({
                    ...book,
                    coverUrl,
                    videoUrl
                 })
        }
       console.log("Seeding Successfull")
    } catch (error) {
        console.log(error)
        console.log("Error seeding data")
    }
}
seed()