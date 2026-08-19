import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { supabase } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/upcoming', authenticate, async (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .gte('date', today)
      .neq('status', 'Completed')
      .order('date', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, organisation, consultation_type, date, time, notes } = req.body;

    if (!name || !email || !consultation_type || !date || !time) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        id: `bk-${randomUUID().slice(0, 8)}`,
        name,
        email,
        organisation: organisation || '—',
        consultation_type,
        date,
        time,
        notes: notes || null,
        status: 'Pending',
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/status', authenticate, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!['Confirmed', 'Pending', 'Completed'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.status(204).end();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
