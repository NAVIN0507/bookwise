import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'
import BorrowBook from './BorrowBook'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
interface Props extends Book {
  userId: string;
}
const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availabelCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availabelCopies > 0 && user?.status === "APPROVED",
    message:
      availabelCopies <= 0
        ? "Book is not available "
    : "You are not eligible to borrow this book",
    }
  return (
    <section className='book-overview'>
        <div className='flex flex-1 flex-col gap-5'>
            <h1>{title}</h1>
            <div className='book-info'>
                <p> By  <span className='font-semibold text-light-200'>{author}</span>
                </p>
                 <p>Category {" "} <span className='font-semibold text-light-200'>{genre}</span>
                </p>
                <div className='flex flex-row gap-1'>
                    <Image src="/icons/star.svg" alt='star' width={22} height={22} />
                    <p>{rating}</p>
                </div>
            </div>
            <div className='book-copies'>
                <p>
                    Total Books : <span>{totalCopies}</span>
                </p>
                 <p>
                    Available Books : <span>{availabelCopies}</span>
                </p>
            </div>
            <p className='book-description'>
                {description}
            </p>
           {user && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
        </div>
        <div className='relative flex flex-1 justify-center'>
            <div className='relative'>
                <BookCover
                varient="wide"
                className="z-10"
                coverColor={coverColor}
                coverUrl={coverUrl}
                />
                <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                    <BookCover
                varient="wide"
               
                coverColor={coverColor}
                coverUrl={coverUrl}
                />
                </div>
            </div>
        </div>
    </section>
  )
}

export default BookOverview