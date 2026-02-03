import { StatusCodes } from 'http-status-codes';
import { AirplaneRepository } from "../repositories/index.js"
import { AppError } from "../utils/Errors/errors.js";

const airplaneRepository = new AirplaneRepository();


// /api/v1/airplane/ -> POST
export const createAirplaneService = async (data: object) => {
    try {
        const response = await airplaneRepository.create(data);
        return response;
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const explanation = error.errors.map((err: any) => err.message).join(", ");
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create airplane at this time", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// /api/v1/airplane/:id  -> PATCH
export const updateAirplaneService = async (id: number , data: object) => {
    try {
        const response = await airplaneRepository.update(id, data);
        if (!response || response[0] === 0) {
            throw new AppError("The airplane you are trying to update was not found", StatusCodes.NOT_FOUND);
        }

        return response;

    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Internal Server Error during update", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// /api/v1/airplane/:id  -> DELETE
// export const DeleteAirplaneService = async (id: string | number) => {

// }