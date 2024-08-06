import { ArgumentMetadata, Injectable, PipeTransform }from '@nestjs/common';

@Injectable()
export class PipeTransformId implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const newValue = Object.assign({}, value)
		const {type} = metadata;
		if (type === 'query' && newValue?.filter) {
			newValue.filter = newValue.filter.map(item => {
				if (item.property === 'Id') {
					item.value = !isNaN(parseInt(item.value)) ? parseInt(item.value) : item.value;
				}
				return item
			})
		}
		return {
			...newValue
		}
	}
}