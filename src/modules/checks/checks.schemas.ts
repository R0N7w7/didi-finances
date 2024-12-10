import Joi from 'joi';

export const createCheckSchema = Joi.object({
    project: Joi.string().required(),
    checkNumber: Joi.number().integer().positive().required(),
    amount: Joi.number().positive().required(),
    month: Joi.string().required(),
    requestNumber: Joi.string().required(),
    part: Joi.string().required(),
    area: Joi.string().required(),
    observations: Joi.string().optional().allow(''), // Observations can be an empty string or omitted
    receiver: Joi.string().required(),
    deliveredBy: Joi.string().required(),
    associatedId: Joi.number().integer().positive().required(), // Relación con un asociado
});

export const updateCheckSchema = Joi.object({
    project: Joi.string().optional(),
    checkNumber: Joi.number().integer().positive().optional(),
    amount: Joi.number().positive().optional(),
    month: Joi.string().optional(),
    requestNumber: Joi.string().optional(),
    part: Joi.string().optional(),
    area: Joi.string().optional(),
    observations: Joi.string().optional().allow(''), // Optional, can be an empty string
    receiver: Joi.string().optional(),
    deliveredBy: Joi.string().optional(),
    associatedId: Joi.number().integer().positive().optional(), // Relación opcional
});

export const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})