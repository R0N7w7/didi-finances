import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (Boom.isBoom(err)) {
        return res.status(err.output.statusCode).json(err.output.payload);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        error: true,
        message
    });
};
    