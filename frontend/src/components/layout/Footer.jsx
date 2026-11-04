import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const linkColumns = [
    {
      title: 'دسته‌بندی محصولات',
      links: [
        { label: 'قطعات موتور', path: '/shop?category=engine-parts' },
        { label: 'قطعات بدنه', path: '/shop?category=body-parts' },
        { label: 'سیستم ترمز', path: '/shop?category=brake-system' },
        { label: 'رینگ و لاستیک', path: '/shop?category=tires-wheels' },
        { label: 'روغن و فیلتر', path: '/shop?category=oil-filter' },
      ],
    },
    {
      title: 'خدمات مشتریان',
      links: [
        { label: 'تماس با ما', path: '/' },
        { label: 'پیگیری سفارش', path: '/' },
        { label: 'شرایط بازگشت کالا', path: '/' },
        { label: 'سؤالات متداول', path: '/' },
        { label: 'راهنمای خرید', path: '/' },
      ],
    },
    {
      title: 'اطلاعات',
      links: [
        { label: 'درباره ما', path: '/' },
        { label: 'قوانین و مقررات', path: '/' },
        { label: 'حریم خصوصی', path: '/' },
        { label: 'مجله خودرو', path: '/blog' },
        { label: 'فروشندگان', path: '/sellers' },
      ],
    },
    {
      title: 'حساب کاربری',
      links: [
        { label: 'ورود / ثبت‌نام', path: '/' },
        { label: 'سبد خرید', path: '/cart' },
        { label: 'علاقه‌مندی‌ها', path: '/' },
        { label: 'ثبت‌نام فروشندگی', path: '/sellers' },
        { label: 'پشتیبانی', path: '/' },
      ],
    },
  ]

  return (
    <footer className="bg-auto-black text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold mb-1">عضویت در خبرنامه</h3>
              <p className="text-white/50 text-sm">از جدیدترین تخفیف‌ها و محصولات باخبر شوید</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                className="bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-auto-yellow w-full md:w-80 text-sm"
              />
              <button type="submit" className="btn-yellow shrink-0">
                <Send size={18} />
                <span className="hidden sm:inline">عضویت</span>
              </button>
            </form>
          </div>
          {subscribed && (
            <p className="text-auto-yellow text-sm mt-3">✓ با موفقیت عضو شدید!</p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {linkColumns.map((col, i) => (
            <div key={i}>
              <h4 className="font-bold text-auto-yellow mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link to={link.path} className="text-white/60 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Phone size={14} /> ۰۲۱-۱۲۳۴۵۶۷۸</span>
              <span className="flex items-center gap-1.5"><Mail size={14} /> info@autopart.ir</span>
              <span className="flex items-center gap-1.5 hidden md:flex"><MapPin size={14} /> تهران، ایران</span>
            </div>
            <div className="flex items-center gap-2">
              <span>روش‌های پرداخت:</span>
              <div className="flex gap-1">
                {['شتاب', 'زرین‌پال', 'آیدی‌پی'].map(p => (
                  <span key={p} className="bg-white/10 rounded px-2 py-1 text-xs">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-white/40 text-xs">
          © ۱۴۰۳ اتو‌پارت | بازار تخصصی قطعات خودرو | تمامی حقوق محفوظ است
          <span className="block mt-1 text-white/30">این یک پروژه نمایشی است و داده‌ها واقعی نیستند.</span>
        </div>
      </div>
    </footer>
  )
}
