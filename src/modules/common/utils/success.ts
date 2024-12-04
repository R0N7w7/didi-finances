import { Response } from "express";

export const successResponse = (res: Response, data: any, statusCode = 200) => {
    res.status(statusCode).json({
        error: false,
        data
    });
};