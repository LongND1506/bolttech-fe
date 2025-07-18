import { Pricing } from "./pricing.model";

export interface Car {
  id: string;
  modelName: string;
  brand: string;
  stock: number;
  averagePricePerDay: number;
  totalPrice: number;
}

export interface GetCarsPayload {
  startDate?: string;
  endDate?: string;
  isAvailableOnly?: boolean;
}

export interface CreateCarPayload extends Pick<Car, 'modelName' | 'brand' | 'stock'>  {
    pricings: Pricing[]
};