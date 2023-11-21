import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, author, publisher, year, pages } = req.body;

    try {
      const book = await prisma.book.create({
        data: {
          title,
          author,
          publisher,
          year: parseInt(year),
          pages: parseInt(pages),
        },
      });
      res.json({ book });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Book already exists' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
