import { Package } from "./package.interface";

export interface Envelope extends Package {
  price:        number;
  envelopeId:   string;
}
