import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) throw error;

    const settings: Record<string, string> = {};
    data.forEach((row) => {
      settings[row.key] = row.value;
    });

    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', authenticate, async (req: Request, res: Response) => {
  try {
    const settings = req.body;

    for (const [key, value] of Object.entries(settings)) {
      const { error } = await supabase
        .from('settings')
        .upsert(
          { key, value: String(value), updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );

      if (error) throw error;
    }

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
