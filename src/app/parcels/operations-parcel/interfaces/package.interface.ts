import { PackageType } from "./enums/package-type.enum";

export interface IPackage {
  packageId:    string;
  description:  string;
  price:        number;
  packageType:  PackageType;
  commissionId: string;
}
