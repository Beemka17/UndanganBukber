<template>
  <div class="divider" :style="{ backgroundImage: `url(${dividerImage})` }"></div>
</template>

<script setup>
import dividerImage from '../assets/images/divider.png' // Sesuaikan path gambar
</script>

<style scoped>
.divider {
  width: 100%;
  height: 92px; /* Sesuaikan tinggi divider */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
