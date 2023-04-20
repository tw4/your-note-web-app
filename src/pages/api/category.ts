import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { UserPayload } from '@/types';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '@/services/Firebase';

const get = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization!.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET!, async (error, decoded) => {
    if (error) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const userPayload = decoded as UserPayload;
      const q = query(
        collection(db, 'users'),
        where('id', '==', userPayload.id)
      );
      const snapShot = await getDocs(q);
      const user = snapShot.docs[0];
      res.status(200).json({ categoryList: user.data().category });
    }
  });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.method === 'GET' &&
    req.headers['api-key'] === process.env.API_KEY &&
    req.headers.authorization
  ) {
    get(req, res);
  }
};

export default handler;