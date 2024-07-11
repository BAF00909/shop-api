import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductModel } from "./product.model";
import { PagginationProductsModel } from "./pagginationProductsModel";
import { ProductCreateDto } from "./dto/product-create.dto";

@Injectable()
export class ProductsRepository {
	constructor(private readonly db: PrismaService){}

	async get(params: IPagination): Promise<ProductModel[]> {
		const {queryParams} = new PagginationProductsModel(params);
		return await this.db.products.findMany({
			...queryParams,
			include: {
				ProductGroups: {
					select: {
						GroupName: true
					}
				}
			}
		});
	}

	async getById(id: number): Promise<ProductModel> {
		return await this.db.products.findFirst({where: {Id: id}});
	}

	async create(dto: ProductCreateDto): Promise<ProductModel> {
		return await this.db.products.create({
			data: {
				DateIn: new Date(),
				...dto
			}
		})
	}

	async update(product: ProductModel): Promise<ProductModel> {
		return await this.db.products.update({
			where: {Id: product.Id},
			data: {
				...product
			}
		})
	}

	async delete(id: number): Promise<ProductModel> {
		return await this.db.products.delete({where: {Id: id}})
	}
}