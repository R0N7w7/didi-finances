import Boom from "@hapi/boom";
import { Router } from "express";
import { validate, validateParams } from '../common/middlewares/schema.middleware';
import { successResponse } from "../common/utils/success";
import { createAssociatedSchema, updateAssociatedSchema, idSchema } from "./associated.schemas"; // Schemas de Joi
import { AssociatedService } from "./associated.services"; // Middleware de validación

const associatedService = new AssociatedService();
const router = Router();

// GET: Obtener todos los asociados
router.get('/', async (req, res, next) => {
    try {
        const associated = await associatedService.getAll();
        if (!associated.length) {
            throw Boom.notFound("No associated entities found");
        }
        successResponse(res, associated);
    } catch (error) {
        next(error);
    }
});

// GET: Obtener un asociado por ID
router.get('/:id', validateParams(idSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const associated = await associatedService.getOne(parseInt(id));
        if (!associated) {
            throw Boom.notFound("Associated entity not found");
        }
        successResponse(res, associated);
    } catch (error) {
        next(error);
    }
});

// POST: Crear un nuevo asociado con validación
router.post('/', validate(createAssociatedSchema), async (req, res, next) => {
    try {
        const data = req.body;
        const newAssociated = await associatedService.create(data);
        successResponse(res, newAssociated, 201);
    } catch (error) {
        next(error);
    }
});

// PUT: Actualizar un asociado existente por ID con validación
router.put('/:id', validateParams(idSchema), validate(updateAssociatedSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const associated = await associatedService.getOne(parseInt(id));
        if (!associated) {
            throw Boom.notFound("Associated entity not found");
        }
        const updatedAssociated = await associatedService.update(parseInt(id), body);
        successResponse(res, updatedAssociated);
    } catch (error) {
        next(error);
    }
});

// DELETE: Eliminar un asociado por ID
router.delete('/:id', validateParams(idSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const associated = await associatedService.getOne(+id);
        if (!associated) {
            throw Boom.notFound("Associated entity not found");
        }
        const deletedAssociated = await associatedService.delete(parseInt(id));
        successResponse(res, deletedAssociated);
    } catch (error) {
        next(error);
    }
});

export default router;
