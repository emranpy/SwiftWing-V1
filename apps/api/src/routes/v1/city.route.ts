import express from "express";
import { createCity, updateCity, deleteCity, getAllCities, getCity } from "../../controllers/index.js"

const routes = express.Router()

//create a city 
routes.post("/", createCity)

//update city 
routes.patch("/:id", updateCity)

//delete city
routes.delete("/:id", deleteCity)

//get all city
routes.get("/", getAllCities)

//get a single city
routes.get("/:id", getCity)
export default routes;