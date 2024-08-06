import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ProviderModel } from "./providerModel";
import { ProviderCreateDto } from "./dto/provider-create-dto";
import { UniversalQueryArgs } from "src/common/QueryBuilder";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProvidersRepository {
	constructor(private readonly db: PrismaService){}

	async get(params: IPagination): Promise<ProviderModel[]>{
		const queryParams = new UniversalQueryArgs<Prisma.ProvidersFindManyArgs>(params, {}).getArgs();
		return this.db.providers.findMany(queryParams);
	}

	async create(dto: ProviderCreateDto): Promise<ProviderModel> {
		return await this.db.providers.create({
			data: {
				...dto
			}
		})
	}

	async update(provider: ProviderModel): Promise<ProviderModel> {
		return await this.db.providers.update({
			where: {Id: provider.Id},
			data: {...provider}
		})
	}

	async getById(id: number): Promise<ProviderModel> {
		return await this.db.providers.findFirst({where: {Id: id}});
	}

	async delete(id: number): Promise<ProviderModel> {
		return await this.db.providers.delete({where: {Id: id}})
	}
}
