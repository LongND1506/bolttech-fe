import { Car } from "./car.model";

export interface Booking {
    id: string;
    email: string;
    startDate: string;
    endDate: string;
    car: Car;
}