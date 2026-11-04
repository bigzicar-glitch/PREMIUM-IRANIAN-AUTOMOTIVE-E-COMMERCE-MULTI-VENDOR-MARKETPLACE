import { ShieldCheck, Users, Package, Truck, Headset, Lock } from 'lucide-react'
import { whyBuyFromUs } from '../../data/mockData.js'

const iconMap = {
  'shield-check': ShieldCheck,
  'users': Users,
  'package': Package,
  'truck': Truck,
  'headset': Headset,
  'lock': Lock,
}

export default function WhyBuyFromUs() {
  return (
    <section className="bg-auto-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-2xl md:text-3xl font-extrabold text-center mb-2">چرا از اتو‌پارت بخریم؟</h2>
        <p className="text-white/50 text-sm text-center mb-10">مزایای خرید از بازار تخصصی قطعات خودرو</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {whyBuyFromUs.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck
            return (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-auto-yellow/20 flex items-center justify-center mb-3 transition-colors">
                  <Icon size={28} className="text-auto-yellow" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
