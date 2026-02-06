import { z } from "zod";
import { ValidationMessages } from "./errorMessages.js";

export const AirportSchema = z.object({
    name: z.string({
        required_error: ValidationMessages.AIRPORT.MODEL_REQUIRED
    }).min(3, ValidationMessages.AIRPORT.MODEL_LENGTH),

    code: z.string({ required_error: ValidationMessages.AIRPORT.MODEL_REQUIRED }),

    address: z.string({ required_error: ValidationMessages.AIRPORT.MODEL_REQUIRED }),

    cityId: z.number(),
});