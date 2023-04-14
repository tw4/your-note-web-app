import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';
import { v4 } from 'uuid';
import {
  ZodUserRegisterValidationSchema,
  ZodUserValidationSchema,
} from '@/zod/ZodValidationSchema';
import jwt from 'jsonwebtoken';

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;
  if (headers['api-key'] === process.env.MOCK_API_KEY) {
    if (
      req.body.email === 'test@example.com' &&
      req.body.password === '123456'
    ) {
      const token: string = jwt.sign(
        { id: '1', email: req.query.email },
        process.env.MOCK_JWT_SECRET!,
        { expiresIn: '24h' }
      );
      return res.status(200).json({ id: '1', token: token, verified: 'true' });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return post(req, res);
  }
};

export default handler;
