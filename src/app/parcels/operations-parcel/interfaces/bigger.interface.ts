import { IPackage } from "./package.interface";

export interface IBigger extends IPackage {
  width:        number;
  height:       number;
  weight:       number;
}
