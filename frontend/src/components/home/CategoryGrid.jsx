import { Link } from 'react-router-dom'
import { Cog, Car, Disc, Settings, Wrench, Zap, Lightbulb, Circle, Droplet, Gauge, Armchair, Shield, ArrowLeft } from 'lucide-react'
import { categories } from '../../data/mockData.js'

const iconMap = {
  engine: Cog, car: Car, disc: Disc, settings: Settings,
  wrench: Wrench, cog: Cog, zap: Zap, lightbulb: Lightbulb,
  circle: Circle, droplet: Droplet, gauge: Gauge, armchair: Armchair,
  shield: Shield, tool: Wrench,
}

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">دسته‌بندی محصولات</h2>
        <Link to="/shop" className="text-auto-yellow font-bold text-sm hover:underline flex items-center gap-1">
          مشاهده همه <ArrowLeft size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {categories.map(cat => {
          const Icon = iconMap[cat.icon] || Cog
          return (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="card p-4 md:p-5 flex flex-col items-center text-center group hover:border-auto-yellow transition-all"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-auto-gray group-hover:bg-auto-yellow/20 flex items-center justify-center mb-3 transition-colors">
                <Icon size={28} className="text-auto-black" />
              </div>
              <span className="text-auto-dark font-bold text-xs md:text-sm leading-tight">{cat.name}</span>
              <span className="btn-yellow mt-3 px-4 py-1.5 text-xs w-full">مشاهده</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
