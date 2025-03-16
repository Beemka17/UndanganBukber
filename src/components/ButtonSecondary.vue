<script setup>
defineProps({
  text: { type: String, required: true }, // Teks tombol
  to: { type: String, required: true }, // Link tujuan
  newTab: { type: Boolean, default: false }, // Jika true, buka di tab baru
})
</script>

<template>
  <a :href="to" :target="newTab ? '_blank' : '_self'">
    <button class="btn btn-outline btn-success">{{ text }}</button>
  </a>
</template>
