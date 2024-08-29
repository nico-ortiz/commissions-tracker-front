import { Package } from "./package.interface";

export interface Bigger extends Package {
  biggerId:     string;
  width:        number;
  height:       number;
  weight:       number;
}
