import { CrudRepository } from "./crud-repository.js";
import db from "../models/index.js";

const models = db.default || db;
const Flight = models.Flight;

export class FlightRepository extends CrudRepository<any> {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter: any) {
        try {
            const response = await Flight.findAll({
                where: filter,
                include: [
                    {
                        model: models.Airplane,
                        as: 'airplane' // Changed from 'airplaneDetails' to 'airplane'
                    },
                    {
                        model: models.Airport,
                        as: 'departureAirport'
                    },
                    {
                        model: models.Airport,
                        as: 'arrivalAirport'
                    }
                ]
            });
            return response;
        } catch (error) {
            console.error("Repository Error:", error);
            throw error;
        }
    }
}