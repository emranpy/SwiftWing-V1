import { StatusCodes } from 'http-status-codes';
import { CityRepository } from "../repositories/index.js"
import { AppError } from "../utils/Errors/errors.js";

const cityRepository = new CityRepository();

// 1. CREATE
export const createCityService = async (data: object) => {
    try {
        const response = await cityRepository.create(data);
        return response;
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const explanation = error.errors.map((err: any) => err.message).join(", ");
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create city at this time", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// 2. READ (Get All)
export const getAllCitiesService = async () => {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError("Failed to fetch cities", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// 3. READ (Get One)
export const getCityService = async (id: string | number) => {
    try {
        const city = await cityRepository.get(id);
        if (!city) {
            throw new AppError("The city you requested was not found", StatusCodes.NOT_FOUND);
        }
        return city;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Error fetching city details", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// 4. UPDATE
export const updateCityService = async (id: string | number, data: object) => {
    try {
        const response = await cityRepository.update(id, data);
        // If response is null or [0], the city didn't exist
        if (!response) {
            throw new AppError("City not found to update", StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to update city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// 5. DELETE
export const deleteCityService = async (id: string | number) => {
    try {
        const response = await cityRepository.destroy(id);
        if (!response) {
            throw new AppError("City not found to delete", StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to delete city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}