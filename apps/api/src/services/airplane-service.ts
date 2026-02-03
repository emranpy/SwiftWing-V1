import { StatusCodes } from 'http-status-codes';
import { AirplaneRepository } from "../repositories/index.js"
import { AppError } from "../utils/Errors/errors.js";

const airplaneRepository = new AirplaneRepository();

export const createAirplaneService = async (data: object) => {
    try {
        const response = await airplaneRepository.create(data)
        return response
    } catch (error) {
        throw new AppError("Something went wrong on our server", 500)
    }
}

