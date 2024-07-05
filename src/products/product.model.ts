import { ProductCategoryModel } from "./product-category.model";

export class ProductModel {
	art: number;
	name: string;
	price: number;
	dateIn: Date;
	count: number;
	category: ProductCategoryModel;
}
