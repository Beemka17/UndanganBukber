<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header v-animate class="pt-20 pb-20 flex justify-center flex-col items-center">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Informasi <br />Lokasi
      </h1>
      <div class="w-3/4 px-2 pt-2">
        <p class="text-white text-lg font-family-sans text-center">
          Biar <span class="italic">{{ namaTamu }}</span> ga salah tempat nantinya
        </p>
      </div>
    </header>

    <div v-animate class="w-full h-[350px] px-12">
      <div class="w-full h-full overflow-hidden rounded-xl shadow-lg">
        <iframe
          class="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.459480034727!2d107.4350764293967!3d-6.557250295048674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e690f5b19116ed9%3A0x872812fb84f63be8!2sAnven%20Waterpark%20dan%20Cafe!5e0!3m2!1sid!2sid!4v1742039860959!5m2!1sid!2sid"
          style="border: 0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    <section
      v-animate
      class="flex justify-center items-center flex-col px-6 pt-6 max-[400px]:pb-16"
    >
      <h2 class="text-2xl font-family-serif text-amber-400 !font-bold pb-1">Detail Lokasi</h2>
      <p class="text-white font-family-sans text-lg pb-5 text-center">
        Anven Waterpark & Cafe <br />
        <span class="text-gray-400">
          Jl. Jend. Ahmad Yani No.165, RT.23/RW.8, Cipaisan, Kec. Purwakarta, Kabupaten Purwakarta,
          Jawa Barat 41113</span
        >
      </p>
      <ButtonPrimary text="Dapatkan Petunjuk Arah" @click="openGoogleMaps"></ButtonPrimary>
    </section>
  </div>
</template>

<script setup>
import bgImage from '../assets/images/WP-GREEN.jpg' // Sesuaikan path gambar
import image1 from '../assets/images/dor.jpg' // Sesuaikan path gambar
import image2 from '../assets/images/black-1.png' // Sesuaikan path gambar
import image3 from '../assets/images/ava-.png' // Sesuaikan path gambar
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import { inject } from 'vue'
const namaTamu = inject('namaTamu', 'Tamu Undangan')

const openGoogleMaps = () => {
  const mapsUrl = 'https://maps.app.goo.gl/HsxejaS6316SRY8u9'
  window.open(mapsUrl, '_blank') // Membuka link di tab baru
}

const images = [
  { id: 1, url: image1 },
  { id: 2, url: image2 },
  { id: 3, url: image3 },
]

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
}
</script>
