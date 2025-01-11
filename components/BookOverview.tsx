import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'

const BookOverview = ({id , author , title , rating , 

    genre,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    videoUrl,
    summary,
   
}:Book) => {
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
                    Available Books : <span>{availableCopies}</span>
                </p>
            </div>
            <p className='book-description'>
                {description}
            </p>
            <Button className='book-overview_btn'>
                <Image
                src="/icons/book.svg" alt='book' width={20} height={20}
                />
                <p className='font-bebas-neue text-xl text-dark-100'>Borrow Book Request</p>
            </Button>
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