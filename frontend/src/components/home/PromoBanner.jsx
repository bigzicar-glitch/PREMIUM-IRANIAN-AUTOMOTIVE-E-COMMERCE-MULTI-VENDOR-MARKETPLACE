import { Link } from 'react-router-dom'
import { ArrowLeft, Car } from 'lucide-react'
import { toFaDigits } from '../../lib/format.js'

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main promo banner */}
        <div className="lg:col-span-2 relative bg-auto-black rounded-2xl overflow-hidden p-6 md:p-8 min-h-[280px] flex flex-col justify-center">
          <div className="absolute left-0 bottom-0 w-48 h-32 opacity-20">
            <Car size={120} className="text-auto-yellow" />
          </div>
          <span className="text-auto-yellow text-4xl md:text-6xl font-black mb-2">{toFaDigits('۴۵')}٪</span>
          <span className="text-white text-lg md:text-xl font-bold mb-2">تخفیف ویژه</span>
          <p className="text-white/60 text-sm mb-4 max-w-xs">تا ۴۵٪ تخفیف روی محصولات منتخب — فرصت محدود</p>
          <Link to="/shop?filter=special" className="btn-yellow self-start">
            مشاهده تخفیف‌ها <ArrowLeft size={18} />
          </Link>
        </div>

        {/* Side promos */}
        <div className="bg-auto-gray rounded-2xl p-6 flex flex-col justify-center">
          <span className="text-auto-yellow text-2xl font-black mb-1">{toFaDigits('۵')}٪</span>
          <p className="text-auto-dark font-bold text-sm mb-2">تخفیف اضافه هر دوشنبه</p>
          <p className="text-auto-muted text-xs mb-4">با کد تخفیف MONDAY</p>
          <Link to="/shop" className="btn-yellow self-start py-2 text-xs">مشاهده</Link>
        </div>

        <div className="bg-auto-black2 rounded-2xl p-6 flex flex-col justify-center">
          <span className="text-white font-bold text-lg mb-2">ارسال رایگان</span>
          <p className="text-white/60 text-xs mb-4">برای سفارش‌های بالای ۵۰۰ هزار تومان</p>
          <Link to="/shop" className="btn-outline self-start py-2 text-xs border-white/30 text-white hover:bg-auto-yellow hover:text-auto-black">
            خرید کنید
          </Link>
        </div>
      </div>
    </section>
  )
}
