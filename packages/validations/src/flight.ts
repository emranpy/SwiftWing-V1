import { z } from "zod";
import { ValidationMessages } from "./errorMessages.js";

export const FlightSchema = z.object({
    flightNumber: z.string({ required_error: ValidationMessages.FLIGHT.CODE_REQUIRED }),
    airplaneId: z.number({ required_error: ValidationMessages.FLIGHT.AIRPLANE_ID_REQUIRED }),
    departureAirportId: z.number({ required_error: ValidationMessages.FLIGHT.DEPARTURE_AIRPORTID_REQUIRED }),
    arrivalAirportId: z.number({ required_error: ValidationMessages.FLIGHT.ARRIVAL_AIRPORT_ID_REQUIRED }),
    arrivalTime: z.coerce.date({
        required_error: "Arrival time is required",
        invalid_type_error: "Arrival time must be a valid date",
    }),
    departureTime: z.coerce.date({
        required_error: "Departure time is required",
        invalid_type_error: "Departure time must be a valid date",
    }),
    price: z.number({ required_error: ValidationMessages.FLIGHT.PRICE_REQUIRED }),
    boardingGate: z.string({ required_error: ValidationMessages.FLIGHT.BOARDING_GATE_REQUIRED }),
    totalSeat: z.number({ required_error: ValidationMessages.FLIGHT.TOTAL_SEAT_REQUIRED })
}).refine((data) => data.arrivalTime > data.departureTime, {
    message: "Arrival time must be strictly after departure time",
    path: ["arrivalTime"],
});