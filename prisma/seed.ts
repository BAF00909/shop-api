import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const positions = await prisma.positions.createMany({
		data: [
			{PositionName: 'Директор'},
			{PositionName: 'Администратор'},
			{PositionName: 'Кладовщик'},
			{PositionName: 'Грузчик'},
			{PositionName: 'Бухгалтер'},
			{PositionName: 'Продавец-кассир'},
			{PositionName: 'Уборщик'},
			{PositionName: 'Охранник'}
		]
	});
	const productGroups = await prisma.productGroups.createMany({
		data: [
			{GroupName: 'Хлеб'},
			{GroupName: 'Мясо'},
			{GroupName: 'Овощи'},
			{GroupName: 'Фрукты'},
			{GroupName: 'Без. алкогольные напитки'},
			{GroupName: 'Молоко'},
		]
	});
	const providers = await prisma.providers.createMany({
		data: [
			{ProviderName: 'ООО Конкорд'},
			{ProviderName: 'ООО Балтика'},
			{ProviderName: 'ОАО Склад'},
			{ProviderName: 'ИП Барцев'}
		]
	});
	const reasonReturn = await prisma.reasonsReturn.createMany({
		data: [
			{GroupName: 'Товар не надлежащего качества'},
			{GroupName: 'Истек срок годности'},
		]
	});
	const employees = await prisma.employees.createMany({
		data: [
			{
				FirstName: 'Александр',
				SecondName: 'Васильевич',
				LastName: 'Нефедов',
				Birthday: '1976-10-02T00:00:00Z',
				PositionId: 1,
				StartDate: '2017-03-15T00:00:00Z',
				FinishDate: null
			},
			{
				FirstName: 'Мария',
				SecondName: 'Сергеевна',
				LastName: 'Кулик',
				Birthday: '1986-05-11T00:00:00Z',
				PositionId: 2,
				StartDate: '2017-03-25T00:00:00Z',
				FinishDate: null
			},
			{
				FirstName: 'Ольга',
				SecondName: 'Викторовна',
				LastName: 'Кузнецова',
				Birthday: '1998-12-20T00:00:00Z',
				PositionId: 3,
				StartDate: '2024-01-19T00:00:00Z',
				FinishDate: null
			},
		]
	});
	const supplies = await prisma.supplies.createMany({
		data: [
			{
				Date: '2024-08-06T13:05:00Z',
				EmployeeId: 2,
				ProviderId: 4
			}
		]
	});
	const products = await prisma.products.createMany({
		data: [
			{
				Art: 100,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 101,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 102,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 103,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 104,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 105,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 106,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 107,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 108,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 109,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			},
			{
				Art: 110,
				ProductName: 'Хлеб белый',
				ProductGroupId: 1,
				Cost: 32,
				DateIn: '2024-08-06T14:05:00Z',
				Count: 1,
				SupplyId: 1
			}
		]
	});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });