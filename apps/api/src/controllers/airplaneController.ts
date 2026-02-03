
import { createAirplaneService } from "../services/index.js"
import { type Request, type Response } from "express";
import { AirplaneSchema } from "@swiftwing/validation";
import { StatusCodes } from "http-status-codes";

/**
 * 
 * POST: /airplane
 * req.body {modelNumber: "boing-787", capacity: 100}
 * 
 */
export const createAirplane = async (req: Request, res: Response) => {
   const isValid = AirplaneSchema.safeParse({
      modelNumber: req.body?.modelNumber,
      capacity: req.body?.capacity
   })

   if (!isValid.success) {
      console.log(isValid.error)
      return res.status(StatusCodes.BAD_REQUEST).json({
         success: false,
         message: "Validation Error Model number and Capacity is Required",
         data: {},
         error: {}
      })
   }

   try {
      const response = await createAirplaneService(isValid.data)
      res.status(StatusCodes.CREATED).json({
         success: true,
         message: "Airplane Created Successfully",
         data: response,
         error: {}
      })
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         message: "Something went wrong on the server",
         data: {},
         error: error
      })
   }
}