import { StatusCodes } from 'http-status-codes';
import { FlightRepository, CityRepository } from '../repositories/index.js';
import { AppError } from "../utils/Errors/errors.js";



export const searchCityService = async (name: string) => {
    try {
        const cityRepository = new CityRepository();
        const city = await cityRepository.find(name);
        if (!city) {
            throw new AppError("City not found", StatusCodes.NOT_FOUND);
        }
        return city;
    } catch (error) {
        throw error;
    }
}

export const flightSearchService = async (code: string) => {
    try {
        const flightRepository = new FlightRepository();
        const flight = await flightRepository.findFlightWithCode(code);
        if (!flight) {
            throw new AppError("Flight not found", StatusCodes.NOT_FOUND);
        }
        return flight;
    } catch (error) {
        throw error;
    }
}