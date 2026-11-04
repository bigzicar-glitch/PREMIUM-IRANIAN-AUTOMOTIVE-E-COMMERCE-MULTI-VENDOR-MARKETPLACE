import { Link } from 'react-router-dom'
import { Star, BadgeCheck, MapPin, ArrowLeft, Package } from 'lucide-react'
import { sellers } from '../../data/mockData.js'
import { toFaDigits } from '../../lib/format.js'

export default function SellersSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title mb-1">فروشندگان تأیید‌شده</h2>
          <p className="text-auto-muted text-sm">فروشگاه‌های معتبر و تأیید‌شده بازار اتو‌پارت</p>
        </div>
        <Link to="/sellers" className="text-auto-yellow font-bold text-sm hover:underline flex items-center gap-1">
          مشاهده همه <ArrowLeft size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {sellers.map(seller => (
          <Link
            key={seller.id}
            to={`/seller/${seller.slug}`}
            className="card p-4 md:p-5 flex flex-col items-center text-center group hover:border-auto-yellow"
          >
            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl bg-auto-black flex items-center justify-center mb-3">
              <span className="text-auto-yellow font-black text-lg">{seller.logo}</span>
            </div>
            {/* Name */}
            <div className="flex items-center gap-1 mb-1">
              <h3 className="font-bold text-auto-dark text-sm group-hover:text-auto-yellow transition-colors">{seller.name}</h3>
              {seller.verified && <BadgeCheck size={16} className="text-auto-success" />}
            </div>
            {/* Location */}
            <span className="flex items-center gap-1 text-xs text-auto-muted mb-2">
              <MapPin size={12} /> {seller.location}
            </span>
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star size={14} className="fill-auto-yellow text-auto-yellow" />
              <span className="text-xs font-bold text-auto-dark">{toFaDigits(seller.rating)}</span>
              <span className="text-xs text-auto-muted">({toFaDigits(seller.reviewCount)})</span>
            </div>
            {/* Products count */}
            <span className="flex items-center gap-1 text-xs text-auto-muted">
              <Package size={12} /> {toFaDigits(seller.productCount)} محصول
            </span>
            <span className="btn-yellow mt-3 px-3 py-1.5 text-xs w-full">مشاهده فروشگاه</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
