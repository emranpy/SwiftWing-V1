// src/repositories/crud-repository.ts
import logger from "../logs/logger.js";

export class CrudRepository<T extends any> {
    protected model: any;

    constructor(model: T) {
        this.model = model;
    }

    async create(data: object) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            logger.error(`[CrudRepository: Create Error]:`, error);
            throw error;
        }
    }

    async destroy(id: number | string) {
        try {
            const response = await this.model.destroy({
                where: { id }
            });
            return response;
        } catch (error) {
            logger.error(`[CrudRepository: Destroy Error]: ${error}`);
            throw error;
        }
    }

    async get(id: number | string) {
        try {
            const response = await this.model.findByPk(id);
            return response;
        } catch (error) {
            logger.error(`[CrudRepository: Get Error]: ${error}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            logger.error(`[CrudRepository: GetAll Error]: ${error}`);
            throw error;
        }
    }

    async update(id: number | string, data: object) {
        try {
            const response = await this.model.update(data, {
                where: { id: id },
                returning: true, 
                plain: true      
            });
            return response;
        } catch (error) {
            logger.error(`[CrudRepository: Update Error]: ${error}`);
            throw error;
        }
    }
}

