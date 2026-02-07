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


// --- GET ALL SERVICE ---
export const getAllFlightService = async (query: any) => {
    let customFilter: any = {};

    if (query.date) {
        const [startingDate, endDate] = query.date.split("-");
        customFilter.departureTime = {
            gte: startingDate,
            lte: endDate
        }
    }
    // 1. Logic for ?trips=DEL-BOM
    if (query.trips) {
        const [departureId, arrivalId] = query.trips.split("-");

        // Ensure we don't try to fly to the same place
        if (departureId === arrivalId) {
            throw new AppError("Departure and Arrival cannot be the same", StatusCodes.BAD_REQUEST);
        }

        customFilter.departureAirportId = departureId;
        customFilter.arrivalAirportId = arrivalId;
    }

    // 2. Logic for ?price=5000 (Exact price match)
    if (query.price) {
        customFilter.price = query.price;
    }

    try {
        // We pass the filter object to our repository method
        const response = await flightService.getAllFlights(customFilter);
        return response;
    } catch (error: any) {
        throw new AppError("Could not fetch Flights", StatusCodes.INTERNAL_SERVER_ERROR);
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