<template>
  <div class="min-h-fit w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header v-animate class="pt-20 pb-20">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Dresscode <br />Acara
      </h1>
    </header>

    <div v-animate class="w-full min-h-fit mx-auto">
        <p class="text-center text-2xl font-family-serif text-amber-400 !font-bold">Detail Dresscode:</p>
        <p class="text-center text-lg font-family-sans text-slate-50 !font-medium pb-5">Bebas tapi harus ada elemen batik <br> Lihat dibawah untuk refrensi dresscode:</p>
    </div>

    <div v-animate class="w-full min-h-fit pl-5 pb-16">
    <swiper
      :slidesPerView="3"
      :spaceBetween="10"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="w-full h-[300px]"
    >
      <swiper-slide><img :src="image1" loading="lazy"></img></swiper-slide>
      <swiper-slide><img :src="image2" loading="lazy"></img></swiper-slide><swiper-slide><img :src="image3" loading="lazy"></img></swiper-slide>
      <swiper-slide><img :src="image4" loading="lazy"></img></swiper-slide><swiper-slide><img :src="image5" loading="lazy"></img></swiper-slide>
    </swiper>
  </div>
</div>
</template>

<script setup>
import bgImage from '../assets/images/WP-GREEN.jpg' // Sesuaikan path gambar
import image1 from '../assets/images/batik1.jpg' // Sesuaikan path gambar
import image2 from '../assets/images/batik2.jpg' // Sesuaikan path gambar
import image3 from '../assets/images/batik3.jpg' // Sesuaikan path gambar
import image4 from '../assets/images/batik4.jpg'
import image5 from '../assets/images/batik5.jpg'
</script>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import '../assets/dresscode.css'

// import required modules
import { Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    }
  },
}
</script>
