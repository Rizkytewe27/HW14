import { hash } from 'bcrypt';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = await request.json();
    const { name, email, password } = body;
    const hashedPassword = await hash(password, 10);

    try {
      const { password: passwordDB, ...user } = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return NextResponse.json(user)
    } catch (err) {
      res.status(400).json({ message: 'User already exists' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
