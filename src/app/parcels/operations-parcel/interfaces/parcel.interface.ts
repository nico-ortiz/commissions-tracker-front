import { Package } from "./package.interface";

export interface Parcel extends Package {
  price:        number;
  parcelId:     string;
  weight:       number;
}
