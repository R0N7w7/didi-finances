import Boom from '@hapi/boom';
import type { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        try {
            if (error) {
                throw Boom.badRequest(error.message);
            }
        } catch (error) {
            next(error);
        }

        next();
    };
};

export const validateParams = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req.params, { abortEarly: false });
            if (error) {
                throw Boom.badRequest(error.message);
            }
        } catch (error) {
            next(error);
        }
        next();
    };
};

export const validateQuery = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req.query, { abortEarly: false });
            if (error) {
                throw Boom.badRequest(error.message);
            }
        } catch (error) {
            next(error);
        }
        next();
    }
}