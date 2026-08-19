import 'dotenv/config';

export const config = {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  jwtSecret: process.env.JWT_SECRET!,
  port: parseInt(process.env.PORT || '3001', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  adminEmail: process.env.ADMIN_EMAIL || 'kennedy@kennedymutua.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'change_this',
};
