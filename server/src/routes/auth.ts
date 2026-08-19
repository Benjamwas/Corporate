import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { config } from '../config/env.js';
import { signToken, authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error || !data.user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = signToken({ userId: data.user.id, email: data.user.email! });

    res.json({
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    const token = signToken({ userId: data.user.id, email: data.user.email! });

    res.status(201).json({
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', authenticate, async (req: Request, res: Response) => {
  res.json({ user: req.user });
});

export default router;
