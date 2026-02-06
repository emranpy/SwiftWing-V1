import { StatusCodes } from 'http-status-codes';
import { FlightRepository } from '../repositories/index.js';
import { AppError } from "../utils/Errors/errors.js";

// We create one "Clerk" (instance) to handle all database tasks
const flightService = new FlightRepository();

// --- CREATE ---
export const createFlightService = async (data: object) => {
    try {
        const response = await flightService.create(data);
        return response;
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const explanation = error.errors.map((err: any) => err.message).join(", ");
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create Flight at this time", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- UPDATE ---
export const updateFlightService = async (id: number, data: object) => {
    try {
        // Use 'airportRepository' (lowercase) to use the instance
        const response = await flightService.update(id, data);
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Internal Server Error during update", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- DELETE ---
export const deleteFlightService = async (id: number) => {
    try {
        const response = await flightService.destroy(id);
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Internal Server Error during deletion", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- GET ALL ---
export const getAllFlightService = async () => {
    try {
        const response = await flightService.getAll();
        return response;
    } catch (error: any) {
        throw new AppError("Could not fetch Flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// --- GET ONE ---
export const getFlightService = async (id: number | string) => {
    try {
        const response = await flightService.get(id);
        if (!response) {
            throw new AppError("The Flight was not found", StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}