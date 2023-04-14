import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';
import { ZodUserRegisterValidationSchema } from '@/zod/ZodValidationSchema';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { auth, db } from '@/services/Firebase';
import { addDoc, collection } from '@firebase/firestore';

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;
  if (headers['api-key'] !== process.env.MOCK_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    const user: User = req.body;
    if (user && ZodUserRegisterValidationSchema.safeParse(user).success) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async response => {
          const token = await response.user.getIdToken();
          addDoc(collection(db, 'users'), {
            id: response.user.uid,
            name: user.name,
            email: user.email,
            password: user.password,
            token: token,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            notes: [],
          }).catch(err => {
            return res.status(400).json({ message: err.message });
          });
          return res.status(200).json({
            userID: response.user.uid,
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

const get = (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;
  if (headers['api-key'] !== process.env.MOCK_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(async response => {
        const token = await response.user.getIdToken();
        return res.status(200).json({
          userID: response.user.uid,
          token: token,
        });
      })
      .catch(err => {
        return res.status(400).json({ message: err.message });
      });
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
