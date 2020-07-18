import express from 'express';

export interface Middlewares {
  (req: express.Request, res: express.Response, next: express.NextFunction): void;
}

export interface ErrorHandler {
  (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void;
}
