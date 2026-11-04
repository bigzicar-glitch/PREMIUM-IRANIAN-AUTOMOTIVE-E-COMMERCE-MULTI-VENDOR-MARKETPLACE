import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ChevronDown, ArrowLeft } from 'lucide-react'
import { vehicleManufacturers, vehicleModels, vehicleYears } from '../../data/mockData.js'
import { toFaDigits } from '../../lib/format.js'

export default function Hero() {
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const navigate = useNavigate()

  const models = manufacturer ? (vehicleModels[manufacturer] || []) : []

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (manufacturer) params.set('vehicle', vehicleManufacturers.find(m => m.id == manufacturer)?.name || '')
    if (model) params.set('model', model)
    if (year) params.set('year', year)
    navigate(`/shop?${params.toString()}`)
  }

  return (
    <section className="relative bg-auto-black overflow-hidden">
      {/* Background car image placeholder */}
      <div className="absolute inset-0 flex items-center justify-end opacity-20">
        <div className="w-[60%] h-full bg-gradient-to-l from-auto-yellow/10 to-transparent"></div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[300px] opacity-30 hidden lg:block">
        <div className="w-full h-full rounded-full bg-gradient-to-l from-auto-yellow/20 via-transparent to-transparent blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
            تمام قطعات مورد نیاز خودروی شما،
            <br />
            <span className="text-auto-yellow">در یک بازار تخصصی</span>
          </h1>
          <p className="text-white/60 text-sm md:text-lg mb-8 max-w-xl">
            خرید مستقیم از فروشگاه‌ها و تأمین‌کنندگان معتبر قطعات خودرو
          </p>
        </div>

        {/* Vehicle Search Widget */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-3xl">
          <p className="text-auto-dark font-bold text-sm mb-4">قطعات سازگار با خودروی خود را پیدا کنید</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Manufacturer */}
            <div className="relative">
              <select
                value={manufacturer}
                onChange={e => { setManufacturer(e.target.value); setModel('') }}
                className="w-full bg-auto-gray rounded-xl px-4 py-3 text-sm text-auto-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-auto-yellow"
              >
                <option value="">برند خودرو</option>
                {vehicleManufacturers.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-auto-muted pointer-events-none" />
            </div>

            {/* Model */}
            <div className="relative">
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                disabled={!manufacturer}
                className="w-full bg-auto-gray rounded-xl px-4 py-3 text-sm text-auto-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-auto-yellow disabled:opacity-50"
              >
                <option value="">مدل خودرو</option>
                {models.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-auto-muted pointer-events-none" />
            </div>

            {/* Year */}
            <div className="relative">
              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full bg-auto-gray rounded-xl px-4 py-3 text-sm text-auto-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-auto-yellow"
              >
                <option value="">سال تولید</option>
                {vehicleYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-auto-muted pointer-events-none" />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="btn-yellow col-span-1 md:col-span-1"
            >
              <Search size={18} />
              <span>مشاهده قطعات</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4 text-xs text-auto-muted">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-auto-success"></span>
              بیش از {toFaDigits('۸۰۰,۰۰۰')} قطعه در دسترس
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-auto-yellow"></span>
              {toFaDigits('۲۰۰')}+ فروشنده معتبر
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <button onClick={handleSearch} className="btn-yellow">
            مشاهده قطعات سازگار با خودروی من
            <ArrowLeft size={18} />
          </button>
          <Link to="/shop" className="btn-outline">
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </section>
  )
}
