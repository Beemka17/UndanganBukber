<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Halaman Awal -->
    <section
      v-animate
      class="h-screen items-center flex flex-col justify-center px-6 animate-fade-in"
    >
      <p class="text-white font-family-sans text-lg pb-5 tracking-widest">U N B R E A K A B L E</p>
      <h1 class="text-6xl font-family-serif text-amber-400 !font-bold pb-10 text-center">
        See You <br />
        There
      </h1>
      <p class="text-gray-400 font-family-sans text-md pb-5 text-center">
        This invitation was hastily made by <br />
        BMK
      </p>
    </section>
  </div>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import bgImage from '../assets/images/WP-GREEN.jpg'
import Divider from '@/components/Divider.vue'
</script>
