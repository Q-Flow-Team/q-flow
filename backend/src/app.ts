import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { prisma } from './config/db.js';
import { swaggerSpec } from './config/swagger.js';
import ticketRoutes from './routes/ticket.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import staffRoutes from './routes/staff.routes.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';

declare global {
  namespace Express {
    interface Request {
      io: Server;
    }
  }
}

const app = express();
const server = http.createServer(app);

// 1. Socket.io Setup with CORS
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  },
});

app.set('io', io);
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.io = io;
  next();
});

// 2. Security & Global CORS (MUST be at the top of the middleware chain)
app.use(cors());
app.options('*', cors());
app.use(helmet({ contentSecurityPolicy: false }));

// 3. Body Parsing
app.use(express.json());

// 4. Rate Limiting (Bypasses preflight OPTIONS requests)
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  return apiLimiter(req, res, next);
});

// 5. Documentation
app.get('/docs/json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerSpec);
});

const swaggerUiOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.8/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.8/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.8/swagger-ui-standalone-preset.js',
  ],
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// 6. Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/staff', staffRoutes);

// 7. Health Check
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// 8. Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// 9. Local Development Server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Q-Flow Backend running on port ${PORT}`);
  });
}

export { server };
export default app;