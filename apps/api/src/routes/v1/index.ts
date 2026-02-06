import express from "express";
import {getInfoData} from "../../controllers/index.js"
import airplaneroutes from "./airplane.route.js"
import cityRoutes from "./city.route.js"
import airPortRoutes from "./airport.route.js"
import flightRoutes from "./flight.route.js"
//Virsion control routes

const router = express.Router();

//airplane Routes
router.use("/airplane", airplaneroutes)
router.use("/city", cityRoutes )
router.use("/airport", airPortRoutes)
router.get("/info", getInfoData)
router.use("/flight", flightRoutes)


export default router;