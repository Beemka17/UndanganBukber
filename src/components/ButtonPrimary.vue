<script setup>
defineProps({
  text: { type: String, required: true }, // Teks tombol
  newTab: { type: Boolean, default: false }, // Jika true, buka di tab baru
})
</script>

<template>
  <a :target="newTab ? '_blank' : '_self'">
    <button class="btn btn-warning font-family-sans rounded-md text-green-900">{{ text }}</button>
  </a>
</template>
