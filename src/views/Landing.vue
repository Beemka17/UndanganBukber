<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Halaman Awal -->
    <section class="h-screen items-center flex flex-col justify-center px-6 animate-fade-in">
      <p class="text-black font-family-sans text-lg pb-5 tracking-widest">U N B R E A K A B L E</p>
      <h1 class="text-6xl font-family-serif text-amber-400 !font-bold pb-5 text-center">
        Tiba-tiba <br />
        Bukber
      </h1>
      <p class="text-black text-center font-family-sans text-lg !font-medium pb-8">
        22 Maret 2025 <br />
        16:30 - Selesai <br />
        Cafe Anven, Cipaisan
      </p>

      <!-- Countdown Timer -->
      <div class="grid auto-cols-max grid-flow-col gap-5 text-center justify-center">
        <div class="flex flex-col text-black">
          <span class="countdown font-family-sans text-5xl text-black">{{ timeLeft.days }}</span>
          days
        </div>
        <div class="flex flex-col text-black">
          <span class="countdown font-family-sans text-5xl text-black">{{ timeLeft.hours }}</span>
          hours
        </div>
        <div class="flex flex-col text-black">
          <span class="countdown font-family-sans text-5xl text-black">{{ timeLeft.minutes }}</span>
          min
        </div>
        <div class="flex flex-col text-black">
          <span class="countdown font-family-sans text-5xl text-black">{{ timeLeft.seconds }}</span>
          sec
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import bgImage from '../assets/images/WP-WHITE.jpg'

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownInterval = null

const updateCountdown = () => {
  const targetDate = new Date('March 22, 2025 16:30:00').getTime()
  const now = new Date().getTime()
  const difference = targetDate - now

  if (difference > 0) {
    timeLeft.value = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    }
  } else {
    clearInterval(countdownInterval)
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
}

onMounted(() => {
  updateCountdown() // Jalankan saat halaman dimuat
  countdownInterval = setInterval(updateCountdown, 1000) // Perbarui setiap detik
})

onUnmounted(() => {
  clearInterval(countdownInterval) // Hapus interval saat komponen dihancurkan
})
</script>
