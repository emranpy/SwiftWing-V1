import express from "express";
import { createCity, updateCity, deleteCity, getAllCities, getCity } from "../../controllers/index.js"

const router = express.Router()

router.post('/', createCity);        // POST /api/v1/city
router.get('/', getAllCities);       // GET  /api/v1/city
router.get('/:id', getCity);         // GET  /api/v1/city/123
router.patch('/:id', updateCity);    // PATCH /api/v1/city/123
router.delete('/:id', deleteCity);   // DELETE /api/v1/city/123

export default router;