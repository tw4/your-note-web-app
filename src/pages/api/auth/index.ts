import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const get = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        res.status(200).json({ message: 'Authorized' });
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && req.headers['api-key'] === process.env.API_KEY) {
    get(req, res);
  }
};

export default handler;
