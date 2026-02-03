

import { createAirplaneService, updateAirplaneService, getAirplanesService, getAirplaneService } from "../services/index.js"
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

   const { capacity, modelNumber } = await req.body
   if (!capacity && !modelNumber) {
      return next(new AppError(ValidationMessages.AIRPLANE.VALIDATION_ERROR, StatusCodes.BAD_REQUEST, "Input Validation Error"))
   }

   const response = await updateAirplaneService(Number(req.params.id), {
      capacity,
      modelNumber
   })
   //res object {data[null, {...data}]} response [1] only fetch the data 
   return res.status(StatusCodes.CREATED).json(new SuccessResponse(response[1], "Airplane Updated Successfully"));
}

/**
 * 
 * Get: /airplane
 */
export const getAllAirplanes = async (req: Request, res: Response, next: NextFunction) => {
   const response = await getAirplanesService()
   if (!response.data) {
      return next(new AppError(ValidationMessages.GLOBAL.DATA_NOT_FOUND, StatusCodes.BAD_REQUEST, "No Airplane Found"))
   }
   return res.status(StatusCodes.CREATED).json(new SuccessResponse(response));
}

/**
 * Get: /airplane/:id
 */
export const getAirplane = async (req: Request, res: Response, next: NextFunction) => {
   const response = await getAirplaneService(Number(req.params.id))
   //res object {data[null, {...data}]} response [1] only fetch the data 
   return res.status(StatusCodes.CREATED).json(new SuccessResponse(response, "Successfully Fteched Airplane"));
}