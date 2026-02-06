import express from "express";
import { createAirport, getAllAirport} from "../../controllers/index.js";

const routes = express.Router();

// create Airplane 
routes.post("/", createAirport)

// getall Airplanes
routes.get("/", getAllAirport)

// //update Airplane
// routes.patch("/:id", UpdateAirplane)

// // get a single airplane
// routes.get("/:id", getAirplane)

export default routes
