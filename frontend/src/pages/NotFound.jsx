import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl md:text-8xl font-black text-auto-yellow mb-4">۴۰۴</h1>
      <h2 className="text-2xl font-extrabold text-auto-black mb-2">صفحه یافت نشد</h2>
      <p className="text-auto-muted text-sm mb-8">صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است</p>
      <Link to="/" className="btn-yellow">
        <Home size={18} /> بازگشت به صفحه اصلی
      </Link>
    </div>
  )
}
