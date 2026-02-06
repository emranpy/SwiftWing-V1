import express from "express";
import { createFlight, updateFlight, deleteFlight, getAllFlight, getFlight } from "../../controllers/index.js";

const routes = express.Router();

// create Airplane 
routes.post("/", createFlight)

// getall Airplanes
routes.get("/", getAllFlight)

// //update Airplane
routes.patch("/:id", updateFlight)

// // get a single airplane
routes.get("/:id", getFlight)

export default routes
