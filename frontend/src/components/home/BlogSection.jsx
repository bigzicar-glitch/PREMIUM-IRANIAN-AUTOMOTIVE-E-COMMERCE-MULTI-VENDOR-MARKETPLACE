import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import { blogPosts } from '../../data/mockData.js'
import { formatJalaliDate } from '../../lib/format.js'

const blogImages = {
  blog1: '#FFD400',
  blog2: '#168A52',
  blog3: '#080808',
  blog4: '#171717',
  blog5: '#FFD400',
  blog6: '#080808',
}

export default function BlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title mb-1">مجله خودرو</h2>
          <p className="text-auto-muted text-sm">راهنماها و آموزش‌های تخصصی خودرو</p>
        </div>
        <Link to="/blog" className="text-auto-yellow font-bold text-sm hover:underline flex items-center gap-1">
          مشاهده همه <ArrowLeft size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {blogPosts.slice(0, 3).map(post => (
          <Link
            key={post.id}
            to={`/blog`}
            className="card overflow-hidden group"
          >
            {/* Image */}
            <div
              className="aspect-video flex items-center justify-center"
              style={{ backgroundColor: blogImages[post.image] || '#171717' }}
            >
              <span className="text-white/40 font-black text-2xl group-hover:scale-110 transition-transform">
                {post.category}
              </span>
            </div>
            {/* Content */}
            <div className="p-4 md:p-5">
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
    </section>
  )
}
