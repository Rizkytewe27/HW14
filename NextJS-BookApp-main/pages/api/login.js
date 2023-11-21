import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import prisma from '@/app/lib/prismadb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
