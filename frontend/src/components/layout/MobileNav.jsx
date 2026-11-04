import { Link } from 'react-router-dom'
import { Home, Grid3x3, Search, ShoppingCart, User } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { toFaDigits } from '../../lib/format.js'

export default function MobileNav() {
  const { cartCount } = useCart()
  const items = [
    { icon: Home, label: 'خانه', path: '/' },
    { icon: Grid3x3, label: 'دسته‌بندی', path: '/shop' },
    { icon: Search, label: 'جستجو', path: '/shop' },
    { icon: ShoppingCart, label: 'سبد خرید', path: '/cart', badge: cartCount },
    { icon: User, label: 'حساب من', path: '/cart' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-auto-black border-t border-white/10 z-40 md:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="flex flex-col items-center justify-center gap-0.5 text-white/60 hover:text-auto-yellow transition-colors w-16"
          >
            <div className="relative">
              <item.icon size={22} />
              {item.badge > 0 && (
                <span className="absolute -top-2 -left-2 bg-auto-yellow text-auto-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {toFaDigits(item.badge)}
                </span>
              )}
            </div>
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
