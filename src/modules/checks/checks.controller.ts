import Boom from "@hapi/boom";
import { Router } from "express";
import { AssociatedService } from "../associated/associated.services";
import { validate, validateParams } from '../common/middlewares/schema.middleware';
import { successResponse } from "../common/utils/success";
import { CreateCheckDto } from "./checks.dto";
import { createCheckSchema, idSchema, updateCheckSchema } from "./checks.schemas"; // Schemas de Joi
import { CheckService } from "./checks.services"; // Middleware de validación

const checkService = new CheckService();
const associatedService = new AssociatedService();
const router = Router();

// GET: Obtener todos los cheques
router.get('/', async (req, res, next) => {
    try {
        const checks = await checkService.getAll();
        if (!checks.length) {
            throw Boom.notFound("No checks found");
        }
        successResponse(res, checks);
    } catch (error) {
        next(error);
    }
});

// GET: Obtener un cheque por ID
router.get('/:id', validateParams(idSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const check = await checkService.getOne(parseInt(id));
        if (!check) {
            throw Boom.notFound("Check not found");
        }
        successResponse(res, check);
    } catch (error) {
        next(error);
    }
});

// POST: Crear un nuevo cheque con validación
router.post('/', validate(createCheckSchema), async (req, res, next) => {
    try {
        const data: CreateCheckDto = req.body;

        const associated = await associatedService.getOne(data.associatedId);

        if (!associated) {
            throw Boom.badRequest("El asociado con el ID proporcionado no existe.");
        }

        const newCheck = await checkService.create(data);
        successResponse(res, newCheck, 201);
    } catch (error) {
        next(error);
    }
});

// PUT: Actualizar un cheque existente por ID con validación
router.put('/:id', validateParams(idSchema), validate(updateCheckSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const check = await checkService.getOne(parseInt(id));
        if (!check) {
            throw Boom.notFound("Check not found");
        }
        const updatedCheck = await checkService.update(parseInt(id), body);
        successResponse(res, updatedCheck);
    } catch (error) {
        next(error);
    }
});

// DELETE: Eliminar un cheque por ID
router.delete('/:id', validateParams(idSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const check = await checkService.getOne(+id);
        if (!check) {
            throw Boom.notFound("Check not found");
        }
        const deletedCheck = await checkService.delete(parseInt(id));
        successResponse(res, deletedCheck);
    } catch (error) {
        next(error);
    }
});

export default router;