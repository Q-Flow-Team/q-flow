import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { prisma } from './config/db.js';
import ticketRoutes from './routes/ticket.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import staffRoutes from './routes/staff.routes.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

// Build allowed origins array and strip any accidental trailing slashes
const defaultLocalOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://flow-frontend-murex.vercel.app',
];

const envOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowedOrigins = Array.from(
  new Set([...defaultLocalOrigins, ...envOrigins])
);

const isOriginAllowed = (origin?: string): boolean => {
  if (!origin) return true; // Allow curl, Postman, mobile apps
  const normalized = origin.trim().replace(/\/$/, '');
  return allowedOrigins.includes(normalized);
};

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      // CRITICAL: Return (null, false) so OPTIONS requests don't throw 500 errors
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200, // Important for legacy browser preflights
};

const app = express();

// 1. MUST BE FIRST: Express CORS handling for preflights
app.use(cors(corsOptions));

// 2. Security headers (Configured to avoid stripping CORS preflight headers)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(express.json());

// 3. Apply rate limiter to /api EXCEPT for preflight OPTIONS requests
app.use('/api', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  return apiLimiter(req, res, next);
});

// Swagger documentation endpoints
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

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/staff', staffRoutes);

app.get('/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Q-Flow Backend running on port ${PORT}`);
});