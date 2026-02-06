import { createAirportService, updateAirportService, getAllAirportService, getAirportService } from "../services/index.js"
import { type Request, type Response, type NextFunction } from "express";
import { AirportSchema, ValidationMessages } from "@swiftwing/validation";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/responses/index.js";
import { AppError } from "../utils/Errors/errors.js";

// --- CREATE ---
export const createAirport = async (req: Request, res: Response, next: NextFunction) => {
   const isValid = AirportSchema.safeParse(req.body)
   if (!isValid.success) {
      const explanation = isValid.error.errors.map((err) => err.message).join(", ");
      return next(new AppError(ValidationMessages.AIRPORT.VALIDATION_ERROR, StatusCodes.BAD_REQUEST, explanation))
   }

   try {
      const response = await createAirportService(isValid.data)
      return res.status(StatusCodes.CREATED).json(new SuccessResponse(response, "Airport Created Successfully"));
   } catch (error: any) {
      const explanation = error.explanation || "Internal Server Error";
      return next(new AppError(explanation, error.statusCode || 500));
   }
}

// --- UPDATE ---
export const updateAirport = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // FIXED: Use Airport fields, not Airplane fields
      const { name, code, address, cityId } = req.body;
      
      const response = await updateAirportService(Number(req.params.id), { name, code, address, cityId });
      
      return res.status(StatusCodes.OK).json(new SuccessResponse(response, "Airport Updated Successfully"));
   } catch (error: any) {
      const explanation = error.explanation || "Internal Server Error";
      return next(new AppError(explanation, error.statusCode || 500));
   }
}

// --- GET ALL ---
export const getAllAirport = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const response = await getAllAirportService();
      return res.status(StatusCodes.OK).json(new SuccessResponse(response, "Airports Fetched Successfully"));
   } catch (error: any) {
      const explanation = error.explanation || "No Airports Found";
      return next(new AppError(explanation, error.statusCode || 404));
   }
}

// --- GET ONE ---
export const getAirport = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const response = await getAirportService(Number(req.params.id));
      return res.status(StatusCodes.OK).json(new SuccessResponse(response, "Airport Fetched Successfully"));
   } catch (error: any) {
      const explanation = error.explanation || "Airport Not Found";
      return next(new AppError(explanation, error.statusCode || 404));
   }
}