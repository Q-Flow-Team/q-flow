export const MAX_EMAIL_LEN = 254
export const MAX_LOCAL_LEN = 64
export const MIN_PASSWORD_LEN = 8
export const MAX_PASSWORD_LEN = 128
export const MIN_NAME_LEN = 2
export const MAX_NAME_LEN = 80
export const MAX_EMPLOYEE_ID_LEN = 20
export const COUNTER_NUMBER_MAX = 999

export function trim(value?: string | null): string {
  return (value ?? '').replace(/^\s+|\s+$/g, '')
}

// ---------------- Email ----------------
// RFC 5322-ish with pragmatic hardening: no consecutive dots, sensible length caps.
const EMAIL_RE =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,63}$/i

export function isValidEmail(value?: string | null): boolean {
  const v = trim(value).toLowerCase()
  if (!v || v.length > MAX_EMAIL_LEN) return false
  if (v.includes('..')) return false
  if (v.startsWith('.') || v.endsWith('.')) return false
  const at = v.indexOf('@')
  if (at <= 0 || at !== v.lastIndexOf('@')) return false
  if (at > MAX_LOCAL_LEN) return false
  return EMAIL_RE.test(v)
}

// ---------------- Phone ----------------
// Accepts +233 … , 0… , or bare digits with spaces/dashes/parentheses.
// Normalized digit count must be a real international/local range (9–15).
const PHONE_FRAGMENT_RE = /^\+?\d[\d\s().-]*$/

export function digitsOf(value?: string | null): string {
  return (value ?? '').replace(/\D/g, '')
}

export function isValidPhone(value?: string | null): boolean {
  const v = trim(value)
  if (!v || v.length > 20) return false
  if (!PHONE_FRAGMENT_RE.test(v)) return false
  const digits = digitsOf(v)
  if (digits.length < 9 || digits.length > 15) return false
  if (v.startsWith('+') && digits.length < 10) return false
  return true
}

// ---------------- Name ----------------
// Letters (incl. accented), apostrophes, dots, hyphens, spaces. No control chars,
// no triple spaces, no repeated punctuation, and a sane word count.
const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ'`. -]+$/

export function isValidName(value?: string | null): boolean {
  const v = trim(value)
  if (v.length < MIN_NAME_LEN || v.length > MAX_NAME_LEN) return false
  if (!NAME_RE.test(v)) return false
  if (/\s{2,}/.test(v)) return false
  if (/([.'`-])\1/.test(v)) return false
  const words = v.split(/\s+/)
  if (words.length > 4) return false
  return words.every((w) => w.length > 0)
}

// ---------------- Employee ID ----------------
// Optional. 2–20 chars of letters, numbers, dash or underscore.
const EMPLOYEE_ID_RE = /^[A-Za-z0-9_-]+$/

export function isValidEmployeeId(value?: string | null): boolean {
  const v = trim(value)
  if (!v) return true // optional field
  return v.length >= 2 && v.length <= MAX_EMPLOYEE_ID_LEN && EMPLOYEE_ID_RE.test(v)
}

// ---------------- Password ----------------
// Strong policy: 8–128 chars, at least one letter and one number.
export function passwordIssues(value?: string | null): string[] {
  const v = value ?? ''
  const issues: string[] = []
  if (!v) {
    issues.push('Password is required.')
    return issues
  }
  if (v.length < MIN_PASSWORD_LEN) issues.push(`Use at least ${MIN_PASSWORD_LEN} characters.`)
  if (v.length > MAX_PASSWORD_LEN) issues.push(`Keep it under ${MAX_PASSWORD_LEN} characters.`)
  if (!/[A-Za-z]/.test(v)) issues.push('Include at least one letter.')
  if (!/\d/.test(v)) issues.push('Include at least one number.')
  if (/\s/.test(v)) issues.push('Remove spaces.')
  return issues
}

export function isValidPassword(value?: string | null): boolean {
  return passwordIssues(value ?? '').length === 0
}

// ---------------- Counter ----------------
// Name: 2–60 chars, letters/digits + lightweight punctuation.
const COUNTER_NAME_RE = /^[A-Za-z0-9À-ÖØ-öø-ÿ&()/.,'-]+(?:\s[A-Za-z0-9À-ÖØ-öø-ÿ&()/.,'-]+)*$/

export function isValidCounterName(value?: string | null): boolean {
  const v = trim(value)
  return v.length >= 2 && v.length <= 60 && COUNTER_NAME_RE.test(v)
}

export function isValidCounterNumber(value?: string | number | null): boolean {
  if (value === null || value === undefined || value === '') return false
  const n = Number(value)
  return Number.isInteger(n) && n >= 1 && n <= COUNTER_NUMBER_MAX
}

// ---------------- URL ----------------
// Absolute http(s) link with a real host, no spaces, no credentials.
export function isValidUrl(value?: string | null): boolean {
  const v = trim(value)
  if (!v || v.length > 2048) return false
  if (/\s/.test(v)) return false
  if (!/^https?:\/\//i.test(v)) return false
  try {
    const u = new URL(v)
    if (u.username || u.password) return false
    if (!u.hostname) return false
    if (u.hostname.includes(' ')) return false
    return true
  } catch {
    return false
  }
}

// ---------------- Field messages ----------------
// Human-friendly, precise messages used across forms.
export function emailMessage(value?: string | null): string {
  const v = trim(value)
  if (!v) return 'Email is required.'
  if (v.length > MAX_EMAIL_LEN) return 'Email is too long (max 254 characters).'
  if (!v.includes('@')) return 'Email must include an "@" symbol.'
  if (v.includes('..') || v.startsWith('.') || v.endsWith('.')) return 'Email contains invalid dots.'
  return 'Enter a valid email address (e.g. name@company.com).'
}

export function phoneMessage(value?: string | null): string {
  const v = trim(value)
  if (!v) return 'Phone number is required.'
  if (!/^\+?\d[\d\s().-]*$/.test(v)) return 'Phone can only contain digits and spaces, dashes, dots or parentheses.'
  const digits = digitsOf(v)
  if (digits.length < 9) return 'Phone number looks too short.'
  if (digits.length > 15) return 'Phone number looks too long.'
  return `Enter a valid phone number (got ${digits.length} digits).`
}

export function nameMessage(value?: string | null): string {
  const v = trim(value)
  if (!v) return 'Full name is required.'
  if (v.length < MIN_NAME_LEN) return `Name must be at least ${MIN_NAME_LEN} characters.`
  if (v.length > MAX_NAME_LEN) return `Name must be under ${MAX_NAME_LEN} characters.`
  if (/\s{2,}/.test(v)) return 'Remove extra spaces between names.'
  return 'Name can only contain letters, spaces, dots, hyphens and apostrophes.'
}