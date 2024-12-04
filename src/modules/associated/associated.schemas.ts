import Joi from 'joi';

export const createAssociatedSchema = Joi.object({
    name: Joi.string().max(100).required(),
});

export const updateAssociatedSchema = Joi.object({
    name: Joi.string().max(100).optional(),
});

export const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});