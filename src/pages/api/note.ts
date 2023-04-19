import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';
import { db } from '@/services/Firebase';
import { Note, UserPayload } from '@/types';
import { uuidv4 } from '@firebase/util';

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

      const snapshot = await getDocs(q);
      const user = snapshot.docs[0];
      const noteList: Note[] = user.data().notes;
      const categoryList: string[] = user.data().category;
      !categoryList.includes(req.body.category)
        ? categoryList.push(req.body.category)
        : null;
      if (req.body.noteID !== 'undefined') {
        const noteIndex = noteList.findIndex(
          note => note.id === req.body.noteID
        );
        noteList[noteIndex].title = req.body.title;
        noteList[noteIndex].content = req.body.content;
        noteList[noteIndex].category = req.body.category;
        noteList[noteIndex].updatedAt = new Date().toLocaleDateString('en-GB');
        await updateDoc(user.ref, {
          notes: noteList,
          category: categoryList,
        })
          .then(() => {
            res.status(200).json({ message: 'ok' });
          })
          .catch(err => {
            if (err) {
              res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(500).json({ message: 'Internal Server Error' });
          });
      } else {
        const newNote: Note = {
          id: uuidv4(),
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          createdAt: req.body.createdAt,
          updatedAt: new Date().toLocaleDateString('en-GB'),
          createdBy: userPayload.id,
        };

        noteList.push(newNote);
        await updateDoc(user.ref, {
          notes: noteList,
          category: categoryList,
        })
          .then(() => {
            res.status(200).json({ message: 'ok' });
          })
          .catch(err => {
            if (err) {
              res.status(500).json({ message: 'Internal Server Error' });
            }
          });
      }
    }
  });
};

const get = (req: NextApiRequest, res: NextApiResponse) => {
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
      const snapshot = await getDocs(q);
      const user = snapshot.docs[0];
      const noteList: Note[] = user.data().notes;
      const categoryList: string[] = user.data().category;
      res.status(200).json({ notes: noteList, category: categoryList });
    }
  });
};

const deleteNote = (req: NextApiRequest, res: NextApiResponse) => {
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
      let categoryList: string[] = user.data().category;
      const note: Note[] = user
        .data()
        .notes.filter((note: Note) => note.id === req.query.noteID);
      const newNoteList = user
        .data()
        .notes.filter((note: Note) => note.id !== req.query.noteID);

      const categoryControl: Note[] = newNoteList.filter(
        (n: Note) => n.category === note[0].category
      );

      let newCategoryList = categoryList.filter(
        (category: string) => category !== note[0].category
      );

      newCategoryList =
        categoryControl.length === 0 ? newCategoryList : categoryList;

      updateDoc(user.ref, {
        notes: newNoteList,
        category: newCategoryList,
      })
        .then(() => {
          res.status(200).json({ message: 'ok' });
        })
        .catch(err => {
          res.status(500).json({ message: 'Internal Server Error' });
        });
    }
  });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.method === 'POST' &&
    req.headers['api-key'] === process.env.API_KEY &&
    req.headers.authorization &&
    req.body.title &&
    req.body.content &&
    req.body.category
  ) {
    post(req, res);
  } else if (
    req.method === 'GET' &&
    req.headers['api-key'] === process.env.API_KEY &&
    req.headers.authorization
  ) {
    get(req, res);
  } else if (
    req.method === 'DELETE' &&
    req.headers['api-key'] === process.env.API_KEY &&
    req.headers.authorization
  ) {
    deleteNote(req, res);
  }
};

export default handler;
