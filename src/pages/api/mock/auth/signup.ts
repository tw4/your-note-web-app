import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';
import { v4 } from 'uuid';
import {
  ZodUserRegisterValidationSchema,
  ZodUserValidationSchema,
} from '@/zod/ZodValidationSchema';
import jwt from 'jsonwebtoken';

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const user: User = req.body;
  const headers = req.headers;
  if (headers['api-key'] !== process.env.MOCK_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    if (user && ZodUserRegisterValidationSchema.safeParse(user).success) {
      user.id = v4();
      user.createdAt = new Date().toLocaleDateString();
      user.lastLogin = new Date().toLocaleDateString();
      user.token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.MOCK_JWT_SECRET!,
        { expiresIn: '1d' }
      );
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: 'User is required' });
    }
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    return post(req, res);
  }
};

export default handler;
