import { IPagination } from './paggination.interface';

function createNestedObject(path, value) {
	const keys = path.split('.');
	const result = {};
	let current = result;
  
	for (let i = 0; i < keys.length; i++) {
	  const key = keys[i];
	  current[key] = (i === keys.length - 1) ? value : {};
	  current = current[key];
	}
  
	return result;
  }


export class UniversalQueryArgs<T> {
  args: T;

  constructor(queryParams: IPagination, baseArgs: T) {
    this.args = { ...baseArgs } as T;
    // Пагинация
    if (queryParams.skip && queryParams.take) {
      const skip = parseInt(queryParams.skip, 10);
      const take = parseInt(queryParams.take, 10);
      this.args = {
        ...this.args,
        skip,
        take,
      };
    }

    // Сортировка
    if (queryParams.sortBy) {
      this.args = {
        ...this.args,
        orderBy: {
          [queryParams.sortBy.property]: queryParams.sortBy.value,
        },
      };
    }

    // Фильтрация
    if (queryParams.filter) {
      queryParams.filter.forEach((filter) => {
		if (filter.property.includes(".")) {
			this.args = {
				...this.args,
				where: {
				  ...this.args['where'],
				  ...createNestedObject(filter.property, filter.value)
				},
			  };
		} else {
			this.args = {
				...this.args,
				where: {
				  ...this.args['where'],
				  [filter.property]: Array.isArray(filter.value) ? { in: filter.value } : filter.value,
				},
			  };
		}
      });
    }
  }

  getArgs(): T {
    return this.args;
  }
}

