import { CrudRepository } from "./crud-repository.js";
import db from "../models/index.js";

const models = db.default || db;

const Flight = models.Flight;


export class FlightRepository extends CrudRepository<any> {
    constructor() {
        super(Flight);
    }
}