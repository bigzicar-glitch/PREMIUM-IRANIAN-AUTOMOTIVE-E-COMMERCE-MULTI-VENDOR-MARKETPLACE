import { Link } from 'react-router-dom'
import { ShieldCheck, Droplet, Key, ArrowLeft } from 'lucide-react'
import { secondaryBanners } from '../../data/mockData.js'

const iconMap = {
  'shield-check': ShieldCheck,
  'droplet': Droplet,
  'key': Key,
}

export default function SecondaryBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secondaryBanners.map(banner => {
          const Icon = iconMap[banner.icon] || ShieldCheck
          return (
            <div
              key={banner.id}
              className="rounded-2xl p-6 flex flex-col items-start gap-3"
              style={{ backgroundColor: banner.color }}
            >
              <div className="w-12 h-12 rounded-xl bg-auto-yellow/20 flex items-center justify-center">
                <Icon size={24} className="text-auto-yellow" />
              </div>
              <h3 className="text-white font-bold text-lg">{banner.title}</h3>
              <p className="text-white/60 text-sm">{banner.desc}</p>
              <Link to="/shop" className="btn-yellow self-start py-2 text-xs">
                مشاهده <ArrowLeft size={16} />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
