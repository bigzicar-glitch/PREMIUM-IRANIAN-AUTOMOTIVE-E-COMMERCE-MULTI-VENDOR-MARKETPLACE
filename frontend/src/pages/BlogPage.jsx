import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Home as HomeIcon } from 'lucide-react'
import { blogPosts } from '../data/mockData.js'
import { formatJalaliDate } from '../lib/format.js'

const blogImages = {
  blog1: '#FFD400', blog2: '#168A52', blog3: '#080808', blog4: '#171717', blog5: '#FFD400', blog6: '#080808',
}

export default function BlogPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-auto-muted">
        <Link to="/" className="flex items-center gap-1 hover:text-auto-yellow"><HomeIcon size={14} /> خانه</Link>
        <span>/</span>
        <span className="text-auto-dark font-medium">مجله خودرو</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-auto-black mb-2">مجله خودرو</h1>
        <p className="text-auto-muted text-sm mb-6">راهنماها و آموزش‌های تخصصی خودرو</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Link key={post.id} to="/blog" className="card overflow-hidden group">
              <div
                className="aspect-video flex items-center justify-center"
                style={{ backgroundColor: blogImages[post.image] || '#171717' }}
              >
                <span className="text-white/40 font-black text-xl group-hover:scale-110 transition-transform">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <span className="badge bg-auto-yellow/20 text-auto-black mb-3">{post.category}</span>
                <span className="flex items-center gap-1.5 text-xs text-auto-muted mb-2">
                  <Calendar size={12} /> {formatJalaliDate(post.date)}
                </span>
                <h3 className="font-bold text-auto-dark text-base mb-2 group-hover:text-auto-yellow transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-auto-muted text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                <span className="text-auto-yellow font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  ادامه مطلب <ArrowLeft size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
