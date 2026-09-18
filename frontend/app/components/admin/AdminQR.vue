<script setup lang="ts">
import { Loader2, RefreshCw, Download, Link2, Printer } from 'lucide-vue-next'
import QRCode from 'qrcode'

const showToast = inject<(msg: string) => void>('showToast', () => {})

const SITE_KEY = 'qflow_site_name'
const DEFAULT_SITE = 'Al-Noor Branch'

interface QrAsset {
  targetUrl: string
  pngDataUrl: string
}

const siteInput = ref(DEFAULT_SITE)
const siteName = ref(DEFAULT_SITE)
const loading = ref(true)
const regenerating = ref(false)
const qr = ref<QrAsset | null>(null)
const copied = ref(false)

const origin = import.meta.client ? window.location.origin : ''

const targetUrl = computed(() => {
  const name = encodeURIComponent(siteName.value.trim() || DEFAULT_SITE)
  return `${origin}/?site=${name}`
})

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

onMounted(() => {
  const saved = localStorage.getItem(SITE_KEY)
  if (saved) siteName.value = saved
  siteInput.value = siteName.value
  generate().finally(() => (loading.value = false))
})

watch(siteInput, (val) => {
  siteName.value = val.trim() || DEFAULT_SITE
  localStorage.setItem(SITE_KEY, siteName.value)
  if (generateTimer) clearTimeout(generateTimer)
  generateTimer = setTimeout(() => {
    regenerating.value = true
    generate().finally(() => (regenerating.value = false))
  }, 500)
})

const handleRegenerate = async () => {
  regenerating.value = true
  await generate()
  regenerating.value = false
  showToast('QR code regenerated')
}

const handleDownload = () => {
  if (!qr.value?.pngDataUrl) return
  const a = document.createElement('a')
  a.href = qr.value.pngDataUrl
  a.download = 'qflow-check-in-qr.png'
  document.body.appendChild(a)
  a.click()
  a.remove()
  showToast('Downloading QR code…')
}

const handleCopyLink = async () => {
  if (!qr.value?.targetUrl) return
  try {
    await navigator.clipboard.writeText(qr.value.targetUrl)
    copied.value = true
    showToast('Link copied!')
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    showToast('Unable to copy link')
  }
}

const handlePrint = () => {
  const src = qr.value?.pngDataUrl
  if (!src) return
  const win = window.open('', '_blank', 'width=520,height=640')
  if (!win) {
    showToast('Popup blocked — allow popups to print')
    return
  }
  win.document.write(
    `<!DOCTYPE html><html><head><title>Print QR Code</title><style>
      body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; font-family: system-ui, sans-serif; }
      img, svg { max-width: 70vw; width: 420px; height: auto; image-rendering: pixelated; }
      .url { margin-top: 16px; font-size: 13px; color: #333; word-break: break-all; text-align: center; max-width: 440px; }
    </style></head><body>`,
  )
  win.document.write(`<img src="${qr.value.pngDataUrl}" alt="Q-Flow Check-In QR Code" />`)
  if (qr.value?.targetUrl) {
    win.document.write(`<div class="url">${qr.value.targetUrl}</div>`)
  }
  win.document.write('</body></html>')
  win.document.close()
  win.focus()
  setTimeout(() => {
    win.print()
    win.close()
  }, 400)
  showToast('Opening print dialog…')
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-foreground">QR Code</h2>
        <p class="text-xs text-muted-foreground mt-0.5">Dynamic check-in QR code — updates when you change the site name</p>
      </div>
      <button
        :disabled="loading || regenerating"
        class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
        @click="handleRegenerate"
      >
        <Loader2 v-if="regenerating" class="w-3.5 h-3.5 animate-spin" />
        <RefreshCw v-else class="w-3.5 h-3.5" />
        Regenerate
      </button>
    </div>

    <div v-if="loading" class="bg-card border border-border rounded-xl p-6 space-y-5">
      <div class="flex flex-col items-center justify-center py-8">
        <div class="p-5 bg-white border border-border rounded-2xl shadow-sm inline-block mb-4">
          <Skeleton class="w-54 h-54" />
        </div>
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-3 w-24 mt-2" />
      </div>
      <Skeleton class="h-10 rounded-lg" />
      <Skeleton class="h-5 w-24" />
      <div class="flex flex-col gap-2">
        <Skeleton v-for="i in 3" :key="i" class="h-9 rounded-lg" />
      </div>
    </div>

    <div v-else-if="qr" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center">
        <div v-if="qr.pngDataUrl" class="p-5 bg-white border border-border rounded-2xl shadow-sm inline-block">
          <img :src="qr.pngDataUrl" alt="Q-Flow check-in QR code" width="216" height="216" class="block w-54 h-54" style="image-rendering: pixelated" />
        </div>
        <QrCodeSvg v-else :seed="qr.targetUrl || 'qflow'" :size="216" />
        <p class="text-sm font-bold text-foreground mt-5">{{ siteName }}</p>
        <p class="text-xs text-muted-foreground mt-0.5">Scan to join the queue</p>
      </div>

      <div class="bg-card border border-border rounded-xl p-6">
        <div class="space-y-1.5 mb-6">
          <label class="block text-sm font-semibold text-foreground">Site Name</label>
          <input
            v-model="siteInput"
            class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            placeholder="e.g. Al-Noor Branch"
          />
          <p class="text-xs text-muted-foreground pt-1">Appears in the check-in URL — the QR regenerates automatically.</p>
        </div>

        <h3 class="text-sm font-bold text-foreground mb-2">Check-In URL</h3>
        <div class="flex items-center gap-2 bg-input-bg border border-border rounded-lg px-3 py-2.5 mb-4">
          <Link2 class="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <p class="text-sm text-foreground truncate">{{ qr.targetUrl }}</p>
        </div>
        <p class="text-xs text-muted-foreground leading-relaxed mb-6">
          Customers scan this QR code at the branch to open the self-check-in page in their browser. The site name is embedded in
          the link, so printing or sharing keeps it point at your location.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            :disabled="!qr.pngDataUrl"
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
            @click="handleDownload"
          >
            <Download class="w-3.5 h-3.5" />
            Download
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary-light text-primary-dark-text hover:bg-primary-border px-3 py-2 text-xs"
            @click="handleCopyLink"
          >
            <Link2 v-if="!copied" class="w-3.5 h-3.5" />
            <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ copied ? 'Copied!' : 'Copy Link' }}
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-3 py-2 text-xs border border-border"
            @click="handlePrint"
          >
            <Printer class="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>