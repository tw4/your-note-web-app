import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';
import { ZodUserRegisterValidationSchema } from '@/zod/ZodValidationSchema';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@firebase/auth';
import { auth, db } from '@/services/Firebase';
import { addDoc, collection } from '@firebase/firestore';
import jwt from 'jsonwebtoken';

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;
  if (headers['api-key'] !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    const user: User = req.body;
    if (user && ZodUserRegisterValidationSchema.safeParse(user).success) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async response => {
          await sendEmailVerification(response.user);
          const token = jwt.sign(
            {
              id: response.user.uid,
              email: response.user.email,
              verified: response.user.emailVerified,
            },
            process.env.JWT_SECRET!,
            {
              expiresIn: '24h',
            }
          );
          addDoc(collection(db, 'users'), {
            id: response.user.uid,
            name: user.name,
            email: user.email,
            token: token,
            createdAt: new Date().toLocaleDateString('en-GB'),
            lastLogin: new Date().toLocaleDateString('en-GB'),
            notes: [],
            category: [],
          }).catch(err => {
            return res.status(400).json({ message: err.message });
          });
          return res.status(200).json({
            token: token,
          });
        })
        .catch(err => {
          return res.status(400).json({ message: err.message });
        });
    } else {
      return res.status(400).json({ message: 'Bad Request' });
    }
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    post(req, res);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
