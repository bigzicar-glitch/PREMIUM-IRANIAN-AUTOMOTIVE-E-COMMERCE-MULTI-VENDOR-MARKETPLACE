import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// --- Products ---
export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params })
  return data
}

export const fetchProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/${slug}`)
  return data
}

// --- Categories ---
export const fetchCategories = async () => {
  const { data } = await api.get('/categories')
  return data
}

// --- Sellers ---
export const fetchSellers = async () => {
  const { data } = await api.get('/sellers')
  return data
}

export const fetchSellerBySlug = async (slug) => {
  const { data } = await api.get(`/sellers/${slug}`)
  return data
}

// --- Vehicles ---
export const fetchVehicleManufacturers = async () => {
  const { data } = await api.get('/vehicles/manufacturers')
  return data
}

export const fetchVehicleModels = async (manufacturerId) => {
  const { data } = await api.get(`/vehicles/models`, { params: { manufacturerId } })
  return data
}

// --- Blog ---
export const fetchBlogPosts = async () => {
  const { data } = await api.get('/blog')
  return data
}

// --- Banners ---
export const fetchBanners = async () => {
  const { data } = await api.get('/banners')
  return data
}

export default api
