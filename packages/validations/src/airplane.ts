import { z } from "zod";
import { ValidationMessages } from "./errorMessages.js";

export const AirplaneSchema = z.object({
   modelNumber: z.string({
      required_error: ValidationMessages.AIRPLANE.MODEL_REQUIRED,
   }).min(3, ValidationMessages.AIRPLANE.MODEL_LENGTH),
   
   capacity: z.number({
      required_error: ValidationMessages.AIRPLANE.CAPACITY_REQUIRED,
   }).min(1, ValidationMessages.AIRPLANE.CAPACITY_MIN),
});