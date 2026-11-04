import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown, Phone, Mail, Store, Headset, Globe } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { navItems, categories } from '../../data/mockData.js'
import { toFaDigits } from '../../lib/format.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartCount } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-auto-black2 text-white/60 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Phone size={14} /> ۰۲۱-۱۲۳۴۵۶۷۸</span>
            <span className="flex items-center gap-1.5"><Mail size={14} /> info@autopart.ir</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/sellers" className="flex items-center gap-1.5 hover:text-auto-yellow transition-colors">
              <Store size={14} /> ثبت‌نام فروشندگی
            </Link>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5"><Headset size={14} /> پشتیبانی ۲۴ ساعته</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5"><Globe size={14} /> فارسی / تومان</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-auto-black transition-shadow ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-auto-yellow rounded-xl flex items-center justify-center font-black text-auto-black text-lg md:text-xl">
                A
              </div>
              <span className="text-white font-extrabold text-lg md:text-xl hidden sm:block">اتو‌پارت</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="جستجوی قطعات، OEM، مدل خودرو..."
                  className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl pr-12 pl-4 py-2.5 border border-white/10 focus:outline-none focus:border-auto-yellow transition-colors text-sm"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-auto-yellow">
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <Link to="/cart" className="relative p-2 text-white hover:text-auto-yellow transition-colors">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-auto-yellow text-auto-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {toFaDigits(cartCount)}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 text-white hover:text-auto-yellow transition-colors hidden sm:block">
                <Heart size={24} />
              </Link>
              <Link to="/cart" className="p-2 text-white hover:text-auto-yellow transition-colors hidden sm:block">
                <User size={24} />
              </Link>
              <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-white md:hidden">
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1 h-12 border-t border-white/10">
            {navItems.map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => item.label === 'قطعات یدکی' ? setMegaMenuOpen(i) : null}
                onMouseLeave={() => setMegaMenuOpen(null)}
              >
                <Link
                  to={item.path}
                  className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-auto-yellow transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                  {item.label === 'قطعات یدکی' && <ChevronDown size={14} />}
                </Link>
                {/* Mega Menu */}
                {item.label === 'قطعات یدکی' && megaMenuOpen === i && (
                  <div className="absolute top-full right-0 w-[640px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-2 z-50">
                    {categories.slice(0, 12).map(cat => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        className="flex items-center gap-2 p-3 rounded-xl hover:bg-auto-gray transition-colors text-sm text-auto-dark font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-auto-yellow"></span>
                        {cat.name}
                      </Link>
                    ))}
                    <Link to="/shop" className="col-span-3 mt-2 p-3 rounded-xl bg-auto-yellow/10 text-auto-black font-bold text-sm text-center hover:bg-auto-yellow/20 transition-colors">
                      مشاهده همه دسته‌بندی‌ها ←
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] bg-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 bg-auto-black">
              <span className="text-white font-bold">منو</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSearch} className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="جستجو..."
                  className="w-full bg-auto-gray rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-auto-yellow"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-auto-muted" />
              </div>
            </form>
            <nav className="px-2 pb-4">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-auto-dark hover:bg-auto-gray rounded-xl font-medium text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
