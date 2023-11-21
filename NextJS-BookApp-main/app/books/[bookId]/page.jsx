'use client'

import BookDetails from "@/app/components/BooksDetail";

export default function Book({params}) {
  return (
    <div>{params.book}
      <BookDetails />
    </div>
  )
}
