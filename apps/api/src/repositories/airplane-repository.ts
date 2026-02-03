import { CrudRepository } from "./crud-repository.js";
import db from "../models/index.js";

const models = db.default || db;

// 2. Grab the Airplane model
const Airplane = models.Airplane;

export class AirplaneRepository extends CrudRepository<any> {
    constructor() {
        super(Airplane);
    }
}