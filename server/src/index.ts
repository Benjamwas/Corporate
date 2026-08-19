import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import documentRoutes from './routes/documents.js';
import bookingRoutes from './routes/bookings.js';
import leadRoutes from './routes/leads.js';
import settingsRoutes from './routes/settings.js';

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '5mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/settings', settingsRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[Server] Running on http://localhost:${config.port}`);
  console.log(`[Server] CORS origin: ${config.corsOrigin}`);
});
