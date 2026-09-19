import { handleMockRequest } from '~/utils/mockApi'

export interface ApiError {
  status: number
  message: string
}

const TOKEN_KEY = 'qflow_token'
const USER_KEY = 'qflow_user'
const FALLBACK_BASE = '/api/v1'

export function useMockApi(): boolean {
  try {
    const config = useRuntimeConfig()
    const raw = config.public.useMock
    return raw !== false && String(raw).toLowerCase() !== 'false'
  } catch {
    return true
  }
}

export function resolveApiBase(): string {
  try {
    const config = useRuntimeConfig()
    const base = (config.public.apiBase as string) || FALLBACK_BASE
    if (import.meta.server) return base
    return '/api/v1'
  } catch {
    return import.meta.server ? FALLBACK_BASE : '/api/v1'
  }
}

export function getToken(): string | null {
  if (import.meta.server) return null
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string) {
  if (import.meta.server) return
  localStorage.setItem(TOKEN_KEY, token)
}

export function getStoredUser<T = any>(): T | null {
  if (import.meta.server) return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: unknown) {
  if (import.meta.server) return
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearStoredAuth() {
  if (import.meta.server) return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

function normalizeError(err: any): ApiError {
  const status: number = err?.response?.status ?? err?.statusCode ?? err?.status ?? 0
  const data = err?.data ?? err?.response?._data
  const message: string =
    (typeof data === 'string' && data) ||
    data?.error ||
    data?.message ||
    err?.statusMessage ||
    err?.message ||
    'Something went wrong. Please try again.'
  return { status, message }
}

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export async function apiRequest<T = any>(
  path: string,
  options: { method?: HttpMethod; body?: any; query?: Record<string, any> } = {},
): Promise<T> {
  if (useMockApi()) {
    try {
      return await handleMockRequest<T>(path, options.method || 'GET', options.body, options.query, getToken())
    } catch (err) {
      throw normalizeError(err)
    }
  }

  const base = resolveApiBase().replace(/\/$/, '')
  const token = getToken()
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  let url = `${base}${path.startsWith('/') ? path : `/${path}`}`
  if (options.query) {
    const params = new URLSearchParams()
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') params.append(key, String(value))
    })
    const qs = params.toString()
    if (qs) url += `?${qs}`
  }

  try {
    return await $fetch<T>(url, {
      method: options.method || 'GET',
      headers,
      body: options.body,
    })
  } catch (err) {
    throw normalizeError(err)
  }
}

export const apiGet = <T = any>(path: string, query?: Record<string, any>) =>
  apiRequest<T>(path, { method: 'GET', query })

export const apiPost = <T = any>(path: string, body?: any) =>
  apiRequest<T>(path, { method: 'POST', body })

export const apiPatch = <T = any>(path: string, body?: any) =>
  apiRequest<T>(path, { method: 'PATCH', body })
