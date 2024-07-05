import { Injectable } from '@nestjs/common';
import { ProductGroupsRepository } from './product-groups-repository';
import { ProductGroup } from './product-group.model';
import { IPagination } from 'src/common/paggination.interface';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';

@Injectable()
export class ProductGroupsService {
	constructor(private readonly repository: ProductGroupsRepository){}
	async getAll(params: IPagination): Promise<ProductGroup[]> {
		return await this.repository.get(params);
	}
	async getById(id: number): Promise<ProductGroup> {
		return await this.repository.getById(id);
	}
	async createProductGroup(dto: ProductGroupCreateDto): Promise<ProductGroup> {
		return await this.repository.create(dto);
	}
	async updateProductGroup(productGroup: ProductGroup): Promise<ProductGroup> {
		return await this.repository.update(productGroup);
	}
	async deleteProductGroup(id: number): Promise<ProductGroup> {
		return await this.repository.delete(id);
	}
}
