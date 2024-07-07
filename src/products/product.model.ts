import { Prisma } from "@prisma/client";

export class ProductModel {
	Id: number;
  Art: number;
  ProductName: string;
  DateIn: Date;
  Count: number;
  Cost: Prisma.Decimal;
  ProductGroupId: number;
  SupplyId: number;
}
