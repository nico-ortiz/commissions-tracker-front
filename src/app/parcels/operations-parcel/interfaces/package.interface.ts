import { PackageType } from "./enums/package-type.enum";

export interface Package {
  description:  string;
  price:        number;
  packageType:  PackageType;
  commissionId: string;
}
