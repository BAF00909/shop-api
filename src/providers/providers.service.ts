import { Injectable } from '@nestjs/common';
import { ProvidersRepository } from './providers-repository';
import { ProviderModel } from './providerModel';
import { IPagination } from 'src/common/paggination.interface';
import { ProviderCreateDto } from './dto/provider-create-dto';

@Injectable()
export class ProvidersService {
	constructor(private readonly repository: ProvidersRepository){}
	async getAll(params: IPagination): Promise<ProviderModel[]> {
		return await this.repository.get(params);
	}
	async createProvider(dto: ProviderCreateDto): Promise<ProviderModel> {
		return await this.repository.create(dto);
	}
	async updateProvider(provider: ProviderModel): Promise<ProviderModel> {
		return await this.repository.update(provider);
	}
	async getById(id: number): Promise<ProviderModel> {
		return await this.repository.getById(id);
	}
	async deleteProvider(id: number): Promise<ProviderModel> {
		return await this.repository.delete(id);
	}
}
