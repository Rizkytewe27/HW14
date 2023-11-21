'use client'

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import BookForm from "../components/BookForm";
import { getBookDetailById } from "../api/api";

export default function EditBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <Box>
      <BookForm bookData={book} />
    </Box>
  );
}
