import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductModel } from "./product.model";
import { ProductCreateDto } from "./dto/product-create.dto";
import { IPagingResult } from "src/common/ipagingResult.interface";
import { UniversalQueryArgs } from "src/common/QueryBuilder";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductsRepository {
	constructor(private readonly db: PrismaService){}

	async get(params: IPagination): Promise<IPagingResult<ProductModel>> {
		const queryParams = new UniversalQueryArgs<Prisma.ProductsFindManyArgs>(params, {}).getArgs();
		let totalPage: number = 0;
		if (queryParams.take) {
			totalPage = Math.ceil(await this.db.products.count({where: {...queryParams?.where}}) / queryParams.take);
		}
		return {
			list: await this.db.products.findMany({
				...queryParams,
				include: {
					ProductGroups: {
						select: {
							GroupName: true
						}
					},
					Supplies: {
						select: {
							Date: true,
							Providers: {
								select: {
									ProviderName: true
								}
							}
						}
					}
				}
			}),
			totalPage
		};
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