// pages/api/updateProfile.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { username, email, genres } = req.body;

    // Simulate saving data to a database
    console.log('User profile updated:', { username, email, genres });

    // Respond with success
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
