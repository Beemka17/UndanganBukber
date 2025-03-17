<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { deviceDetector } from './deviceDetector'
import { inject } from '@vercel/analytics'

const router = useRouter()
const isMobile = ref(true)

// Fungsi untuk mendeteksi perubahan ukuran layar dan mode tampilan
function handleResize() {
  isMobile.value = deviceDetector.isMobileDevice()
}

// Cek ukuran layar saat pertama kali dimuat
onMounted(() => {
  // Tambahkan event listener untuk mendeteksi perubahan ukuran layar
  window.addEventListener('resize', handleResize)

  // Deteksi mode desktop/mobile saat pertama kali dimuat
  handleResize()

  // Tambahkan pemeriksaan tambahan setelah page load
  setTimeout(handleResize, 500)
})

// Hapus event listener saat komponen di-unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Pantau perubahan `isMobile` secara real-time
watch(isMobile, (newValue) => {
  if (newValue) {
    // Jika mobile, periksa apakah kita saat ini di halaman warning
    if (router.currentRoute.value.path === '/warning') {
      router.push('/') // Kembali ke halaman utama jika di mobile
    }
  } else {
    // Jika desktop, periksa apakah kita saat ini bukan di halaman warning
    if (router.currentRoute.value.path !== '/warning') {
      router.push('/warning') // Redirect ke warning jika di desktop
    }
  }
})
inject()
</script>

<template>
  <router-view />
</template>
