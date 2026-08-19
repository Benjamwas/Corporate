import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { supabase } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('updated', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/published', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('status', 'Published')
      .order('updated', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { id, title, description, type, version, status, file_size, body } = req.body;

    const { data, error } = await supabase
      .from('documents')
      .insert({
        id: id || `doc-${randomUUID().slice(0, 8)}`,
        title: title || 'Untitled document',
        description: description || '',
        type: type || 'Report',
        version: version || 'v0.1',
        status: status || 'Draft',
        file_size: file_size || '—',
        body: body || '<h2>Untitled document</h2><p>Start writing…</p>',
        downloads: 0,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { title, description, type, version, status, file_size, body, downloads } = req.body;

    const update: Record<string, any> = {
      updated: new Date().toISOString().slice(0, 10),
    };

    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (type !== undefined) update.type = type;
    if (version !== undefined) update.version = version;
    if (status !== undefined) update.status = status;
    if (file_size !== undefined) update.file_size = file_size;
    if (body !== undefined) update.body = body;
    if (downloads !== undefined) update.downloads = downloads;

    const { data, error } = await supabase
      .from('documents')
      .update(update)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/download', async (req: Request, res: Response) => {
  try {
    const { data: doc, error: fetchError } = await supabase
      .from('documents')
      .select('downloads')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !doc) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    const { error } = await supabase
      .from('documents')
      .update({ downloads: doc.downloads + 1 })
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ downloads: doc.downloads + 1 });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.status(204).end();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
