import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { loginUser, bindShift, unbindShift } from '../services/auth.service.js';

export async function handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { employeeId, password } = req.body;
    if (!employeeId || !password) {
      res.status(400).json({ error: 'Employee ID and password are required.' });
      return;
    }

    const result = await loginUser(employeeId, password);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === 'Invalid employee ID or password.') {
      res.status(401).json({ error: error.message });
      return;
    }
    next(error); // Pass unexpected errors (DB, Prisma, network) to global error handler
  }
}

export async function handleBindShift(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.userId;
    const { counterId } = req.body;

    if (!userId) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }

    if (!counterId) {
      res.status(400).json({ error: 'counterId is required.' });
      return;
    }

    const counter = await bindShift(userId, counterId);
    res.status(200).json({ message: 'Shift successfully bound.', counter });
  } catch (error: any) {
    if (error.message?.includes('already bound') || error.message?.includes('not found')) {
      res.status(400).json({ error: error.message });
      return;
    }
    next(error);
  }
}

export async function handleUnbindShift(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }

    const result = await unbindShift(userId);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message?.includes('No active shift')) {
      res.status(400).json({ error: error.message });
      return;
    }
    next(error);
  }
}