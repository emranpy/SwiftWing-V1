import express from "express";
import { createAirplane, UpdateAirplane } from "../../controllers/index.js";

const routes = express.Router();

// create airplane 
routes.post("/", createAirplane)


//update airplane
routes.patch("/:id", UpdateAirplane)

export default routes
