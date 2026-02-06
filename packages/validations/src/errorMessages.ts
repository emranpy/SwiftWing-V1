
export const ValidationMessages = {
   AIRPLANE: {
      MODEL_REQUIRED: "Airplane model number is required and must be a string.",
      MODEL_LENGTH: "Model number must be between 3 and 20 characters.",
      CAPACITY_REQUIRED: "Capacity is required and must be a number.",
      CAPACITY_MIN: "Airplane capacity must be at least 1 seat.",
      CAPACITY_MAX: "Airplane capacity cannot exceed 1000 seats.",
      VALIDATION_ERROR: "Validation Error"
   },
   FLIGHT: {
      CODE_REQUIRED: "Flight code is required (e.g., AI-101).",
      TIME_INVALID: "Arrival time must be after departure time.",
      AIRPLANE_ID_REQUIRED: "Airplane id is required",
      DEPARTURE_AIRPORTID_REQUIRED: "departure AirportId is required",
      ARRIVAL_AIRPORT_ID_REQUIRED: "Arrival Airport id is required",
      PRICE_REQUIRED: "Price is required",
      BOARDING_GATE_REQUIRED: 'Bording gate is required',
      TOTAL_SEAT_REQUIRED: 'Total seat is required'
   },
   GLOBAL: {
      INVALID_INPUT: "The data provided is invalid.",
      DB_ERROR: "A database error occurred while processing the request.",
      DATA_NOT_FOUND: "Data Not Found",
      SERVER_ERROR: "Server Error",
      NETWORK_ERROR: "Network Error",
      VALIDATION_ERROR: "Input Validation Error"
   },

   AIRPORT: {
      MODEL_REQUIRED: "Airport model number is required and must be a string.",
      MODEL_LENGTH: "Model number must be between 3 and 20 characters.",
      VALIDATION_ERROR: "Validation Error"
   },

   
  
} as const; 