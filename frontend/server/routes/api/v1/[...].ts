const FALLBACK_BACKEND = 'https://q-flow-backend.vercel.app/api/v1'

function resolveBackend(): string {
  try {
    const config = useRuntimeConfig()
    return (config.public.apiBase as string) || FALLBACK_BACKEND
  } catch {
    return FALLBACK_BACKEND
  }
}

export default defineEventHandler(async (event) => {
  const path = (event.context.params?._ as string) || ''
  const url = `${resolveBackend().replace(/\/$/, '')}/${path}`

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  const contentType = getHeader(event, 'content-type')
  if (contentType) headers['Content-Type'] = contentType
  const authorization = getHeader(event, 'authorization')
  if (authorization) headers.Authorization = authorization

  const method = getMethod(event).toUpperCase()
  let body: any
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
    const raw = await readRawBody(event, false)
    if (raw && raw.length > 0) body = raw
  }

  const res = await $fetch.raw(url, {
    method,
    headers,
    body,
    retry: 0,
  })

  const status = res.status
  setResponseStatus(event, status)
  const resBody = res._data
  const type = typeof resBody
  if (resBody !== null && resBody !== undefined) {
    if (type === 'object') {
      setHeader(event, 'Content-Type', 'application/json')
      return resBody
    }
    return resBody
  }
  return null
})