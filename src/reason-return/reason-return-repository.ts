import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ReasonReturnModel } from "./reason-return-model";
import { ReasonReturnDto } from "./dto/reason-return-create.dto";
import { UniversalQueryArgs } from "src/common/QueryBuilder";
import { Prisma } from "@prisma/client";

@Injectable()
export class ReasonReturnRepository {
	constructor(private readonly db: PrismaService){}
	async get(params: IPagination): Promise<ReasonReturnModel[]> {
		const queryParams = new UniversalQueryArgs<Prisma.ReasonsReturnFindManyArgs>(params, {}).getArgs();
		return await this.db.reasonsReturn.findMany(queryParams);
	}
	async getById(id: number): Promise<ReasonReturnModel> {
		return await this.db.reasonsReturn.findFirst({where: {Id: id}});
	}
	async create(dto: ReasonReturnDto): Promise<ReasonReturnModel> {
		return await this.db.reasonsReturn.create({
			data: {
				...dto
			}
		})
	}
	async update(reason: ReasonReturnModel): Promise<ReasonReturnModel> {
		return await this.db.reasonsReturn.update({
			where: {Id: reason.Id},
			data: {
				...reason
			}
		})
	}
	async delete(id: number): Promise<ReasonReturnModel> {
		return await this.db.reasonsReturn.delete({
			where: {Id: id}
		})
	}
}
