import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';
import { v4 } from 'uuid';
import { ZodUserValidationSchema } from '@/zod/ZodValidationSchema';

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
    user.token = v4();
    if (ZodUserValidationSchema.safeParse(user).success) {
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
      return res.status(200).json({ id: '1', token: v4() });
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
