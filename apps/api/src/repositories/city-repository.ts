import { CrudRepository } from "./crud-repository.js";
import db from "../models/index.js";

const models = db.default || db;

const City = models.city;

if (!City) {
    console.error("❌ ERROR: City model not found! Check your models/index.js exports.");
}

export class CityRepository extends CrudRepository<any> {
    constructor() {
        super(City);
    }
}