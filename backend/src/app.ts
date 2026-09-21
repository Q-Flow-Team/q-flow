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

// Extend Express Request interface locally to include io
declare global {
  namespace Express {
    interface Request {
      io: Server;
    }
  }
}

// 1. Configure Allowed Origins
const defaultOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const envOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, '')) // Strip trailing slashes
  .filter(Boolean);

const allowedOrigins = Array.from(
  new Set([...defaultOrigins, ...envOrigins])
);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not permitted by CORS.`));
    }
  },
  credentials: true,
};

// 2. Initialize Express App & HTTP Server
const app = express();
const server = http.createServer(app);

// 3. Initialize Socket.io Server
export const io = new Server(server, {
  cors: corsOptions,
});

// Attach io instance to Express app & request pipeline
app.set('io', io);
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.io = io;
  next();
});

// 4. Global Middlewares
app.use(helmet({ contentSecurityPolicy: false })); // Disabled CSP for Swagger CDN compatibility
app.use(cors(corsOptions));
app.use(express.json());

// 5. Apply Rate Limiter
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  return apiLimiter(req, res, next);
});

// 6. Documentation Endpoints
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

// 7. API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/staff', staffRoutes);

// 8. Health Check Endpoint
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// 9. Start Standalone Server (Local Dev)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Q-Flow Backend running on port ${PORT}`);
  });
}

// Export server & app for serverless or testing environments
export { server };
export default app;