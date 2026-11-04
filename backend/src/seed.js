import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Check if already seeded
  const existingCount = await prisma.category.count()
  if (existingCount > 0) {
    console.log('Database already seeded, skipping...')
    return
  }

  // --- Categories ---
  const categoryData = [
    { name: 'قطعات موتور', slug: 'engine-parts', icon: 'engine', sortOrder: 1 },
    { name: 'قطعات بدنه', slug: 'body-parts', icon: 'car', sortOrder: 2 },
    { name: 'سیستم ترمز', slug: 'brake-system', icon: 'disc', sortOrder: 3 },
    { name: 'سیستم تعلیق', slug: 'suspension', icon: 'settings', sortOrder: 4 },
    { name: 'جلوبندی', slug: 'chassis', icon: 'wrench', sortOrder: 5 },
    { name: 'گیربکس', slug: 'gearbox', icon: 'cog', sortOrder: 6 },
    { name: 'قطعات برقی', slug: 'electrical', icon: 'zap', sortOrder: 7 },
    { name: 'چراغ و روشنایی', slug: 'lights', icon: 'lightbulb', sortOrder: 8 },
    { name: 'رینگ و لاستیک', slug: 'tires-wheels', icon: 'circle', sortOrder: 9 },
    { name: 'روغن و فیلتر', slug: 'oil-filter', icon: 'droplet', sortOrder: 10 },
    { name: 'لوازم اسپرت', slug: 'sport-accessories', icon: 'gauge', sortOrder: 11 },
    { name: 'اکسسوری داخلی', slug: 'interior', icon: 'armchair', sortOrder: 12 },
    { name: 'تجهیزات ایمنی', slug: 'safety', icon: 'shield', sortOrder: 13 },
    { name: 'ابزار تعمیرگاهی', slug: 'tools', icon: 'tool', sortOrder: 14 },
  ]
  const categories = {}
  for (const c of categoryData) {
    categories[c.slug] = await prisma.category.create({ data: c })
  }

  // --- Brands ---
  const brandData = [
    { name: 'ایساکو', slug: 'isaco' },
    { name: 'سایپا یدک', slug: 'saipa-yadak' },
    { name: 'عظام', slug: 'azam' },
    { name: 'کروز', slug: 'crouse' },
    { name: 'بوش', slug: 'bosch' },
    { name: 'والئو', slug: 'valeo' },
    { name: 'NGK', slug: 'ngk' },
  ]
  const brands = {}
  for (const b of brandData) {
    brands[b.slug] = await prisma.brand.create({ data: b })
  }

  // --- Vehicle Manufacturers & Models ---
  const vehicleData = [
    { name: 'ایران خودرو', slug: 'irankhodro', models: ['پژو 206', 'پژو 207', 'پژو 405', 'سمند', 'دنا', 'تارا', 'رانا'] },
    { name: 'سایپا', slug: 'saipa', models: ['پراید', 'تیبا', 'ساینا', 'کوییک', 'شاهین'] },
    { name: 'پارس خودرو', slug: 'pars-khodro', models: ['آریسو', 'جک', 'هایما'] },
    { name: 'بهمن موتور', slug: 'bahman-motor', models: ['فیدلیتی', 'دیگنیتی'] },
    { name: 'کرمان موتور', slug: 'kerman-motor', models: ['آریسو', 'جک S5'] },
    { name: 'مدیران خودرو', slug: 'modiran-khodro', models: ['هایما S7'] },
    { name: 'آرین موتور', slug: 'aryan-motor', models: ['سایر مدل‌ها'] },
  ]
  for (const vm of vehicleData) {
    const manufacturer = await prisma.vehicleManufacturer.create({ data: { name: vm.name, slug: vm.slug } })
    for (const modelName of vm.models) {
      await prisma.vehicleModel.create({
        data: {
          name: modelName,
          slug: `${vm.slug}-${modelName.replace(/\s+/g, '-')}`,
          manufacturerId: manufacturer.id,
        },
      })
    }
  }

  // --- Sellers ---
  const sellerData = [
    { storeName: 'فروشگاه قطعات تهران', slug: 'tehran-parts', location: 'تهران', rating: 4.8, reviewCount: 1240, productCount: 350, isVerified: true, status: 'APPROVED', description: 'بزرگ‌ترین فروشگاه قطعات یدکی در تهران با بیش از ۱۰ سال سابقه', commissionRate: 7 },
    { storeName: 'یدک پلاس', slug: 'yadak-plus', location: 'اصفهان', rating: 4.6, reviewCount: 890, productCount: 420, isVerified: true, status: 'APPROVED', description: 'تأمین‌کننده قطعات اصلی و باکیفیت', commissionRate: 8 },
    { storeName: 'اتوپارت ایرانیان', slug: 'autopart-iranian', location: 'شیراز', rating: 4.5, reviewCount: 670, productCount: 280, isVerified: true, status: 'APPROVED', description: 'قطعات یدکی با تضمین اصالت و قیمت رقابتی', commissionRate: 8 },
    { storeName: 'قطعه مارکت', slug: 'gheizhe-market', location: 'مشهد', rating: 4.3, reviewCount: 450, productCount: 190, isVerified: true, status: 'APPROVED', description: 'بازار قطعات خودرو با تنوع بالا', commissionRate: 9 },
    { storeName: 'لوازم یدکی مرکزی', slug: 'central-parts', location: 'تبریز', rating: 4.4, reviewCount: 320, productCount: 230, isVerified: true, status: 'APPROVED', description: 'مرکز پخش قطعات یدکی شمال غرب کشور', commissionRate: 8 },
  ]

  // Create dummy users for sellers
  const sellers = {}
  for (let i = 0; i < sellerData.length; i++) {
    const s = sellerData[i]
    const user = await prisma.user.create({
      data: { phone: `0912${String(i + 1).padStart(7, '0')}`, password: 'hashed_dummy', role: 'SELLER' },
    })
    const seller = await prisma.seller.create({
      data: { ...s, userId: user.id },
    })
    // Create wallet
    await prisma.wallet.create({
      data: { sellerId: seller.id, availableBalance: 0, pendingBalance: 0 },
    })
    // Create performance record
    await prisma.sellerPerformance.create({
      data: {
        sellerId: seller.id,
        fulfillmentRate: 95 + Math.random() * 4,
        cancellationRate: Math.random() * 3,
        avgPrepTime: 1 + Math.random() * 2,
        responseTime: Math.random() * 4,
        returnRate: Math.random() * 2,
        satisfaction: 85 + Math.random() * 14,
      },
    })
    sellers[s.slug] = seller
  }

  // --- Products ---
  const productData = [
    { name: 'لنت ترمز جلو پژو 206', slug: 'lent-trmz-peugeot-206', englishName: 'Brake Pad Front Peugeot 206', sku: 'BP-206-F-001', oemNumber: '206-FRONT-PAD', categorySlug: 'brake-system', brandSlug: 'bosch', price: 850000, originalPrice: 1100000, rating: 4.5, reviewCount: 128, image: 'brake-pad', warranty: '۶ ماه گارانتی', isBestSeller: true, isFeatured: true, isDiscounted: true, specs: { 'جنس': 'نیمه فلزی', 'ضخامت': '۱۵ میلی‌متر', 'وزن': '۸۵۰ گرم' }, description: 'لنت ترمز جلو پژو ۲۰۶، ساخت شرکت بوش، با کیفیت بالا و عمر طولانی.' },
    { name: 'چراغ جلو پژو 206', slug: 'chragh-jolo-peugeot-206', englishName: 'Headlight Peugeot 206', sku: 'HL-206-001', oemNumber: '206-HEAD-L', categorySlug: 'lights', brandSlug: 'valeo', price: 2500000, originalPrice: 2900000, rating: 4.7, reviewCount: 89, image: 'headlight', warranty: '۱۲ ماه گارانتی', isBestSeller: true, isFeatured: true, isDiscounted: true, isSpecial: true, specs: { 'نوع': 'هالوژن', 'ولتاژ': '۱۲ ولت', 'توان': '۵۵ وات' }, description: 'چراغ جلو پژو ۲۰۶، اصلی و باکیفیت.' },
    { name: 'سپر جلو پژو 405', slug: 'sparh-peugeot-405', englishName: 'Front Bumper Peugeot 405', sku: 'BP-405-F-001', oemNumber: '405-FRONT-BUMPER', categorySlug: 'body-parts', brandSlug: 'isaco', price: 1800000, rating: 4.3, reviewCount: 56, image: 'bumper', warranty: 'بدون گارانتی', isNew: true, specs: { 'جنس': 'پلاستیک فشرده', 'رنگ': 'رنگ نشده' }, description: 'سپر جلو پژو ۴۰۵، رنگ نشده، آماده نقاشی.' },
    { name: 'دیسک و صفحه کلاچ پراید', slug: 'dissc-motore-pride', englishName: 'Clutch Disc & Plate Pride', sku: 'CL-PRD-001', oemNumber: 'PRD-CLUTCH', categorySlug: 'engine-parts', brandSlug: 'saipa-yadak', price: 1200000, originalPrice: 1500000, rating: 4.6, reviewCount: 203, image: 'clutch', warranty: '۱۲ ماه گارانتی', isBestSeller: true, isFeatured: true, isDiscounted: true, specs: { 'قطر دیسک': '۱۸۰ میلی‌متر', 'تعداد دندانه': '۱۸' }, description: 'دیسک و صفحه کلاچ پراید، مجموعه کامل، اصلی سایپا یدک.' },
    { name: 'شمع موتور دنا پلاس توربو', slug: 'shogh-danda-plus', englishName: 'Spark Plug Dena Plus Turbo', sku: 'SP-DNA-001', oemNumber: 'DNA-SPARK-T', categorySlug: 'engine-parts', brandSlug: 'ngk', price: 320000, originalPrice: 400000, rating: 4.8, reviewCount: 312, image: 'spark-plug', warranty: 'بدون گارانتی', isNew: true, isFeatured: true, isDiscounted: true, isSpecial: true, specs: { 'نوع': 'ایریدیوم', 'تعداد': '۴ عدد' }, description: 'شمع موتور NGK برای دنا پلاس توربو، بسته ۴ عددی.' },
    { name: 'روغن موتور 5W30 کامل سینتیتیک', slug: 'roghn-motore-5w30', englishName: 'Engine Oil 5W30 Full Synthetic', sku: 'OIL-5W30-4L', oemNumber: 'OIL-5W30', categorySlug: 'oil-filter', brandSlug: 'bosch', price: 650000, originalPrice: 780000, rating: 4.9, reviewCount: 450, image: 'oil', warranty: 'اصالت کالا', isBestSeller: true, isFeatured: true, isDiscounted: true, specs: { 'گرانروی': '5W30', 'حجم': '۴ لیتر', 'نوع': 'کامل سینتیتیک' }, description: 'روغن موتور 5W30 کامل سینتیتیک بوش، ۴ لیتری.' },
    { name: 'فیلتر هوا سمند', slug: 'filter-hava-samand', englishName: 'Air Filter Samand', sku: 'AF-SMD-001', oemNumber: 'SMD-AIR-F', categorySlug: 'oil-filter', brandSlug: 'azam', price: 180000, originalPrice: 220000, rating: 4.4, reviewCount: 78, image: 'air-filter', warranty: 'اصالت کالا', isDiscounted: true, specs: { 'جنس': 'کاغذ فشرده', 'ابعاد': 'استاندارد' }, description: 'فیلتر هوا سمند، اصلی عظام، با کیفیت بالا.' },
    { name: 'رینگ آلیاژی پژو 206 - 15 اینچ', slug: 'ring-peugeot-206-15', englishName: 'Alloy Wheel Peugeot 206 - 15"', sku: 'WHL-206-15', oemNumber: '206-WHEEL-15', categorySlug: 'tires-wheels', brandSlug: 'isaco', price: 4500000, originalPrice: 5200000, rating: 4.7, reviewCount: 34, image: 'wheel', warranty: '۶ ماه گارانتی', isNew: true, isFeatured: true, isDiscounted: true, isSpecial: true, specs: { 'سایز': '۱۵ اینچ', 'تعداد': '۴ عدد', 'رنگ': 'مشکی براق' }, description: 'ست ۴ عددی رینگ آلیاژی پژو ۲۰۶، ۱۵ اینچ، طرح اسپرت.' },
    { name: 'باتری ۶۰ آمپر پژو 405', slug: 'batrie-peugeot-405', englishName: 'Battery 60Ah Peugeot 405', sku: 'BAT-60-001', oemNumber: 'BAT-60AH', categorySlug: 'electrical', brandSlug: 'crouse', price: 2200000, originalPrice: 2600000, rating: 4.5, reviewCount: 167, image: 'battery', warranty: '۱۸ ماه گارانتی', isBestSeller: true, isFeatured: true, isDiscounted: true, specs: { 'ظرفیت': '۶۰ آمپر ساعت', 'ولتاژ': '۱۲ ولت' }, description: 'باتری ۶۰ آمپر ساعتی کروز، مناسب پژو ۴۰۵ و سمند.' },
    { name: 'تسمه تایم سایپا', slug: 'tavangh-saipa', englishName: 'Timing Belt Saipa', sku: 'TB-SAIPA-001', oemNumber: 'SAIPA-TB', categorySlug: 'engine-parts', brandSlug: 'saipa-yadak', price: 450000, rating: 4.2, reviewCount: 92, image: 'timing-belt', warranty: '۶ ماه گارانتی', specs: { 'تعداد دندانه': '۱۱۳', 'عرض': '۲۰ میلی‌متر' }, description: 'تسمه تایم سایپا، اصلی سایپا یدک، مقاوم و باکیفیت.' },
    { name: 'دیواره توری شاهین', slug: 'divar-tarah-shahin', englishName: 'Radiator Grille Shahin', sku: 'GR-SHN-001', oemNumber: 'SHN-GRILLE', categorySlug: 'body-parts', brandSlug: 'saipa-yadak', price: 980000, originalPrice: 1200000, rating: 4.0, reviewCount: 23, image: 'grille', warranty: 'بدون گارانتی', isNew: true, isDiscounted: true, specs: { 'جنس': 'ABS', 'رنگ': 'مشکی' }, description: 'دیواره توری شاهین، اصلی سایپا یدک.' },
    { name: 'سنسور اکسیژن پژو 206', slug: 'sensor-o2-peugeot', englishName: 'Oxygen Sensor Peugeot 206', sku: 'O2-206-001', oemNumber: '206-O2-SENSOR', categorySlug: 'electrical', brandSlug: 'crouse', price: 750000, originalPrice: 900000, rating: 4.6, reviewCount: 145, image: 'sensor', warranty: '۱۲ ماه گارانتی', isBestSeller: true, isFeatured: true, isDiscounted: true, isSpecial: true, specs: { 'نوع': 'بانک۱', 'طول سیم': '۴۰ سانتی‌متر' }, description: 'سنسور اکسیژن پژو ۲۰۶، اصلی کروز.' },
  ]

  // Create products and offers
  const offerData = {
    'lent-trmz-peugeot-206': [
      { sellerSlug: 'tehran-parts', price: 850000, stock: 25, warranty: '۶ ماه', prepTime: '۱ روز' },
      { sellerSlug: 'yadak-plus', price: 880000, stock: 15, warranty: '۳ ماه', prepTime: '۲ روز' },
      { sellerSlug: 'autopart-iranian', price: 820000, stock: 8, warranty: '۶ ماه', prepTime: '۳ روز' },
    ],
    'chragh-jolo-peugeot-206': [
      { sellerSlug: 'tehran-parts', price: 2500000, stock: 10, warranty: '۱۲ ماه', prepTime: '۱ روز' },
      { sellerSlug: 'gheizhe-market', price: 2600000, stock: 5, warranty: '۶ ماه', prepTime: '۲ روز' },
    ],
    'sparh-peugeot-405': [
      { sellerSlug: 'central-parts', price: 1800000, stock: 12, warranty: 'بدون گارانتی', prepTime: '۲ روز' },
    ],
    'dissc-motore-pride': [
      { sellerSlug: 'yadak-plus', price: 1200000, stock: 30, warranty: '۱۲ ماه', prepTime: '۱ روز' },
      { sellerSlug: 'autopart-iranian', price: 1150000, stock: 20, warranty: '۶ ماه', prepTime: '۲ روز' },
      { sellerSlug: 'tehran-parts', price: 1250000, stock: 18, warranty: '۱۲ ماه', prepTime: '۱ روز' },
    ],
    'shogh-danda-plus': [
      { sellerSlug: 'gheizhe-market', price: 320000, stock: 50, warranty: 'بدون گارانتی', prepTime: '۱ روز' },
      { sellerSlug: 'yadak-plus', price: 340000, stock: 40, warranty: 'بدون گارانتی', prepTime: '۱ روز' },
    ],
    'roghn-motore-5w30': [
      { sellerSlug: 'tehran-parts', price: 650000, stock: 60, warranty: 'اصالت کالا', prepTime: '۱ روز' },
      { sellerSlug: 'central-parts', price: 680000, stock: 35, warranty: 'اصالت کالا', prepTime: '۲ روز' },
    ],
    'filter-hava-samand': [
      { sellerSlug: 'autopart-iranian', price: 180000, stock: 40, warranty: 'اصالت کالا', prepTime: '۱ روز' },
    ],
    'ring-peugeot-206-15': [
      { sellerSlug: 'central-parts', price: 4500000, stock: 5, warranty: '۶ ماه', prepTime: '۳ روز' },
    ],
    'batrie-peugeot-405': [
      { sellerSlug: 'tehran-parts', price: 2200000, stock: 15, warranty: '۱۸ ماه', prepTime: '۱ روز' },
      { sellerSlug: 'yadak-plus', price: 2300000, stock: 10, warranty: '۱۸ ماه', prepTime: '۲ روز' },
    ],
    'tavangh-saipa': [
      { sellerSlug: 'autopart-iranian', price: 450000, stock: 25, warranty: '۶ ماه', prepTime: '۱ روز' },
    ],
    'divar-tarah-shahin': [
      { sellerSlug: 'gheizhe-market', price: 980000, stock: 8, warranty: 'بدون گارانتی', prepTime: '۲ روز' },
    ],
    'sensor-o2-peugeot': [
      { sellerSlug: 'tehran-parts', price: 750000, stock: 20, warranty: '۱۲ ماه', prepTime: '۱ روز' },
      { sellerSlug: 'yadak-plus', price: 780000, stock: 12, warranty: '۱۲ ماه', prepTime: '۲ روز' },
    ],
  }

  for (const pd of productData) {
    const product = await prisma.masterProduct.create({
      data: {
        name: pd.name,
        slug: pd.slug,
        englishName: pd.englishName,
        sku: pd.sku,
        oemNumber: pd.oemNumber,
        categoryId: categories[pd.categorySlug].id,
        brandId: brands[pd.brandSlug].id,
        description: pd.description,
        specifications: pd.specs,
        warranty: pd.warranty,
        condition: 'NEW',
        availability: 'IN_STOCK',
        image: pd.image,
        rating: pd.rating,
        reviewCount: pd.reviewCount,
        isBestSeller: pd.isBestSeller || false,
        isNew: pd.isNew || false,
        isFeatured: pd.isFeatured || false,
        isDiscounted: pd.isDiscounted || false,
        isSpecial: pd.isSpecial || false,
      },
    })

    // Create offers
    const offers = offerData[pd.slug] || []
    for (const od of offers) {
      const seller = sellers[od.sellerSlug]
      if (!seller) continue
      const offer = await prisma.sellerOffer.create({
        data: {
          productId: product.id,
          sellerId: seller.id,
          price: od.price,
          originalPrice: pd.originalPrice,
          stock: od.stock,
          prepTime: od.prepTime,
          warranty: od.warranty,
          status: 'ACTIVE',
        },
      })
      await prisma.inventory.create({
        data: { offerId: offer.id, quantity: od.stock, reserved: 0 },
      })
    }
  }

  // --- Blog Posts ---
  const blogData = [
    { title: 'راهنمای کامل تعویض لنت ترمز خودرو', slug: 'brake-pad-guide', excerpt: 'در این مقاله به نحوه تشخیص زمان تعویض لنت ترمز و نکات مهم در انتخاب آن می‌پردازیم.', category: 'راهنمای تعمیر' },
    { title: 'چگونه روغن موتور مناسب خودروی خود را انتخاب کنیم؟', slug: 'engine-oil-guide', excerpt: 'انتخاب روغن موتور مناسب نقش مهمی در سلامت موتور دارد.', category: 'راهنمای نگهداری' },
    { title: 'تفاوت قطعات اصلی و غیر اصلی خودرو', slug: 'oem-vs-aftermarket', excerpt: 'بسیاری از خریداران در انتخاب قطعات اصلی یا غیر اصلی تردید دارند.', category: 'راهنمای خرید' },
    { title: 'زمان تعویض فیلتر هوا و اهمیت آن', slug: 'air-filter-replacement', excerpt: 'فیلتر هوا یکی از مهم‌ترین قطعات مصرفی است.', category: 'راهنمای نگهداری' },
    { title: 'معرفی سیستم تعلیق خودرو و قطعات آن', slug: 'suspension-system', excerpt: 'سیستم تعلیق نقش مهمی در راحتی و ایمنی رانندگی دارد.', category: 'آموزش فنی' },
    { title: 'نکات طلایی نگهداری باتری خودرو در زمستان', slug: 'battery-winter-care', excerpt: 'با فرا رسیدی فصل سرما، نگهداری باتری اهمیت بیشتری پیدا می‌کند.', category: 'راهنمای نگهداری' },
  ]
  for (const bp of blogData) {
    await prisma.blogPost.create({ data: { ...bp, publishedAt: new Date() } })
  }

  // --- Banners ---
  const bannerData = [
    { title: '۴۵٪ تخفیف', subtitle: 'تا ۴۵٪ تخفیف روی محصولات منتخب', ctaText: 'مشاهده تخفیف‌ها', position: 'hero', isActive: true },
    { title: 'ارسال رایگان', subtitle: 'ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان', ctaText: 'خرید کنید', position: 'top', isActive: true },
    { title: 'ضمانت اصالت', subtitle: 'تمامی محصولات با ضمانت اصالت کالا', ctaText: 'اطلاعات بیشتر', position: 'side', isActive: true },
  ]
  for (const b of bannerData) {
    await prisma.banner.create({ data: b })
  }

  console.log('Seed completed successfully!')
  console.log(`  Categories: ${categoryData.length}`)
  console.log(`  Brands: ${brandData.length}`)
  console.log(`  Sellers: ${sellerData.length}`)
  console.log(`  Products: ${productData.length}`)
  console.log(`  Blog posts: ${blogData.length}`)
  console.log(`  Banners: ${bannerData.length}`)
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
