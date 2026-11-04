import { Truck, Headset, Store, Tag } from 'lucide-react'
import { toFaDigits } from '../../lib/format.js'

export default function AnnouncementBar() {
  const announcements = [
    { icon: Truck, text: 'ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان' },
    { icon: Tag, text: 'جشنواره خرید پاییز — تا ۴۵٪ تخفیف' },
    { icon: Store, text: 'ثبت‌نام فروشندگان جدید — نشان رسمی تأیید شده دریافت کنید' },
    { icon: Headset, text: 'پشتیبانی تخصصی ۲۴ ساعته' },
  ]

  return (
    <div className="bg-auto-yellow text-auto-black text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-between h-9 overflow-hidden">
        <div className="hidden md:flex items-center gap-6 overflow-hidden">
          {announcements.slice(0, 2).map((a, i) => (
            <span key={i} className="flex items-center gap-1.5 font-medium whitespace-nowrap">
              <a.icon size={14} /> {a.text}
            </span>
          ))}
        </div>
        <div className="md:hidden">
          {(() => { const A = announcements[1]; return A ? (
            <span className="flex items-center gap-1.5 font-medium">
              <A.icon size={14} /> {A.text}
            </span>
          ) : null; })()}
        </div>
        <div className="hidden md:flex items-center gap-6">
          {announcements.slice(2).map((a, i) => (
            <span key={i} className="flex items-center gap-1.5 font-medium whitespace-nowrap">
              <a.icon size={14} /> {a.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
