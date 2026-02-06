
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
   },
   GLOBAL: {
      INVALID_INPUT: "The data provided is invalid.",
      DB_ERROR: "A database error occurred while processing the request.",
      DATA_NOT_FOUND: "Data Not Found",
      SERVER_ERROR: "Server Error",
      NETWORK_ERROR: "Network Error",
   },

   AIRPORT: {
      MODEL_REQUIRED: "Airport model number is required and must be a string.",
      MODEL_LENGTH: "Model number must be between 3 and 20 characters.",
      VALIDATION_ERROR: "Validation Error"
   },
} as const; 