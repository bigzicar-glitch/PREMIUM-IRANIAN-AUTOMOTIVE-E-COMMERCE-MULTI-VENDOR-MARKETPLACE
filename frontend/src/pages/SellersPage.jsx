import { Link } from 'react-router-dom'
import { Star, BadgeCheck, MapPin, Package, ArrowLeft, Home as HomeIcon, Store } from 'lucide-react'
import { sellers } from '../data/mockData.js'
import { toFaDigits } from '../lib/format.js'

export default function SellersPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-auto-muted">
        <Link to="/" className="flex items-center gap-1 hover:text-auto-yellow"><HomeIcon size={14} /> خانه</Link>
        <span>/</span>
        <span className="text-auto-dark font-medium">فروشندگان</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-auto-black mb-2">فروشندگان بازار اتو‌پارت</h1>
        <p className="text-auto-muted text-sm mb-6">{toFaDigits(sellers.length)} فروشنده تأیید‌شده</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellers.map(seller => (
            <Link
              key={seller.id}
              to={`/seller/${seller.slug}`}
              className="card p-5 flex items-start gap-4 group hover:border-auto-yellow"
            >
              <div className="w-16 h-16 rounded-2xl bg-auto-black flex items-center justify-center shrink-0">
                <span className="text-auto-yellow font-black text-lg">{seller.logo}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-auto-dark group-hover:text-auto-yellow transition-colors">{seller.name}</h3>
                  {seller.verified && <BadgeCheck size={18} className="text-auto-success" />}
                </div>
                <p className="text-auto-muted text-xs mb-3 line-clamp-2">{seller.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-auto-muted">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {seller.location}</span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-auto-yellow text-auto-yellow" /> {toFaDigits(seller.rating)}
                  </span>
                  <span className="flex items-center gap-1"><Package size={12} /> {toFaDigits(seller.productCount)} محصول</span>
                </div>
              </div>
              <ArrowLeft size={20} className="text-auto-muted group-hover:text-auto-yellow transition-colors shrink-0 mt-2" />
            </Link>
          ))}
        </div>

        {/* Seller registration CTA */}
        <div className="mt-10 bg-auto-black rounded-2xl p-8 text-center">
          <Store size={40} className="text-auto-yellow mx-auto mb-4" />
          <h2 className="text-white text-xl font-extrabold mb-2">فروشنده خود هستید؟</h2>
          <p className="text-white/60 text-sm mb-4">در بازار اتو‌پارت ثبت‌نام کنید و محصولات خود را به هزاران مشتری عرضه کنید</p>
          <button className="btn-yellow">ثبت‌نام فروشندگی</button>
        </div>
      </div>
    </div>
  )
}
