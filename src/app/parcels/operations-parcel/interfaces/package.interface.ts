import { PackageType } from "./enums/package-type.enum";

export interface Package {
  description:  string;
  packageType:  PackageType;
  commissionId: string;
}
