import { AirplaneRepository } from "../repositories/index.js"

const airplaneRepository = new AirplaneRepository();

export const createAirplaneService = async (data: object) => {
    try {
        const response = await airplaneRepository.create(data)
        return response
    } catch (error) {
        throw Error
    }
}

