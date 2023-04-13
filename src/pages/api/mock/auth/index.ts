import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';
import { v4 } from 'uuid';
import { ZodUserValidationSchema } from '@/zod/ZodValidationSchema';
import jwt from 'jsonwebtoken';

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const user: User = req.body;
  const headers = req.headers;
  if (headers['api-key'] !== process.env.MOCK_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    if (!user) {
      return res.status(400).json({ message: 'User is required' });
    }
    user.id = v4();
    user.createdAt = new Date().toLocaleDateString();
    user.lastLogin = new Date().toLocaleDateString();
    if (ZodUserValidationSchema.safeParse(user).success) {
      user.token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.MOCK_JWT_SECRET!,
        { expiresIn: '1d' }
      );
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: 'User is invalid' });
    }
  }
};

const get = (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;
  if (headers['api-key'] === process.env.MOCK_API_KEY) {
    if (req.query.email === 'test' && req.query.password === '123456') {
      const token: string = jwt.sign(
        { id: '1', email: req.query.email },
        process.env.MOCK_JWT_SECRET!,
        { expiresIn: '24h' }
      );
      return res.status(200).json({ id: '1', token: token });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    return post(req, res);
  } else if (req.method == 'GET') {
    return get(req, res);
  }
};

export default handler;
