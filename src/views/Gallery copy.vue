<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header class="pt-20 pb-20">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Gallery <br />Acara
      </h1>
    </header>

    <div class="flex flex-col items-center mb-6">
      <fieldset class="fieldset pb-4">
        <legend class="fieldset-legend font-family-sans">
          Bagikan momen-mu di acara Tiba-tiba Bukber!
        </legend>
        <input type="file" @change="uploadImage" accept="image/*" class="file-input" />
        <label class="fieldset-label">Max size 2MB</label>
      </fieldset>
      <button @click="submitUpload" class="bg-blue-500 text-white px-4 py-2 rounded shadow">
        Upload Foto
      </button>
    </div>

    <!-- Gallery Section -->
    <div class="-m-1 flex flex-row sm:flex-wrap md:-m-2">
      <div class="flex w-full sm:w-1/2 flex-wrap lg:flex-row flex-row-reverse">
        <transition-group name="fade" tag="div" class="flex w-full flex-wrap">
          <div
            v-for="(image, index) in displayedImages.slice(0, 3)"
            :key="image"
            class="w-full lg:w-1/2 p-1 md:p-2"
          >
            <img
              :src="image"
              class="block h-[300px] w-full rounded-lg object-cover object-center"
            />
          </div>
        </transition-group>
      </div>
      <div class="flex w-full flex-wrap flex-col">
        <transition-group name="fade" tag="div" class="flex w-full flex-wrap">
          <div
            v-for="(image, index) in displayedImages.slice(3, 6)"
            :key="image"
            class="w-full p-1 md:p-2"
          >
            <img :src="image" class="block h-full w-full rounded-lg object-cover object-center" />
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import bgImage from '../assets/images/WP-WHITE.jpg'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = ''
const REMOVED = ''
const supabase = createClient(supabaseUrl, REMOVED)

const selectedFile = ref(null)
const galleryImages = ref([])
const displayedImages = ref([])
let interval = null
const changeInterval = 3000

const uploadImage = (event) => {
  selectedFile.value = event.target.files[0]
}

const submitUpload = async () => {
  if (!selectedFile.value) return

  const fileName = `${Date.now()}-${selectedFile.value.name}`
  const { data, error } = await supabase.storage
    .from('gallery')
    .upload(fileName, selectedFile.value)

  if (error) {
    console.error('Upload gagal:', error.message)
  } else {
    console.log('Upload berhasil:', data)
    fetchGalleryImages()
  }
}

const fetchGalleryImages = async () => {
  const { data, error } = await supabase.storage.from('gallery').list()
  if (error) {
    console.error('Gagal mengambil gambar:', error.message)
  } else {
    galleryImages.value = data
      .map((file) => `${supabaseUrl}/storage/v1/object/public/gallery/${file.name}`)
      .reverse()
    updateDisplayedImages()
  }
}

// Ganti gambar satu per satu
const updateDisplayedImages = () => {
  if (galleryImages.value.length > 0) {
    displayedImages.value = galleryImages.value.slice(0, 6)
    let index = 6

    interval = setInterval(() => {
      if (galleryImages.value.length > 6) {
        displayedImages.value.splice(0, 1) // Hapus gambar pertama
        displayedImages.value.push(galleryImages.value[index % galleryImages.value.length]) // Tambahkan gambar baru di akhir
        index++
      }
    }, changeInterval)
  }
}

// Listener Supabase untuk update real-time
const listenForUpdates = () => {
  supabase
    .channel('gallery-updates')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, fetchGalleryImages)
    .subscribe()
}

onMounted(() => {
  fetchGalleryImages()
  listenForUpdates()
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style>
/* Animasi Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
