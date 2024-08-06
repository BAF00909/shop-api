import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductGroup } from "./product-group.model";
import { ProductGroupCreateDto } from "./dto/product-group-create.dto";
import { UniversalQueryArgs } from "src/common/QueryBuilder";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductGroupsRepository {
	constructor(private readonly db: PrismaService){}
	async get(params: IPagination): Promise<ProductGroup[]> {
		const queryParams = new UniversalQueryArgs<Prisma.ProductGroupsFindManyArgs>(params, {}).getArgs();
		return await this.db.productGroups.findMany(queryParams);
	}
	async getById(id: number): Promise<ProductGroup> {
		return await this.db.productGroups.findFirst({where: {Id: id}})
	}
	async create(dto: ProductGroupCreateDto): Promise<ProductGroup> {
		return await this.db.productGroups.create({
			data: {
				...dto
			}
		})
	}
	async update({Id, GroupName}: ProductGroup): Promise<ProductGroup> {
		return await this.db.productGroups.update({
			where: {
				Id: Id
			},
			data: {
				GroupName
			}
		})
	}
	async delete(id: number): Promise<ProductGroup> {
		return await this.db.productGroups.delete({
			where: {
				Id: id
			}
		})
	}
}
