import { 
    createCityService, 
    getAllCitiesService, 
    getCityService, 
    updateCityService, 
    deleteCityService 
} from "../services/index.js";
import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/responses/index.js";
import { AppError } from "../utils/Errors/errors.js";

// 1. CREATE
export const createCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new AppError("City name is required", StatusCodes.BAD_REQUEST);
        }
        const response = await createCityService({ name });
        return res.status(StatusCodes.CREATED).json(
            new SuccessResponse(response, "City Created Successfully")
        );
    } catch (error) {
        next(error); 
    }
};

// 2. READ (Get All)
export const getAllCities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllCitiesService();
        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "Cities Fetched Successfully")
        );
    } catch (error) {
        next(error);
    }
};

// 3. READ (Get One)
export const getCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getCityService(Number(req.params.id));
        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "City Fetched Successfully")
        );
    } catch (error) {
        next(error);
    }
};

// 4. UPDATE
export const updateCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await updateCityService(Number(req.params.id), req.body);
        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "City Updated Successfully")
        );
    } catch (error) {
        next(error);
    }
};

// 5. DELETE
export const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await deleteCityService(Number(req.params.id));
        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "City Deleted Successfully")
        );
    } catch (error) {
        next(error);
    }
};