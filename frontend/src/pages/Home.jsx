import AnnouncementBar from '../components/home/AnnouncementBar.jsx'
import Hero from '../components/home/Hero.jsx'
import CategoryGrid from '../components/home/CategoryGrid.jsx'
import PromoBanner from '../components/home/PromoBanner.jsx'
import ProductTabs from '../components/home/ProductTabs.jsx'
import SecondaryBanners from '../components/home/SecondaryBanners.jsx'
import BrandsSection from '../components/home/BrandsSection.jsx'
import SellersSection from '../components/home/SellersSection.jsx'
import WhyBuyFromUs from '../components/home/WhyBuyFromUs.jsx'
import BlogSection from '../components/home/BlogSection.jsx'

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Hero />
      <CategoryGrid />
      <PromoBanner />
      <ProductTabs />
      <SecondaryBanners />
      <BrandsSection />
      <SellersSection />
      <WhyBuyFromUs />
      <BlogSection />
    </>
  )
}
