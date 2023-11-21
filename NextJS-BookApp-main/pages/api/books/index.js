import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const books = await prisma.book.findMany();
      res.json({ books });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    const formData = req.body;

    try {
      const book = await prisma.book.create({
        data: {
          title: formData.title,
          author: formData.author,
          publisher: formData.publisher,
          year: parseInt(formData.year),
          pages: parseInt(formData.pages),
          image: formData.image, // You may need to adjust this based on your frontend logic
        },
      });
      res.json({ book });
    } catch (error) {
      console.log('err', error);
      res.status(400).json({ message: 'Book already exists' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
