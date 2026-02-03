import express from "express";
import { createAirplane, UpdateAirplane, getAllAirplanes, getAirplane } from "../../controllers/index.js";

const routes = express.Router();

// create Airplane 
routes.post("/", createAirplane)

//getall Airplanes
routes.get("/", getAllAirplanes)

//update Airplane
routes.patch("/:id", UpdateAirplane)

// get a single airplane
routes.get("/:id", getAirplane)

export default routes
