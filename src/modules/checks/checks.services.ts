import Boom from "@hapi/boom";
import type { PrismaClient } from "@prisma/client";
import prisma from "../common/prisma";
import type { CreateCheckDto, UpdateCheckDto } from "./checks.dto";

export class CheckService {

    private Prisma: PrismaClient;

    constructor() {
        this.Prisma = prisma;
    }

    async getAll() {
        return await this.Prisma.check.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async getOne(id: number) {
        return await this.Prisma.check.findUnique({
            where: {
                id
            }
        });
    }

    async create(data: CreateCheckDto) {
        return await this.Prisma.check.create({
            data
        })
    }

    async update(id: number, data: UpdateCheckDto) {
        return await this.Prisma.check.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id: number) {
        return await this.Prisma.check.delete({
            where: {
                id
            }
        })
    }
}