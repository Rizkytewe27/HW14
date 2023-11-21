import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { title, author, publisher, year, pages } = req.body;

    try {
      const book = await prisma.book.update({
        where: { id: Number(id) },
        data: {
          title,
          author,
          publisher,
          year,
          pages,
        },
      });
      res.json({ book });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
