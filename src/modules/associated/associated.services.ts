import { PrismaClient } from "@prisma/client";
import prisma from "../common/prisma";
import type { CreateAssociatedDto, UpdateAssociatedDto } from "./associated.dto";

export class AssociatedService {

    private Prisma: PrismaClient;

    constructor() {
        this.Prisma = prisma;
    };

    // Obtener todos los asociados
    async getAll() {
        return await this.Prisma.associated.findMany();
    }

    // Obtener un asociado por ID
    async getOne(id: number) {
        return await this.Prisma.associated.findUnique({
            where: {
                id
            }
        });
    }

    // Crear un nuevo asociado
    async create(data: CreateAssociatedDto) {
        return await this.Prisma.associated.create({
            data
        });
    }

    // Actualizar un asociado por ID
    async update(id: number, data: UpdateAssociatedDto) {
        return await this.Prisma.associated.update({
            where: {
                id
            },
            data
        });
    }

    // Eliminar un asociado por ID
    async delete(id: number) {
        return await this.Prisma.associated.delete({
            where: {
                id
            }
        });
    }
}
