import { brands } from '../../data/mockData.js'

export default function BrandsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="section-title text-center">برندهای معتبر</h2>
      <p className="text-center text-auto-muted text-sm mb-8">بیش از ۲۰۰ شریک تأیید‌شده و برند معتبر</p>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
        {brands.map(brand => (
          <div
            key={brand.id}
            className="bg-auto-gray rounded-2xl h-20 md:h-24 flex items-center justify-center hover:bg-auto-yellow/10 transition-colors cursor-pointer"
          >
            <span className="font-black text-auto-black/40 hover:text-auto-black text-sm md:text-base transition-colors">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
