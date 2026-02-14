export type MockProduct = {
  slug: string;
  title: string;
  price: number;
};

export const mockProducts: MockProduct[] = [
  { slug: 'interior-nezno-golubaya', title: 'Интерьерная краска Нежно-голубая', price: 1990 },
  { slug: 'fasad-ultra-white', title: 'Фасадная краска Ultra White', price: 2490 },
  { slug: 'grunt-universal', title: 'Грунт универсальный', price: 890 },
  { slug: 'lak-protect', title: 'Лак защитный', price: 1390 },
];
