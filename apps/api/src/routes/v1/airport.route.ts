import express from "express";
import { createAirport, getAllAirport, updateAirport, getAirport } from "../../controllers/index.js";

const routes = express.Router();

// create Airplane 
routes.post("/", createAirport)

// getall Airplanes
routes.get("/", getAllAirport)

// //update Airplane
routes.patch("/:id", updateAirport)

// // get a single airplane
routes.get("/:id", getAirport)

export default routes
