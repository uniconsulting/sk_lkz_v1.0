import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.favorite.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.order.deleteMany(),
    prisma.productPricing.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.productDocument.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.contentBanner.deleteMany(),
    prisma.advantageCard.deleteMany(),
    prisma.blogPost.deleteMany(),
    prisma.auditLog.deleteMany(),
    prisma.settings.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const users = [
    { email: 'admin@simbirsk.local', name: 'Admin User', role: 'ADMIN' },
    { email: 'sales@simbirsk.local', name: 'Sales User', role: 'SALES' },
    { email: 'b2c@simbirsk.local', name: 'B2C User', role: 'B2C' },
    { email: 'b2b@simbirsk.local', name: 'B2B User', role: 'B2B' },
  ];

  await prisma.user.createMany({ data: users });

  const categories = await Promise.all(
    [
      { name: 'Фасадные краски', slug: 'fasadnye-kraski' },
      { name: 'Интерьерные краски', slug: 'interernye-kraski' },
      { name: 'Грунтовки', slug: 'gruntovki' },
    ].map((category) => prisma.category.create({ data: category })),
  );

  const productsData = Array.from({ length: 8 }).map((_, idx) => ({
    name: `Краска SK-${idx + 1}`,
    slug: `kraska-sk-${idx + 1}`,
    description: `Описание продукта SK-${idx + 1}`,
    categoryId: categories[idx % categories.length].id,
  }));

  for (const [idx, productData] of productsData.entries()) {
    const product = await prisma.product.create({ data: productData });

    await prisma.productPricing.create({
      data: {
        productId: product.id,
        retailPrice: 1500 + idx * 100,
        wholesalePrice: 1300 + idx * 100,
        partnerPrice: 1200 + idx * 100,
        promoDiscountPercent: 10,
      },
    });

    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: `https://picsum.photos/seed/sk-${idx + 1}/1200/800`,
        alt: product.name,
        sortOrder: 1,
      },
    });
  }

  await prisma.contentBanner.createMany({
    data: [
      {
        title: 'Весенняя скидка на фасадные решения',
        subtitle: 'Скидки до 10%',
        imageUrl: 'https://picsum.photos/seed/banner-1/1600/500',
        ctaLabel: 'В каталог',
        ctaHref: '/catalog',
        sortOrder: 1,
      },
      {
        title: 'Профессиональные покрытия для B2B',
        subtitle: 'Специальные условия для партнеров',
        imageUrl: 'https://picsum.photos/seed/banner-2/1600/500',
        ctaLabel: 'Подробнее',
        ctaHref: '/account',
        sortOrder: 2,
      },
    ],
  });

  await prisma.advantageCard.createMany({
    data: [
      { title: 'Собственное производство', description: 'Контроль качества на каждом этапе', sortOrder: 1 },
      { title: 'Поддержка специалистов', description: 'Техническая консультация для проектов', sortOrder: 2 },
    ],
  });

  await prisma.settings.create({
    data: {
      id: 'global',
      promoDiscountPercent: 10,
      siteName: 'Симбирские краски',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
