import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/services/Firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';

const get = (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;
  if (headers['api-key'] !== process.env.API_KEY) {
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
    get(req, res);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
