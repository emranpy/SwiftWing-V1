import express from "express";
import { createAirplane } from "../../controllers/index.js";

const routes = express.Router();

routes.post("/", createAirplane)


export default routes
