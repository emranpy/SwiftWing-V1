import { StatusCodes } from 'http-status-codes';
import { AirportRepository } from '../repositories/index.js';
import { AppError } from "../utils/Errors/errors.js";

// We create one "Clerk" (instance) to handle all database tasks
const airportRepository = new AirportRepository();

// --- CREATE ---
export const createAirportService = async (data: object) => {
    try {
        const response = await airportRepository.create(data);
        return response;
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const explanation = error.errors.map((err: any) => err.message).join(", ");
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create airport at this time", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- UPDATE ---
export const updateAirportService = async (id: number, data: object) => {
    try {
        // Use 'airportRepository' (lowercase) to use the instance
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Internal Server Error during update", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- DELETE ---
export const deleteAirportService = async (id: number) => {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Internal Server Error during deletion", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- GET ALL ---
export const getAllAirportService = async () => {
    try {
        const response = await airportRepository.getAll();
        return response;
    } catch (error: any) {
        throw new AppError("Could not fetch airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- GET ONE ---
export const getAirportService = async (id: number) => {
    try {
        const response = await airportRepository.get(id);
        if (!response) {
            throw new AppError("The airport was not found", StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}