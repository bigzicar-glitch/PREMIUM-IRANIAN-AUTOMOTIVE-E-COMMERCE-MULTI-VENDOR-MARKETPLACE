import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Check, Eye } from 'lucide-react'
import { formatPrice, discountPercent, toFaDigits } from '../../lib/format.js'
import { useCart } from '../../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const discount = discountPercent(product.originalPrice, product.price)
  const bestOffer = product.offers?.[0]

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, bestOffer)
  }

  return (
    <Link to={`/product/${product.slug}`} className="card overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-auto-gray to-gray-100 flex items-center justify-center overflow-hidden">
        <ProductImage type={product.image} />
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="badge bg-auto-error text-white">-{toFaDigits(discount)}٪</span>
          )}
          {product.isBestSeller && (
            <span className="badge bg-auto-yellow text-auto-black">پرفروش</span>
          )}
          {product.isNew && (
            <span className="badge bg-auto-black text-white">جدید</span>
          )}
        </div>
        {/* Quick view */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2.5 shadow-lg">
            <Eye size={18} className="text-auto-black" />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        {/* Brand */}
        <span className="text-xs text-auto-muted mb-1">{product.brand}</span>
        {/* Name */}
        <h3 className="text-auto-dark font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-auto-yellow transition-colors">
          {product.name}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-auto-yellow text-auto-yellow" />
          <span className="text-xs font-bold text-auto-dark">{toFaDigits(product.rating)}</span>
          <span className="text-xs text-auto-muted">({toFaDigits(product.reviewCount)} نظر)</span>
        </div>
        {/* Offers count */}
        {product.offers?.length > 1 && (
          <span className="text-xs text-auto-success mb-2 flex items-center gap-1">
            <Check size={12} /> {toFaDigits(product.offers.length)} فروشنده
          </span>
        )}
        {/* Price */}
        <div className="mt-auto">
          {product.originalPrice && discount > 0 && (
            <span className="text-xs text-auto-muted line-through">{formatPrice(product.originalPrice)}</span>
          )}
          <div className="font-black text-auto-black text-base">{formatPrice(product.price)}</div>
        </div>
        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="btn-yellow w-full mt-3 py-2 text-xs"
        >
          <ShoppingCart size={16} />
          افزودن به سبد
        </button>
      </div>
    </Link>
  )
}

// SVG illustration for product images (no external assets needed)
function ProductImage({ type }) {
  const illustrations = {
    'brake-pad': <BrakePadIcon />,
    'headlight': <HeadlightIcon />,
    'bumper': <BumperIcon />,
    'clutch': <ClutchIcon />,
    'spark-plug': <SparkPlugIcon />,
    'oil': <OilIcon />,
    'air-filter': <AirFilterIcon />,
    'wheel': <WheelIcon />,
    'battery': <BatteryIcon />,
    'timing-belt': <TimingBeltIcon />,
    'grille': <GrilleIcon />,
    'sensor': <SensorIcon />,
  }
  return illustrations[type] || <BrakePadIcon />
}

function BrakePadIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <rect x="20" y="35" width="80" height="50" rx="8" fill="currentColor" opacity="0.8"/>
      <rect x="25" y="40" width="70" height="10" rx="3" fill="#FFD400" opacity="0.6"/>
      <rect x="25" y="70" width="70" height="10" rx="3" fill="#FFD400" opacity="0.6"/>
    </svg>
  )
}
function HeadlightIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <ellipse cx="60" cy="60" rx="45" ry="35" fill="currentColor" opacity="0.7"/>
      <ellipse cx="60" cy="60" rx="30" ry="22" fill="#FFD400" opacity="0.4"/>
      <circle cx="60" cy="60" r="15" fill="#FFD400" opacity="0.6"/>
    </svg>
  )
}
function BumperIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <path d="M 15 50 Q 60 30 105 50 L 105 75 Q 60 85 15 75 Z" fill="currentColor" opacity="0.7"/>
    </svg>
  )
}
function ClutchIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <circle cx="45" cy="60" r="25" fill="currentColor" opacity="0.7"/>
      <circle cx="45" cy="60" r="10" fill="#FFD400" opacity="0.5"/>
      <circle cx="85" cy="60" r="20" fill="currentColor" opacity="0.5"/>
      <circle cx="85" cy="60" r="8" fill="#FFD400" opacity="0.4"/>
    </svg>
  )
}
function SparkPlugIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <rect x="50" y="15" width="20" height="25" rx="3" fill="currentColor" opacity="0.7"/>
      <rect x="48" y="40" width="24" height="50" rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="45" y="90" width="30" height="8" rx="2" fill="#FFD400" opacity="0.5"/>
      <rect x="42" y="98" width="36" height="12" rx="2" fill="currentColor" opacity="0.7"/>
    </svg>
  )
}
function OilIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <rect x="35" y="20" width="50" height="85" rx="8" fill="currentColor" opacity="0.7"/>
      <rect x="40" y="30" width="40" height="55" rx="4" fill="#FFD400" opacity="0.3"/>
      <rect x="48" y="12" width="24" height="12" rx="3" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}
function AirFilterIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <rect x="25" y="40" width="70" height="45" rx="6" fill="currentColor" opacity="0.6"/>
      <rect x="30" y="45" width="60" height="6" fill="#FFD400" opacity="0.3"/>
      <rect x="30" y="53" width="60" height="6" fill="#FFD400" opacity="0.3"/>
      <rect x="30" y="61" width="60" height="6" fill="#FFD400" opacity="0.3"/>
      <rect x="30" y="69" width="60" height="6" fill="#FFD400" opacity="0.3"/>
    </svg>
  )
}
function WheelIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <circle cx="60" cy="60" r="45" fill="currentColor" opacity="0.7"/>
      <circle cx="60" cy="60" r="35" fill="#FFD400" opacity="0.3"/>
      <circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.9"/>
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <rect key={deg} x="58" y="22" width="4" height="30" fill="currentColor" opacity="0.5" transform={`rotate(${deg} 60 60)`}/>
      ))}
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <rect x="25" y="35" width="70" height="60" rx="6" fill="currentColor" opacity="0.7"/>
      <rect x="35" y="25" width="15" height="12" rx="2" fill="currentColor" opacity="0.6"/>
      <rect x="70" y="25" width="15" height="12" rx="2" fill="currentColor" opacity="0.6"/>
      <rect x="35" y="55" width="50" height="20" rx="3" fill="#FFD400" opacity="0.4"/>
    </svg>
  )
}
function TimingBeltIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <circle cx="40" cy="60" r="22" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.7"/>
      <circle cx="85" cy="60" r="18" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.7"/>
      <circle cx="40" cy="60" r="8" fill="currentColor" opacity="0.5"/>
      <circle cx="85" cy="60" r="6" fill="currentColor" opacity="0.5"/>
    </svg>
  )
}
function GrilleIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <rect x="30" y="30" width="60" height="60" rx="8" fill="currentColor" opacity="0.5"/>
      {[40, 50, 60, 70, 80].map(y => (
        <rect key={y} x="35" y={y} width="50" height="4" rx="1" fill="#FFD400" opacity="0.4"/>
      ))}
    </svg>
  )
}
function SensorIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 text-auto-black/30">
      <rect x="45" y="20" width="30" height="20" rx="4" fill="currentColor" opacity="0.7"/>
      <rect x="50" y="40" width="20" height="50" rx="3" fill="currentColor" opacity="0.5"/>
      <rect x="48" y="90" width="24" height="10" rx="2" fill="#FFD400" opacity="0.5"/>
    </svg>
  )
}
