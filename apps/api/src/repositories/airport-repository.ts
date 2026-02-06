import { CrudRepository } from "./crud-repository.js";
import db from "../models/index.js";

const models = db.default || db;

// 2. Grab the Airplane model
const Airport = models.Airport;

export class AirportRepository extends CrudRepository<any> {
    constructor() {
        super(Airport);
    }
} 