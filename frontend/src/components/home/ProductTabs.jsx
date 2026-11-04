import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProductCard from './ProductCard.jsx'
import { products } from '../../data/mockData.js'

export default function ProductTabs() {
  const tabs = [
    { key: 'bestSeller', label: 'پرفروش‌ترین‌ها' },
    { key: 'new', label: 'جدیدترین محصولات' },
    { key: 'featured', label: 'محبوب‌ترین‌ها' },
    { key: 'discounted', label: 'تخفیف‌دارها' },
    { key: 'special', label: 'پیشنهاد ویژه' },
  ]
  const [activeTab, setActiveTab] = useState('bestSeller')

  const filtered = products.filter(p => {
    if (activeTab === 'bestSeller') return p.isBestSeller
    if (activeTab === 'new') return p.isNew
    if (activeTab === 'featured') return p.isFeatured
    if (activeTab === 'discounted') return p.isDiscounted
    if (activeTab === 'special') return p.isSpecial
    return true
  })

  const display = filtered.length > 0 ? filtered : products.slice(0, 5)

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="section-title mb-0">محصولات ویژه</h2>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-auto-yellow text-auto-black'
                  : 'bg-auto-gray text-auto-dark hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {display.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/shop" className="btn-outline">
          مشاهده همه محصولات <ArrowLeft size={18} />
        </Link>
      </div>
    </section>
  )
}
