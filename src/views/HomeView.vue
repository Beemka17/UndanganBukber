<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Payment from '../views/Payment.vue'
import Opening from './Opening.vue'
import Landing from './Landing.vue'
import Ornamen from '@/components/Ornamen.vue'
import Rundown from './Rundown.vue'
import Divider from '@/components/Divider.vue'
import Tempat from './Tempat.vue'
import Dresscode from './Dresscode.vue'
import Gallery from './Gallery.vue'
import Closing from './Closing.vue'
import musik from '../assets/audio/backsong1.mp3'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCompactDisc, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCompactDisc, faPlay, faPause)

const namaTamu = ref('Tamu Undangan')
const showOpening = ref(true)
const showLanding = ref(false) // Landing.vue belum muncul sampai Opening.vue selesai
let audio = null
let isMusicPlaying = false
const isPlaying = ref(false)

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const nama = params.get('to')
  if (nama) {
    namaTamu.value = decodeURIComponent(nama)
  }
})

const hideOpening = () => {
  showOpening.value = false

  // Tunda tampilan Landing.vue selama 600ms agar animasi berjalan mulus
  setTimeout(() => {
    showLanding.value = true

    // **Mulai musik setelah Opening.vue selesai**
    startMusic()
  }, 600)
}

const startMusic = () => {
  if (!audio) {
    audio = new Audio(musik)
    audio.loop = true
  }
  audio
    .play()
    .then(() => {
      isPlaying.value = true
    })
    .catch((err) => console.error('Autoplay failed:', err))
}

const toggleMusic = () => {
  if (audio) {
    if (isPlaying.value) {
      audio.pause()
    } else {
      audio.play()
    }
    isPlaying.value = !isPlaying.value
  }
}
</script>

<template>
  <Ornamen />

  <!-- Transisi untuk efek slide up -->
  <transition name="slide-up">
    <Opening v-if="showOpening" @close="hideOpening" />
  </transition>

  <transition class="animate-fade-in animate-delay-250">
    <Landing v-if="showLanding" />
  </transition>

  <Divider />

  <Rundown />

  <Divider />

  <Tempat />

  <Divider />

  <Dresscode />

  <Divider />

  <Payment />

  <Divider />

  <Gallery />

  <Divider />

  <Closing />

  <!-- 🎵 Tombol Musik -->
  <button
    v-if="!showOpening"
    @click="toggleMusic"
    class="fixed bottom-6 right-6 w-14 h-14 bg-amber-400 shadow-lg rounded-full flex items-center justify-center z-10"
  >
    <div :class="{ 'animate-spin-slow': isPlaying }">
      <FontAwesomeIcon :icon="['fas', 'compact-disc']" class="w-14 h-14 text-green-900" />
    </div>
    <FontAwesomeIcon
      v-if="!isPlaying"
      :icon="['fas', 'play']"
      class="absolute text-green-900 w-14 h-14"
    />
    <FontAwesomeIcon
      v-if="isPlaying"
      :icon="['fas', 'pause']"
      class="absolute text-green-900 w-14 h-14"
    />
  </button>
</template>

<style>
/* Animasi Slide Up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.6s ease-in-out,
    opacity 1s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 1;
}

.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Animasi CD Berputar */
@keyframes spin-slow {
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 5s linear infinite;
}
</style>
