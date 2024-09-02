import { Status } from "./enums/status.enum";
import { IPackage } from "./package.interface";

export interface Commission {
  commissionId: string;
  description:  string;
  status:       Status;
  date:         Date;
  price:        number;
  customerId:   string;
  receiverId:   string;
  packages:     IPackage[];
}
