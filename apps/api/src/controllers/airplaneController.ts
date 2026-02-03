
import { createAirplaneService, updateAirplaneService } from "../services/index.js"
import { type Request, type Response, type NextFunction } from "express";
import { AirplaneSchema, ValidationMessages } from "@swiftwing/validation";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/responses/index.js";
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
      return next(new AppError(ValidationMessages.GLOBAL.DB_ERROR, StatusCodes.BAD_REQUEST))
   }
}

/**
 * 
 * PATCH: /airplane
 * req.body {modelNumber: "boing-787", capacity: 100}
 * 
 */
export const UpdateAirplane = async (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id
   if (!id) throw new AppError("Id is Required", StatusCodes.BAD_REQUEST)

   const { capacity, modelNumber } = await req.body
   if (!capacity && !modelNumber) {
      return next(new AppError(ValidationMessages.AIRPLANE.VALIDATION_ERROR, StatusCodes.BAD_REQUEST, "Input Validation Error"))
   }

   const response = await updateAirplaneService(id, {
      capacity,
      modelNumber
   })
   //res object {data[null, {...data}]} response [1] only fetch the data 
   return res.status(StatusCodes.CREATED).json(new SuccessResponse(response[1], "Airplane Updated Successfully"));
}