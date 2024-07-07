import { Injectable } from '@nestjs/common';
import { SupplyRepository } from './supplies.repository';
import { IPagination } from 'src/common/paggination.interface';
import { SupplyModel } from './supply.model';
import { SupplyCreateDto } from './dto/supply-create.dto';

@Injectable()
export class SuppliesService {
	constructor(private readonly repository: SupplyRepository){}
	async getAllSupplies(params: IPagination): Promise<SupplyModel[]> {
		return await this.repository.get(params);
	}
	async createSupply(dto: SupplyCreateDto): Promise<SupplyModel> {
		return await this.repository.create(dto);
	}
	async getSupplyById(id: number): Promise<SupplyModel> {
		return await this.repository.getById(id);
	}
	async updateSupply(supply: SupplyModel): Promise<SupplyModel> {
		return this.repository.update(supply);
	}
	async deleteSupply(id: number): Promise<SupplyModel> {
		return this.repository.delete(id);
	}
}
