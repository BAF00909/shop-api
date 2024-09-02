import { ArgumentMetadata, Injectable, PipeTransform }from '@nestjs/common';

@Injectable()
export class PipeTransformFilter implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const newValue = Object.assign({}, value)
		const {type} = metadata;
		if (type === 'query' && newValue?.filter) {
			newValue.filter = newValue.filter.map(item => {
				switch(item.property) {
					case 'Id':
					case 'Art':
					case 'SupplyId':
					case 'ProductGroupId':
					{
						item.value = !isNaN(parseInt(item.value)) ? parseInt(item.value) : item.value;
					}
					break;
					case 'DateIn': {
						item.value = new Date(item.value);
					}
					break;
					default: item.value;
					break;
				}
				return item
			})
		}
		return {
			...newValue
		}
	}
}