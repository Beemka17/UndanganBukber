<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Halaman Awal -->
    <section
      class="h-screen flex flex-col justify-center px-6 max-[400px]:px-auto max-[400px]:text-center animate-fade-in"
    >
      <p class="text-slate-50 font-family-sans text-lg pb-5">Assalamu'alaikum,</p>
      <h1 class="text-4xl font-family-serif text-amber-400 font-black pb-5">{{ namaTamu }}</h1>
      <p class="text-slate-50 font-family-sans text-lg pb-5">
        UNBREAKABLE ngajak kamu untuk hadir dalam acara Buka Puasa Bersama yang penuh kebersamaan
        dan kehangatan. Yuk, rayakan momen istimewa ini bersama kami!
      </p>
      <ButtonPrimary text="Lihat Detail Acara" @click="$emit('close')"></ButtonPrimary>
    </section>
  </div>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import bgImage from '../assets/images/WP-GREEN.jpg'
import { ref, onMounted, onUnmounted, watch } from 'vue'
const namaTamu = ref('Tamu Undangan')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const nama = params.get('to')
  if (nama) {
    namaTamu.value = decodeURIComponent(nama)
  }

  // **Disable scrolling ketika Opening.vue ditampilkan**
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  // **Enable scrolling kembali setelah Opening.vue menghilang**
  document.body.style.overflow = 'auto'
})
</script>
