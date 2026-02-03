
import { z } from 'zod';

// Define a schema for a flight
export const AirplaneSchema = z.object({
  modelNumber: z.string(),
  capacity: z.number()
});

// Export the type so the API can use it too!
export type airplaneSchema = z.infer<typeof AirplaneSchema>;