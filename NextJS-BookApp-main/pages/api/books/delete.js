import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const book = await prisma.book.delete({
        where: { id: Number(id) },
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
