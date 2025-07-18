import { Season } from '../enums';

export interface Pricing {
  season: Season;
  price: number;
  carId: string;
}
