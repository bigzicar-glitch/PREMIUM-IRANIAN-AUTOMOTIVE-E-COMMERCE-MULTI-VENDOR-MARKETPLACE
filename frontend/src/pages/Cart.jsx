import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Store, Home as HomeIcon } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice, toFaDigits } from '../lib/format.js'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  // Group by seller
  const grouped = items.reduce((acc, item) => {
    const seller = item.sellerName
    if (!acc[seller]) acc[seller] = []
    acc[seller].push(item)
    return acc
  }, {})

  const shippingCost = cartTotal > 500000 ? 0 : 45000
  const grandTotal = cartTotal + shippingCost

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-auto-gray mx-auto flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-auto-muted" />
        </div>
        <h1 className="text-2xl font-extrabold text-auto-black mb-2">سبد خرید شما خالی است</h1>
        <p className="text-auto-muted text-sm mb-6">برای شروع خرید محصولات را کاوش کنید</p>
        <Link to="/shop" className="btn-yellow">شروع خرید <ArrowLeft size={18} /></Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-auto-muted mb-4">
        <Link to="/" className="flex items-center gap-1 hover:text-auto-yellow"><HomeIcon size={14} /> خانه</Link>
        <span>/</span>
        <span className="text-auto-dark font-medium">سبد خرید</span>
      </div>

      <h1 className="text-2xl font-extrabold text-auto-black mb-6">سبد خرید ({toFaDigits(cartCount)} کالا)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(grouped).map(([sellerName, sellerItems]) => (
            <div key={sellerName} className="card p-4">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Store size={18} className="text-auto-yellow" />
                <span className="font-bold text-auto-dark text-sm">{sellerName}</span>
              </div>
              {sellerItems.map(item => (
                <div key={item.key} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                  {/* Image placeholder */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-auto-gray rounded-xl shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" width="40" height="40" style={{ opacity: 0.2 }}>
                      <rect x="20" y="30" width="80" height="60" rx="12" fill="#222" />
                    </svg>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.productSlug || ''}`}>
                      <h3 className="font-bold text-sm text-auto-dark hover:text-auto-yellow transition-colors mb-1">{item.productName}</h3>
                    </Link>
                    <span className="text-xs text-auto-muted">{item.sellerName}</span>
                    <div className="font-black text-auto-dark text-sm mt-1">{formatPrice(item.price)}</div>
                  </div>
                  {/* Quantity */}
                  <div className="flex items-center bg-auto-gray rounded-xl shrink-0">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="p-2 hover:text-auto-yellow">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{toFaDigits(item.quantity)}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="p-2 hover:text-auto-yellow">
                      <Plus size={16} />
                    </button>
                  </div>
                  {/* Remove */}
                  <button onClick={() => removeFromCart(item.key)} className="p-2 text-auto-error hover:bg-auto-error/10 rounded-xl transition-colors shrink-0">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-extrabold text-auto-black text-lg mb-4">خلاصه سفارش</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-auto-muted">مجموع کالاها</span>
                <span className="font-bold text-auto-dark">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-auto-muted">هزینه ارسال</span>
                <span className="font-bold text-auto-dark">
                  {shippingCost === 0 ? <span className="text-auto-success">رایگان</span> : formatPrice(shippingCost)}
                </span>
              </div>
              {shippingCost === 0 && (
                <div className="bg-auto-success/10 rounded-xl p-3 text-xs text-auto-success font-bold">
                  ✓ ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-auto-dark">مبلغ قابل پرداخت</span>
                <span className="font-black text-auto-black text-xl">{formatPrice(grandTotal)}</span>
              </div>
            </div>
            <button className="btn-yellow w-full mb-3">
              ادامه فرآیند خرید <ArrowLeft size={18} />
            </button>
            <Link to="/shop" className="block text-center text-sm text-auto-muted hover:text-auto-yellow transition-colors">
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
