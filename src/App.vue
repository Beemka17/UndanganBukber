<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobile = ref(window.innerWidth < 600)

// Cek ukuran layar saat pertama kali dimuat
onMounted(() => {
  // Tambahkan event listener untuk mendeteksi perubahan ukuran layar
  window.addEventListener('resize', handleResize)
  handleResize() // Panggil sekali saat pertama kali dimuat
})

// Hapus event listener saat komponen di-unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Fungsi untuk mendeteksi perubahan ukuran layar
function handleResize() {
  isMobile.value = window.innerWidth < 600
}

// Pantau perubahan `isMobile` secara real-time
watch(isMobile, (newValue) => {
  if (newValue) {
    router.push('/') // Kembali ke halaman utama jika di mobile
  } else {
    router.push('/warning') // Redirect ke warning jika di desktop
  }
})
</script>

<template>
  <router-view />
</template>
