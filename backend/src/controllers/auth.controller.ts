import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { loginUser, bindShift, unbindShift } from '../services/auth.service.js';

export async function handleLogin(req: Request, res: Response): Promise<void> {
  try {
    const { employeeId, password } = req.body;
    if (!employeeId || !password) {
      res.status(400).json({ error: 'Employee ID and password are required.' });
      return;
    }

    const result = await loginUser(employeeId, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message || 'Authentication failed.' });
  }
}

export async function handleBindShift(req: AuthenticatedRequest, res: Response): Promise<void> {
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
    res.status(400).json({ error: error.message || 'Failed to bind shift.' });
  }
}

export async function handleUnbindShift(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }

    const result = await unbindShift(userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to unbind shift.' });
  }
}