import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home as HomeIcon, ShoppingCart, Star, Check, BadgeCheck, Shield, Truck, Plus, Minus, Package } from 'lucide-react'
import { products, categories, sellers } from '../data/mockData.js'
import { formatPrice, discountPercent, toFaDigits } from '../lib/format.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = useMemo(() => products.find(p => p.slug === slug), [slug])
  const { addToCart } = useCart()
  const [selectedOffer, setSelectedOffer] = useState(product?.offers?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('specs')
  const [sortOffers, setSortOffers] = useState('price-low')

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">محصول یافت نشد</h1>
        <Link to="/shop" className="btn-yellow">بازگشت به فروشگاه</Link>
      </div>
    )
  }

  const discount = discountPercent(product.originalPrice, product.price)
  const categorySlug = categories.find(c => c.id === product.categoryId)?.slug || ''

  const sortedOffers = [...(product.offers || [])].sort((a, b) => {
    if (sortOffers === 'price-low') return a.price - b.price
    if (sortOffers === 'rating') return b.rating - a.rating
    return 0
  })

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 5)

  const handleAddToCart = () => {
    addToCart(product, selectedOffer, quantity)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-auto-muted flex-wrap">
        <Link to="/" className="flex items-center gap-1 hover:text-auto-yellow"><HomeIcon size={14} /> خانه</Link>
        <span>/</span>
        <Link to={`/shop?category=${categorySlug}`} className="hover:text-auto-yellow">{product.category}</Link>
        <span>/</span>
        <span className="text-auto-dark font-medium">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-auto-gray rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
              <ProductPlaceholder type={product.image} large />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`aspect-square bg-auto-gray rounded-xl flex items-center justify-center cursor-pointer border-2 ${i === 0 ? 'border-auto-yellow' : 'border-transparent'}`}>
                  <ProductPlaceholder type={product.image} />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-auto-gray text-auto-dark">{product.brand}</span>
              <span className="badge bg-auto-yellow/20 text-auto-black">{product.condition}</span>
              {product.availability === 'موجود' && (
                <span className="badge bg-auto-success/10 text-auto-success"><Check size={12} /> موجود</span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-auto-black mb-2">{product.name}</h1>
            <p className="text-auto-muted text-sm mb-3">{product.englishName}</p>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} className={i <= Math.round(product.rating) ? 'fill-auto-yellow text-auto-yellow' : 'text-gray-300'} />
                ))}
              </div>
              <span className="font-bold text-sm">{toFaDigits(product.rating)}</span>
              <span className="text-sm text-auto-muted">({toFaDigits(product.reviewCount)} نظر)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-auto-gray rounded-xl p-3">
                <span className="text-xs text-auto-muted block mb-1">کد محصول (SKU)</span>
                <span className="font-bold text-sm text-auto-dark">{product.sku}</span>
              </div>
              <div className="bg-auto-gray rounded-xl p-3">
                <span className="text-xs text-auto-muted block mb-1">شماره OEM</span>
                <span className="font-bold text-sm text-auto-dark">{product.oemNumber}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              {product.originalPrice && discount > 0 && (
                <span className="text-auto-muted line-through text-lg">{formatPrice(product.originalPrice)}</span>
              )}
              <span className="text-3xl font-black text-auto-black">{formatPrice(product.price)}</span>
              {discount > 0 && <span className="badge bg-auto-error text-white text-sm">-{toFaDigits(discount)}٪</span>}
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              {product.warranty !== 'بدون گارانتی' && (
                <span className="flex items-center gap-1.5 text-sm text-auto-success"><Shield size={16} /> {product.warranty}</span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-auto-muted"><Truck size={16} /> ارسال به سراسر ایران</span>
              <span className="flex items-center gap-1.5 text-sm text-auto-muted"><Package size={16} /> {toFaDigits(product.offers?.length || 1)} فروشنده</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center bg-auto-gray rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-auto-yellow">
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold">{toFaDigits(quantity)}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-auto-yellow">
                  <Plus size={18} />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-yellow flex-1">
                <ShoppingCart size={20} /> افزودن به سبد خرید
              </button>
            </div>

            <div className="bg-auto-gray rounded-2xl p-4">
              <h3 className="font-bold text-sm text-auto-dark mb-2">خودروهای سازگار:</h3>
              <div className="flex flex-wrap gap-2">
                {product.compatibleVehicles.map(v => (
                  <span key={v} className="badge bg-white text-auto-dark border border-gray-200">{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seller Offer Comparison */}
        <div className="mt-10">
          <h2 className="text-xl font-extrabold text-auto-black mb-4">مقایسه فروشندگان</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-auto-muted">مرتب‌سازی:</span>
            <select
              value={sortOffers}
              onChange={e => setSortOffers(e.target.value)}
              className="bg-auto-gray rounded-xl px-3 py-1.5 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-auto-yellow"
            >
              <option value="price-low">ارزان‌ترین</option>
              <option value="rating">بالاترین امتیاز</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-auto-gray text-sm text-auto-muted">
                  <th className="text-right py-3 px-4 font-bold">فروشنده</th>
                  <th className="text-right py-3 px-4 font-bold">قیمت</th>
                  <th className="text-right py-3 px-4 font-bold">موجودی</th>
                  <th className="text-right py-3 px-4 font-bold">ضمانت</th>
                  <th className="text-right py-3 px-4 font-bold">آماده‌سازی</th>
                  <th className="text-right py-3 px-4 font-bold">امتیاز</th>
                  <th className="text-right py-3 px-4 font-bold">خرید</th>
                </tr>
              </thead>
              <tbody>
                {sortedOffers.map(offer => {
                  const sellerSlug = sellers.find(s => s.id === offer.sellerId)?.slug || ''
                  return (
                    <tr
                      key={offer.id}
                      className={`border-b border-gray-100 hover:bg-auto-gray/50 transition-colors ${selectedOffer?.id === offer.id ? 'bg-auto-yellow/5' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <Link to={`/seller/${sellerSlug}`} className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-auto-black flex items-center justify-center text-auto-yellow font-bold text-xs">
                            {offer.sellerName.slice(0, 2)}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-sm text-auto-dark">{offer.sellerName}</span>
                            <BadgeCheck size={14} className="text-auto-success" />
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 px-4 font-black text-auto-dark">{formatPrice(offer.price)}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-bold ${offer.stock > 0 ? 'text-auto-success' : 'text-auto-error'}`}>
                          {offer.stock > 0 ? `${toFaDigits(offer.stock)} عدد` : 'ناموجود'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-auto-dark">{offer.warranty}</td>
                      <td className="py-3 px-4 text-sm text-auto-muted">{offer.prepTime}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-auto-yellow text-auto-yellow" />
                          <span className="text-sm font-bold">{toFaDigits(offer.rating)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => { setSelectedOffer(offer); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            selectedOffer?.id === offer.id
                              ? 'bg-auto-yellow text-auto-black'
                              : 'bg-auto-gray text-auto-dark hover:bg-auto-yellow/20'
                          }`}
                        >
                          {selectedOffer?.id === offer.id ? '✓ انتخاب شده' : 'انتخاب'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex gap-2 mb-4 border-b border-auto-gray">
            {[
              { key: 'specs', label: 'مشخصات فنی' },
              { key: 'desc', label: 'توضیحات' },
              { key: 'reviews', label: `نظرات (${toFaDigits(product.reviewCount)})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === tab.key ? 'border-auto-yellow text-auto-black' : 'border-transparent text-auto-muted hover:text-auto-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="bg-auto-gray rounded-2xl p-6">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-auto-muted">{key}</span>
                    <span className="text-sm font-bold text-auto-dark">{val}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'desc' && <p className="text-auto-dark text-sm leading-relaxed">{product.description}</p>}
            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <p className="text-auto-muted text-sm">نظرات مشتریان به‌زودی نمایش داده می‌شود</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-extrabold text-auto-black mb-4">محصولات مرتبط</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.slug}`} className="card overflow-hidden group">
                  <div className="aspect-square bg-auto-gray flex items-center justify-center">
                    <ProductPlaceholder type={p.image} />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-xs text-auto-dark group-hover:text-auto-yellow transition-colors line-clamp-2 mb-2">{p.name}</h3>
                    <span className="font-black text-auto-dark text-sm">{formatPrice(p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductPlaceholder({ type, large }) {
  const colors = {
    'brake-pad': '#888',
    'headlight': '#FFD400',
    'bumper': '#888',
    'clutch': '#888',
    'spark-plug': '#888',
    'oil': '#168A52',
    'air-filter': '#888',
    'wheel': '#222',
    'battery': '#888',
    'timing-belt': '#888',
    'grille': '#888',
    'sensor': '#888',
  }
  const size = large ? 120 : 48
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ color: colors[type] || '#888', opacity: 0.3 }}>
      <rect x="20" y="30" width="80" height="60" rx="12" fill="currentColor" />
      <rect x="30" y="40" width="60" height="8" rx="3" fill="#FFD400" opacity="0.4" />
      <rect x="30" y="52" width="60" height="8" rx="3" fill="#FFD400" opacity="0.4" />
      <rect x="30" y="64" width="60" height="8" rx="3" fill="#FFD400" opacity="0.4" />
    </svg>
  )
}
