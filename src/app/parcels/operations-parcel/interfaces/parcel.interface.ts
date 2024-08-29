import { Package } from "./package.interface";

export interface Parcel extends Package {
  parcelId:     string;
  weight:       number;
}
