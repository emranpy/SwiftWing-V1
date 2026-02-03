
import { createAirplaneService } from "../services/index.js"
import { type Request, type Response, type NextFunction } from "express";
import { AirplaneSchema, ValidationMessages } from "@swiftwing/validation";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/responses/index.js";
import { AppError } from "../utils/Errors/errors.js";


/**
 * 
 * POST: /airplane
 * req.body {modelNumber: "boing-787", capacity: 100}
 * 
 */
export const createAirplane = async (req: Request, res: Response, next: NextFunction) => {
   const isValid = AirplaneSchema.safeParse({
      modelNumber: req.body?.modelNumber,
      capacity: req.body?.capacity
   })

   if (!isValid.success) {
      const explanation = isValid.error.errors
         .map((err) => err.message)
         .join(", ");
      return next(new AppError(ValidationMessages.AIRPLANE.VALIDATION_ERROR, StatusCodes.BAD_REQUEST, explanation))
   }

   try {
      const response = await createAirplaneService(isValid.data)
      return res.status(StatusCodes.CREATED).json(new SuccessResponse(response, "Airplane Created Successfully"));
   }
   catch (error) {
      throw new AppError("Server Error", StatusCodes.INTERNAL_SERVER_ERROR,)
   }
}

export const UpdateAirplane = async (req: Request, res: Response) => {

}