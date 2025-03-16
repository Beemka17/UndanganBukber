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
      <swiper-slide><img :src="image1"></img></swiper-slide>
      <swiper-slide><img :src="image2"></img></swiper-slide>
      <swiper-slide><img :src="image3"></img></swiper-slide>
      <swiper-slide><img :src="image4"></img></swiper-slide>
      <swiper-slide><img :src="image5"></img></swiper-slide>
    </swiper>
  </div>
</div>
</template>

<script setup>
import bgImage from '../assets/images/WP-GREEN.jpg'
import image1 from '../assets/images/batik1.jpg'
import image2 from '../assets/images/batik2.jpg'
import image3 from '../assets/images/batik3.jpg'
import image4 from '../assets/images/batik4.jpg'
import image5 from '../assets/images/batik5.jpg'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import '../assets/dresscode.css'

// Import required modules
import { Pagination } from 'swiper/modules'

// Define modules for swiper
const modules = [Pagination]
</script>