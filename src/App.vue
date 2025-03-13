<script setup>
import { ref, onMounted } from 'vue'

const namaTamu = ref('Tamu Undangan')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const nama = params.get('to')
  if (nama) {
    namaTamu.value = decodeURIComponent(nama)
  }
})
</script>

<template>
  <div class="min-h-screen w-full bg-gray-100 text-gray-900">
    <!-- Halaman Awal -->
    <section
      class="flex flex-col items-center justify-center h-screen bg-blue-500 text-white text-center p-6"
    >
      <h1 class="text-4xl font-bold">Undangan Buka Bersama</h1>
      <p class="text-xl mt-2">Untuk: {{ namaTamu }}</p>
    </section>

    <!-- Informasi Acara -->
    <section class="py-12 px-6 text-center bg-white">
      <h2 class="text-3xl font-semibold mb-4">Detail Acara</h2>
      <p class="text-lg">📍 Tempat: Anven</p>
      <p class="text-lg">🕒 Waktu: Tanggal 22</p>
    </section>

    <!-- Konfirmasi Kehadiran -->
    <section class="py-12 px-6 text-center bg-gray-100">
      <h2 class="text-3xl font-semibold mb-4">Konfirmasi Kehadiran</h2>
      <button class="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md mr-4">Hadir</button>
      <button class="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md">Tidak Hadir</button>
    </section>

    <!-- Informasi Pembayaran -->
    <section class="py-12 px-6 text-center bg-white">
      <h2 class="text-3xl font-semibold mb-4">Informasi Pembayaran</h2>
      <p class="text-lg">💰 HTM: Rp 60.000</p>
      <p class="text-lg">📌 Transfer ke: 111111 atas nama ABCDE</p>
    </section>
  </div>
</template>
