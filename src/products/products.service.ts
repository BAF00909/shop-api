import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/paggination.interface';
import { ProductModel } from './product.model';
import { ProductsRepository } from './product.repository';
import { ProductCreateDto } from './dto/product-create.dto';

@Injectable()
export class ProductsService {
	constructor(private readonly repository: ProductsRepository){}

	async getAllProducts(params: IPagination): Promise<ProductModel[]> {
		return await this.repository.get(params);
	}

	async getProductById(id: number): Promise<ProductModel> {
		return await this.repository.getById(id);
	}

	async createProduct(dto: ProductCreateDto): Promise<ProductModel> {
		return await this.repository.create(dto);
	}

	async updateProduct(product: ProductModel): Promise<ProductModel> {
		return await this.repository.update(product);
	}

	async deleteProduct(id: number): Promise<ProductModel> {
		return await this.repository.delete(id);
	}
}
