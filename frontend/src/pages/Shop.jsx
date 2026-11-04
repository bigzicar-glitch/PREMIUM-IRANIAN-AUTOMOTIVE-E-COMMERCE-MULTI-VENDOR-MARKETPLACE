import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown, Home as HomeIcon } from 'lucide-react'
import ProductCard from '../components/home/ProductCard.jsx'
import { products, categories, brands } from '../data/mockData.js'
import { toFaDigits } from '../lib/format.js'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categorySlug = searchParams.get('category')
  const query = searchParams.get('q')
  const filter = searchParams.get('filter')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState([])

  const filtered = useMemo(() => {
    let result = [...products]
    if (categorySlug) {
      result = result.filter(p => categories.find(c => c.slug === categorySlug)?.id === p.categoryId)
    }
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(p =>
        p.name.includes(query) ||
        p.englishName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.oemNumber.toLowerCase().includes(q) ||
        p.brand.includes(query)
      )
    }
    if (filter === 'special') result = result.filter(p => p.isSpecial)
    if (filter === 'discounted') result = result.filter(p => p.isDiscounted)
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'popular') result.sort((a, b) => b.reviewCount - a.reviewCount)
    return result
  }, [categorySlug, query, filter, sortBy, selectedBrands])

  const activeCategory = categorySlug ? categories.find(c => c.slug === categorySlug) : null

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-auto-muted">
        <Link to="/" className="flex items-center gap-1 hover:text-auto-yellow"><HomeIcon size={14} /> خانه</Link>
        <span>/</span>
        <span className="text-auto-dark font-medium">{activeCategory ? activeCategory.name : 'همه محصولات'}</span>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-auto-black mb-2">
          {activeCategory ? activeCategory.name : query ? `نتایج جستجو: ${query}` : 'همه محصولات'}
        </h1>
        <p className="text-auto-muted text-sm mb-6">{toFaDigits(filtered.length)} محصول یافت شد</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'} md:block md:w-64 md:static md:p-0 md:bg-transparent`}>
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h3 className="font-bold text-lg">فیلترها</h3>
            <button onClick={() => setShowFilters(false)}><X size={24} /></button>
          </div>
          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-bold text-sm text-auto-dark mb-3">دسته‌بندی‌ها</h4>
            <div className="space-y-2">
              <Link
                to="/shop"
                onClick={() => setShowFilters(false)}
                className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${!categorySlug ? 'bg-auto-yellow text-auto-black font-bold' : 'text-auto-muted hover:text-auto-dark'}`}
              >
                همه دسته‌ها
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  onClick={() => setShowFilters(false)}
                  className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${categorySlug === cat.slug ? 'bg-auto-yellow text-auto-black font-bold' : 'text-auto-muted hover:text-auto-dark'}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Brands */}
          <div className="mb-6">
            <h4 className="font-bold text-sm text-auto-dark mb-3">برندها</h4>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand.id} className="flex items-center gap-2 text-sm text-auto-muted hover:text-auto-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.name)}
                    onChange={e => {
                      if (e.target.checked) setSelectedBrands([...selectedBrands, brand.name])
                      else setSelectedBrands(selectedBrands.filter(b => b !== brand.name))
                    }}
                    className="w-4 h-4 accent-auto-yellow"
                  />
                  {brand.name}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-auto-gray rounded-xl text-sm font-bold"
            >
              <SlidersHorizontal size={16} /> فیلترها
            </button>
            <div className="flex items-center gap-2 mr-auto">
              <span className="text-sm text-auto-muted hidden md:block">مرتب‌سازی:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-auto-gray rounded-xl px-4 py-2 text-sm font-medium text-auto-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-auto-yellow pl-8"
                >
                  <option value="popular">محبوب‌ترین</option>
                  <option value="price-low">ارزان‌ترین</option>
                  <option value="price-high">گران‌ترین</option>
                  <option value="rating">بالاترین امتیاز</option>
                </select>
                <ChevronDown size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-auto-muted pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-auto-muted text-lg mb-2">محصولی یافت نشد</p>
              <p className="text-sm text-auto-muted">فیلترها را تغییر دهید یا کلمه دیگری جستجو کنید</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
