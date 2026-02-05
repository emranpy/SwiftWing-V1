
import express, { type Request, type Response, type NextFunction } from "express";
import apiRoute from "./routes/index.js";
import { AppError } from "./utils/Errors/errors.js"; // Import your class
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoute);



/**
 * THE SUPERVISOR (Global Error Handler)
 * Note: It MUST have 4 arguments for Express to recognize it as an error handler.
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error caught by Supervisor:", err.message);

  const statusCode = err instanceof AppError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: {},
    error: {
      explanation: err.explanation || "Something went wrong on the server"
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});