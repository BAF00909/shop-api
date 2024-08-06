import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { SupplyModel } from "./supply.model";
import { SupplyCreateDto } from "./dto/supply-create.dto";
import { UniversalQueryArgs } from "src/common/QueryBuilder";
import { Prisma } from "@prisma/client";

@Injectable()
export class SupplyRepository {
	constructor(private readonly db: PrismaService){}
	async get(params: IPagination): Promise<SupplyModel[]> {
		const queryParams = new UniversalQueryArgs<Prisma.SuppliesFindManyArgs>(params, {}).getArgs();
		return await this.db.supplies.findMany(queryParams);
	}
	async getById(id: number): Promise<SupplyModel> {
		return await this.db.supplies.findFirst({
			where: {
				Id: id
			}
		});
	}
	async create(dto: SupplyCreateDto): Promise<SupplyModel> {
		return await this.db.supplies.create({
			data: {
				Date: new Date(),
				EmployeeId: Number(dto.EmployeeId),
				ProviderId: Number(dto.ProviderId)
			}
		})
	}
	async update(supply: SupplyModel): Promise<SupplyModel> {
		return await this.db.supplies.update({
			where: {Id: supply.Id},
			data: {...supply}
		})
	}
	async delete(id: number): Promise<SupplyModel> {
		return await this.db.supplies.delete({where: {Id: id}})
	}
}