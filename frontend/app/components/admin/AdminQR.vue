<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import QRCode from 'qrcode'
import { trim, isValidUrl } from '~/utils/validate'

const showToast = inject<(msg: string) => void>('showToast', () => {})

const SITE_KEY = 'qflow_site_name'
const URL_KEY = 'qflow_checkin_url'
const DEFAULT_SITE = 'Al-Noor Branch'

interface QrAsset {
  targetUrl: string
  pngDataUrl: string
}

const siteInput = ref(DEFAULT_SITE)
const siteName = ref(DEFAULT_SITE)
const urlInput = ref('')
const urlError = ref('')
const urlTouched = ref(false)
const loading = ref(true)
const regenerating = ref(false)
const qr = ref<QrAsset | null>(null)

const validateUrl = () => {
  const v = trim(urlInput.value)
  if (!v) urlError.value = 'Check-in URL is required.'
  else if (!isValidUrl(v)) urlError.value = 'Enter a full link starting with http:// or https:// (no spaces).'
  else urlError.value = ''
  return !urlError.value
}

const validateUrlField = () => {
  urlTouched.value = true
  validateUrl()
}

const origin = import.meta.client ? window.location.origin : ''

const defaultUrl = () => {
  const name = encodeURIComponent(siteName.value.trim() || DEFAULT_SITE)
  return `${origin}/?site=${name}`
}

const targetUrl = computed(() => urlInput.value.trim() || defaultUrl())

let generateTimer: ReturnType<typeof setTimeout> | null = null

const generate = async () => {
  try {
    const pngDataUrl = await QRCode.toDataURL(targetUrl.value, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 1024,
    })
    qr.value = { targetUrl: targetUrl.value, pngDataUrl }
  } catch {
    showToast('Failed to generate QR code')
  }
}

const scheduleRegenerate = () => {
  if (generateTimer) clearTimeout(generateTimer)
  generateTimer = setTimeout(() => {
    regenerating.value = true
    generate().finally(() => (regenerating.value = false))
  }, 500)
}

onMounted(() => {
  const savedSite = localStorage.getItem(SITE_KEY)
  if (savedSite) siteName.value = savedSite
  siteInput.value = siteName.value
  urlInput.value = localStorage.getItem(URL_KEY) || defaultUrl()
  generate().finally(() => (loading.value = false))
})

watch(siteInput, (val) => {
  siteName.value = val.trim() || DEFAULT_SITE
  localStorage.setItem(SITE_KEY, siteName.value)
  scheduleRegenerate()
})

watch(urlInput, (val) => {
  localStorage.setItem(URL_KEY, val)
  scheduleRegenerate()
})

const handleDownload = () => {
  if (!validateUrl()) {
    urlTouched.value = true
    showToast(urlError.value)
    return
  }
  if (!qr.value?.pngDataUrl) return
  const a = document.createElement('a')
  a.href = qr.value.pngDataUrl
  a.download = 'qflow-check-in-qr.png'
  document.body.appendChild(a)
  a.click()
  a.remove()
  showToast('Downloading QR code…')
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-extrabold tracking-tight text-foreground">QR Code</h2>
        <p class="mt-0.5 text-xs text-muted-foreground">
          URL-driven {{ siteName }} QR — regenerates instantly when you edit it
        </p>
      </div>
    </div>

    <div v-if="loading" class="card space-y-5 p-6">
      <div class="flex flex-col items-center justify-center py-8">
        <div class="mb-4 inline-block rounded-2xl border border-border bg-white p-5 shadow-sm">
          <Skeleton class="w-54 h-54" />
        </div>
        <Skeleton class="h-4 w-32" />
        <Skeleton class="mt-2 h-3 w-24" />
      </div>
      <Skeleton class="h-10 rounded-lg" />
      <Skeleton class="h-5 w-24" />
      <div class="flex flex-col gap-2">
        <Skeleton v-for="i in 3" :key="i" class="h-9 rounded-lg" />
      </div>
    </div>

    <div v-else-if="qr" class="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div class="card flex flex-col items-center justify-center p-6">
        <div v-if="qr.pngDataUrl" class="inline-block rounded-2xl border border-border bg-white p-5 shadow-sm">
          <img :src="qr.pngDataUrl" alt="Q-Flow check-in QR code" width="216" height="216" class="block w-54 h-54" style="image-rendering: pixelated" />
        </div>
        <QrCodeSvg v-else :seed="qr.targetUrl || 'qflow'" :size="216" />
        <p class="mt-5 text-sm font-bold text-foreground">{{ siteName }}</p>
        <p class="mt-0.5 text-xs text-muted-foreground">Scan to join the queue</p>
      </div>

      <div class="card p-6">
        <div class="mb-6 space-y-1.5">
          <label class="label" for="site-name">Site Name</label>
          <input id="site-name" v-model="siteInput" class="input" placeholder="e.g. Al-Noor Branch" />
          <p class="pt-1 text-xs text-muted-foreground">Branch shown to customers above the QR.</p>
        </div>

        <div class="mb-6 space-y-1.5">
          <label class="label" for="checkin-url">Check-In URL</label>
          <input
            id="checkin-url"
            v-model="urlInput"
            type="url"
            inputmode="url"
            spellcheck="false"
            class="input font-mono"
            :class="urlTouched && urlError ? 'border-danger' : ''"
            placeholder="https://your-site.com/?site=Al-Noor"
            @blur="validateUrlField"
            @input="urlTouched && validateUrl()"
          />
          <p v-if="urlTouched && urlError" class="text-xs text-danger">{{ urlError }}</p>
          <p v-else class="pt-1 text-xs text-muted-foreground">Edit this URL anytime — the QR regenerates automatically when you save it.</p>
        </div>

        <div class="mb-6 flex items-center gap-2 rounded-md border border-border bg-input-bg px-3 py-2">
          <p class="flex-1 text-xs font-semibold text-muted-foreground">QR encodes</p>
          <p class="truncate font-mono text-xs text-foreground">{{ targetUrl }}</p>
        </div>
        <p class="mb-6 text-xs leading-relaxed text-muted-foreground">
          Customers scan this QR code at the branch to open the self-check-in page in their browser. You can update the
          link at any time and re-download the QR.
        </p>

        <div class="flex flex-col gap-2">
          <button :disabled="!qr.pngDataUrl" class="btn btn-md btn-primary w-full justify-center" @click="handleDownload">
            <Download class="h-4 w-4" />
            Download QR
          </button>
        </div>
      </div>
    </div>
  </div>
</template>