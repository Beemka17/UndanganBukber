<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header class="pt-20 pb-20">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Informasi <br />Lokasis
      </h1>
    </header>

    <div class="w-full h-[350px] px-12">
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

    <Carousel v-bind="config" class="px-4">
      <Slide v-for="image in images" :key="image.id">
        <img :src="image.url" alt="image" />
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import bgImage from '../assets/images/WP-GREEN.jpg' // Sesuaikan path gambar
import image1 from '../assets/images/dor.jpg' // Sesuaikan path gambar
import image2 from '../assets/images/black-1.png' // Sesuaikan path gambar
import image3 from '../assets/images/ava-.png' // Sesuaikan path gambar
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

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
