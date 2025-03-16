<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header v-animate class="pt-20 pb-20">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Informasi <br />Pembayaran
      </h1>
    </header>

    <div v-animate class="container mx-auto px-6 max-[400px]:pb-16">
      <p class="text-lg font-family-sans text-center text-black">
        Pembayaran dapat dilakukan melalui transfer ke rekening berikut:
      </p>

      <div v-animate class="mt-10">
        <div class="text-lg font-family-sans text-center text-black">
          <p class="!font-bold text-black">Bank Central Asia / BCA</p>
          <p>2311165641</p>
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
          <p class="!font-bold">+62 895-2153-7284</p>
          <p>a.n. <span class="!font-bold">SI ABC</span></p>
          <p class="pb-2">Atau dapat klik tombol dibawah ini:</p>
          <ButtonPrimary text="Konfirmasi Pembayaran" @click="openGoogleMaps" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bgImage from '../assets/images/WP-WHITE.jpg'
import ButtonPrimary from '@/components/ButtonPrimary.vue'

const openGoogleMaps = () => {
  const mapsUrl = 'https://wa.link/zzrmpx'
  window.open(mapsUrl, '_blank') // Membuka link di tab baru
}
</script>
