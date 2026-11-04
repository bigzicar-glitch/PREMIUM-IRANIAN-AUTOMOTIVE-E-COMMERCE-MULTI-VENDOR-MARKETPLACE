import { Link, useParams } from 'react-router-dom'
import { Star, BadgeCheck, MapPin, Package, ArrowLeft, Home as HomeIcon, Phone, Mail } from 'lucide-react'
import { sellers, products } from '../data/mockData.js'
import { toFaDigits, formatPrice } from '../lib/format.js'

export default function SellerStore() {
  const { slug } = useParams()
  const seller = sellers.find(s => s.slug === slug)

  if (!seller) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">فروشگاه یافت نشد</h1>
        <Link to="/sellers" className="btn-yellow">بازگشت به فروشندگان</Link>
      </div>
    )
  }

  // Find products by this seller
  const sellerProducts = products.filter(p =>
    p.offers?.some(o => o.sellerId === seller.id)
  )

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-auto-muted">
        <Link to="/" className="flex items-center gap-1 hover:text-auto-yellow"><HomeIcon size={14} /> خانه</Link>
        <span>/</span>
        <Link to="/sellers" className="hover:text-auto-yellow">فروشندگان</Link>
        <span>/</span>
        <span className="text-auto-dark font-medium">{seller.name}</span>
      </div>

      {/* Store Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative bg-auto-black rounded-2xl overflow-hidden p-6 md:p-8 mb-6">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-l from-auto-yellow/5 to-transparent"></div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-auto-yellow flex items-center justify-center shrink-0">
              <span className="text-auto-black font-black text-2xl">{seller.logo}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-white text-xl md:text-2xl font-extrabold">{seller.name}</h1>
                {seller.verified && <BadgeCheck size={24} className="text-auto-yellow" />}
              </div>
              <p className="text-white/60 text-sm mb-3 max-w-xl">{seller.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-white/80">
                  <MapPin size={16} className="text-auto-yellow" /> {seller.location}
                </span>
                <span className="flex items-center gap-1.5 text-white/80">
                  <Star size={16} className="fill-auto-yellow text-auto-yellow" /> {toFaDigits(seller.rating)} ({toFaDigits(seller.reviewCount)} نظر)
                </span>
                <span className="flex items-center gap-1.5 text-white/80">
                  <Package size={16} className="text-auto-yellow" /> {toFaDigits(seller.productCount)} محصول
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-extrabold text-auto-black mb-4">محصولات این فروشگاه</h2>
        {sellerProducts.length === 0 ? (
          <p className="text-auto-muted text-sm text-center py-10">محصولی برای این فروشگاه یافت نشد</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {sellerProducts.map(p => {
              const offer = p.offers.find(o => o.sellerId === seller.id)
              return (
                <Link key={p.id} to={`/product/${p.slug}`} className="card overflow-hidden group">
                  <div className="aspect-square bg-auto-gray flex items-center justify-center">
                    <svg viewBox="0 0 120 120" width="48" height="48" style={{ opacity: 0.2 }}>
                      <rect x="20" y="30" width="80" height="60" rx="12" fill="#222" />
                    </svg>
                  </div>
                  <div className="p-3">
                    <span className="text-xs text-auto-muted">{p.brand}</span>
                    <h3 className="font-bold text-sm text-auto-dark group-hover:text-auto-yellow transition-colors line-clamp-2 mb-2">{p.name}</h3>
                    <span className="font-black text-auto-dark text-sm">{formatPrice(offer.price)}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Contact */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="card p-6">
          <h3 className="font-bold text-auto-dark mb-4">اطلاعات تماس</h3>
          <div className="flex flex-wrap gap-6 text-sm text-auto-muted">
            <span className="flex items-center gap-2"><Phone size={16} /> ۰۲۱-۱۲۳۴۵۶۷۸</span>
            <span className="flex items-center gap-2"><Mail size={16} /> {seller.slug}@autopart.ir</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> {seller.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
