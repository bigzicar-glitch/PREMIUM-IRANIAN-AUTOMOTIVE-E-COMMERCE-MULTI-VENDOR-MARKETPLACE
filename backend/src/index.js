import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// --- Products ---
app.get('/api/products', async (req, res) => {
  try {
    const { category, q, filter, limit, offset } = req.query
    const where = {}
    if (category) {
      where.category = { slug: category }
    }
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { englishName: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
        { oemNumber: { contains: q, mode: 'insensitive' } },
      ]
    }
    if (filter === 'special') where.isSpecial = true
    if (filter === 'discounted') where.isDiscounted = true

    const products = await prisma.masterProduct.findMany({
      where,
      include: {
        category: true,
        brand: true,
        offers: { include: { seller: true } },
      },
      take: limit ? parseInt(limit) : 50,
      skip: offset ? parseInt(offset) : 0,
      orderBy: { createdAt: 'desc' },
    })
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await prisma.masterProduct.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        brand: true,
        offers: { include: { seller: true } },
        images: true,
        compatibilities: true,
      },
    })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// --- Categories ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// --- Sellers ---
app.get('/api/sellers', async (req, res) => {
  try {
    const sellers = await prisma.seller.findMany({
      where: { status: 'APPROVED' },
      orderBy: { rating: 'desc' },
    })
    res.json(sellers)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sellers' })
  }
})

app.get('/api/sellers/:slug', async (req, res) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: { slug: req.params.slug },
      include: {
        offers: { include: { product: { include: { category: true, brand: true } } } },
        performance: true,
      },
    })
    if (!seller) return res.status(404).json({ error: 'Seller not found' })
    res.json(seller)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch seller' })
  }
})

// --- Vehicles ---
app.get('/api/vehicles/manufacturers', async (req, res) => {
  try {
    const manufacturers = await prisma.vehicleManufacturer.findMany({
      include: { models: true },
    })
    res.json(manufacturers)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch manufacturers' })
  }
})

app.get('/api/vehicles/models', async (req, res) => {
  try {
    const { manufacturerId } = req.query
    const models = await prisma.vehicleModel.findMany({
      where: manufacturerId ? { manufacturerId } : {},
      include: { manufacturer: true },
    })
    res.json(models)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch models' })
  }
})

// --- Blog ---
app.get('/api/blog', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
})

// --- Banners ---
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(banners)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banners' })
  }
})

// --- Newsletter ---
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email required' })
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    })
    res.json({ success: true, subscriber })
  } catch (err) {
    res.status(500).json({ error: 'Failed to subscribe' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`)
})
