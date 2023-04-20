import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { Note, UserPayload } from '@/types';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';
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

const post = (req: NextApiRequest, res: NextApiResponse) => {
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
      const categoryList: string[] = user.data().category;
      !categoryList.includes(req.body.category)
        ? categoryList.push(req.body.category)
        : null;

      await updateDoc(user.ref, {
        category: categoryList,
      });
      res.status(200).json({ message: 'ok', categoryList: categoryList });
    }
  });
};

const deleteCategory = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization!.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET!, async (error, decoded) => {
    if (error) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const userPayload: UserPayload = decoded as UserPayload;
      const q = query(
        collection(db, 'users'),
        where('id', '==', userPayload.id)
      );
      const snapShot = await getDocs(q);
      const user = snapShot.docs[0];
      const newNoteList = user
        .data()
        .notes.filter((note: Note) => note.category !== req.query.category);
      const newCategoryList = user
        .data()
        .category.filter((category: string) => category !== req.query.category);
      updateDoc(user.ref, {
        notes: newNoteList,
        category: newCategoryList,
      })
        .then(() => {
          res.status(200).json({ message: 'ok' });
        })
        .catch(err => {
          res.status(500).json({ message: err });
        });
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
  } else if (
    req.method === 'POST' &&
    req.headers['api-key'] === process.env.API_KEY &&
    req.headers.authorization
  ) {
    post(req, res);
  } else if (
    req.method === 'DELETE' &&
    req.headers['api-key'] === process.env.API_KEY &&
    req.headers.authorization
  ) {
    deleteCategory(req, res);
  }
};

export default handler;
