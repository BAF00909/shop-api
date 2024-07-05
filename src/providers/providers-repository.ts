import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ProviderModel } from "./providerModel";
import { PagginationProvidersModel } from "./pagginationProvidersModel";
import { ProviderCreateDto } from "./dto/provider-create-dto";

@Injectable()
export class ProvidersRepository {
	constructor(private readonly db: PrismaService){}

	async get(params: IPagination): Promise<ProviderModel[]>{
		const {queryParams} = new PagginationProvidersModel(params);
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
