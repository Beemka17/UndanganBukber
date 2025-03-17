<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header v-animate class="pt-20 pb-20">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Informasi <br />Pembayaran
      </h1>
    </header>

    <div v-animate class="container mx-auto px-6 max-[400px]:pb-16">
      <p class="text-lg font-family-sans text-center text-black">
        Pembayaran dapat <span class="italic">{{ namaTamu }}</span> lakukan melalui transfer ke
        rekening berikut:
      </p>

      <div v-animate class="mt-10">
        <div class="text-lg font-family-sans text-center text-black">
          <p class="!font-bold text-black">Bank Central Asia / BCA</p>

          <!-- Styling seperti pada gambar npm -->
          <div class="flex justify-center py-2">
            <div
              class="bg-gray-200 rounded-lg border border-gray-200 flex items-center justify-between px-4 py-2 w-64"
            >
              <span class="text-gray-700">2311165641</span>
              <button
                @click="copyToClipboard('2311165641')"
                class="bg-white border border-gray-200 rounded px-3 py-1 ml-2 flex items-center text-gray-700 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Copy
              </button>
            </div>
          </div>

          <p>a.n. <span class="!font-bold text-black">Yuliana</span></p>
        </div>
      </div>

      <div v-animate class="pt-10">
        <p class="text-lg font-family-sans text-center text-red-700">
          Pembayaran paling telat dilakukan pada: 19 Maret 2025
        </p>
      </div>

      <div v-animate class="pt-10 text-black">
        <p class="text-lg font-family-sans text-center">
          Konfirmasi pembayaran melalui WhatsApp ke nomor:
        </p>

        <div v-animate class="mt-5 text-lg font-family-sans text-center">
          <!-- Styling seperti pada gambar npm -->
          <div class="flex justify-center py-2">
            <div
              class="bg-gray-200 rounded-lg border border-gray-200 flex items-center justify-between px-4 py-2 w-64"
            >
              <span class="text-gray-700">089521537284</span>
              <button
                @click="copyToClipboard('089521537284')"
                class="bg-white border border-gray-200 rounded px-3 py-1 ml-2 flex items-center text-gray-700 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Copy
              </button>
            </div>
          </div>

          <p>a.n. <span class="!font-bold">Yuliana</span></p>
          <p class="pb-2">Atau dapat klik tombol dibawah ini:</p>
          <ButtonPrimary text="Konfirmasi Pembayaran" @click="openWhatsApp" />
        </div>
      </div>

      <!-- Toast notification -->
      <div
        v-if="showToast"
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 animate-fade-in-up"
      >
        {{ toastMessage }}
      </div>

      <!-- Hidden textarea for fallback copy method -->
      <textarea
        ref="textAreaRef"
        readonly
        class="sr-only opacity-0 absolute -z-10"
        aria-hidden="true"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import bgImage from '../assets/images/WP-WHITE.jpg'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import { inject } from 'vue'
const namaTamu = inject('namaTamu', 'Tamu Undangan')

const copiedRekening = ref(false)
const copiedWhatsapp = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const textAreaRef = ref(null)

const copyToClipboard = (text) => {
  try {
    // Prioritaskan menggunakan Clipboard API jika tersedia
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showCopySuccess(text)
        })
        .catch((err) => {
          console.error('Tidak dapat menyalin teks: ', err)
          mobileSafeCopyToClipboard(text)
        })
    } else {
      // Gunakan metode yang lebih mobile-friendly
      mobileSafeCopyToClipboard(text)
    }
  } catch (err) {
    console.error('Error saat menyalin teks: ', err)
  }
}

const mobileSafeCopyToClipboard = (text) => {
  try {
    const textArea = textAreaRef.value
    textArea.value = text
    textArea.setAttribute('readonly', 'readonly')

    // Pada mobile, kita gunakan metode alternatif yang tidak memicu keyboard
    // Hapus fokus dari elemen lain terlebih dahulu
    document.activeElement.blur()

    // Teknik yang lebih baik untuk mobile
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      // Untuk iOS yang memiliki perilaku berbeda
      textArea.contentEditable = true
      textArea.readOnly = false

      const range = document.createRange()
      range.selectNodeContents(textArea)

      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, 999999)
    } else {
      // Untuk Android dan browser lain
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.select()
    }

    // Eksekusi perintah copy
    const successful = document.execCommand('copy')
    if (successful) {
      showCopySuccess(text)
    } else {
      console.warn('Fallback: Tidak dapat menyalin teks')
    }

    // Setelah copy, segera hapus seleksi untuk menghindari keyboard muncul
    window.getSelection().removeAllRanges()

    // Set kembali fokus ke body untuk menghindari masalah pada mobile
    document.body.focus()
  } catch (err) {
    console.error('Fallback: Tidak dapat menyalin teks', err)
  }
}

const showCopySuccess = (text) => {
  if (text === '2311165641') {
    copiedRekening.value = true
    toastMessage.value = 'Nomor rekening telah disalin!'
    setTimeout(() => {
      copiedRekening.value = false
    }, 2000)
  } else {
    copiedWhatsapp.value = true
    toastMessage.value = 'Nomor WhatsApp telah disalin!'
    setTimeout(() => {
      copiedWhatsapp.value = false
    }, 2000)
  }

  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const openWhatsApp = () => {
  const whatsappUrl = 'https://wa.link/zzrmpx'
  window.open(whatsappUrl, '_blank') // Membuka link di tab baru
}
</script>
