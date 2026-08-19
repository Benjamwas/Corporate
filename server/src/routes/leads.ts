import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { supabase } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, organisation, topic, source, message, transcript } = req.body;

    if (!name || !email || !topic || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        id: `lead-${randomUUID().slice(0, 8)}`,
        name,
        email,
        phone: phone || null,
        organisation: organisation || '—',
        topic,
        source: source || 'Contact form',
        message,
        transcript: transcript || null,
        stage: 'New',
        date: new Date().toISOString().slice(0, 10),
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/stage', authenticate, async (req: Request, res: Response) => {
  try {
    const { stage } = req.body;

    if (!['New', 'Contacted', 'Qualified', 'Converted', 'Closed'].includes(stage)) {
      res.status(400).json({ error: 'Invalid stage' });
      return;
    }

    const { data, error } = await supabase
      .from('leads')
      .update({ stage })
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
      .from('leads')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.status(204).end();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
