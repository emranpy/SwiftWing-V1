import {
    createFlightService,
    updateFlightService,
    deleteFlightService,
    getFlightService,
    getAllFlightService
} from "../services/index.js";
import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/responses/index.js";
import { AppError } from "../utils/Errors/errors.js";
import { FlightSchema, ValidationMessages } from "@swiftwing/validation";


// 1. CREATE
export const createFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isValid = FlightSchema.safeParse(req.body);
        if (!isValid.success) {
            const explanation = isValid.error.errors.map((err) => err.message).join(", ");
            return next(new AppError(ValidationMessages.AIRPORT.VALIDATION_ERROR, StatusCodes.BAD_REQUEST, explanation))
        }
        const response = await createFlightService(isValid.data);
        return res.status(StatusCodes.CREATED).json(
            new SuccessResponse(response, "Flight Created Successfully")
        );
    } catch (error) {
        next(error);
    }
};

// 2. READ (Get All)
export const getAllFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllFlightService();
        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "Flights Fetched Successfully")
        );
    } catch (error) {
        next(error);
    }
};

// 3. READ (Get One)
export const getFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getFlightService(Number(req.params.id));
        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "Flight Fetched Successfully")
        );
    } catch (error) {
        next(error);
    }
};

// 4. UPDATE
export const updateFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { flightNumber, airplaneid, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats } = req.body
        const response = await updateFlightService(Number(req.params.id), { flightNumber, airplaneid, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats });

        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "Flight Updated Successfully")
        );
    } catch (error) {
        next(error);
    }
};

// 5. DELETE
export const deleteFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await deleteFlightService(Number(req.params.id));
        return res.status(StatusCodes.OK).json(
            new SuccessResponse(response, "Flight Deleted Successfully")
        );
    } catch (error) {
        next(error);
    }
};