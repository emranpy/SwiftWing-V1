import express from "express";
import {getInfoData} from "../../controllers/index.js"
import airplaneroutes from "./airplane.route.js"
//Virsion control routes

const router = express.Router();

//airplane Routes
router.use("/airplane", airplaneroutes)

router.get("/info", getInfoData)


export default router;