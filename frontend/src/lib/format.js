// Persian digit conversion
const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toFaDigits(num) {
  return String(num).replace(/[0-9]/g, d => faDigits[d])
}

// Format price in Toman with Persian digits
export function formatPrice(price) {
  const formatted = Math.round(price).toLocaleString('en-US')
  return toFaDigits(formatted) + ' تومان'
}

// Format number with Persian digits
export function formatNumber(num) {
  return toFaDigits(Math.round(num).toLocaleString('en-US'))
}

// Persian date formatting (simplified Jalali)
export function formatJalaliDate(dateStr) {
  try {
    const date = new Date(dateStr)
    // Simple Gregorian to Jalali conversion
    const gy = date.getFullYear()
    const gm = date.getMonth() + 1
    const gd = date.getDate()
    const [jy, jm, jd] = gregorianToJalali(gy, gm, gd)
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
    return `${toFaDigits(jd)} ${months[jm - 1]} ${toFaDigits(jy)}`
  } catch {
    return ''
  }
}

function gregorianToJalali(gy, gm, gd) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  let jy = gy <= 1600 ? 0 : 979
  gy -= gy <= 1600 ? 621 : 1600
  let gy2 = gm > 2 ? gy + 1 : gy
  let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1]
  jy += 33 * Math.floor(days / 12053)
  days %= 12053
  jy += 4 * Math.floor(days / 1461)
  days %= 1461
  if (days > 365) {
    jy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30)
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30)
  return [jy, jm, jd]
}

// Calculate discount percentage
export function discountPercent(originalPrice, salePrice) {
  if (!originalPrice || originalPrice <= salePrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Truncate text
export function truncate(text, length = 60) {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}
