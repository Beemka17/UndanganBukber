<template>
  <div class="min-h-fit w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header v-animate class="pt-20 pb-20">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Gallery <br />Acara
      </h1>
    </header>

    <div v-animate class="flex flex-col items-center pb-6">
      <fieldset class="fieldset pb-4">
        <legend class="fieldset-legend font-family-sans text-black">
          Bagikan momen-mu di acara Tiba-tiba Bukber!
        </legend>
        <input type="file" @change="uploadImage" accept="image/*" class="file-input" />
        <label class="fieldset-label text-black"
          >Max size 2MB (foto hanya dapat di-upload saat hari H)</label
        >
      </fieldset>
      <button
        @click="submitUpload"
        class="btn px-4 py-2 rounded shadow btn-disabled"
        tabindex="-1"
        role="button"
        aria-disabled="true"
      >
        Upload Foto
      </button>
    </div>

    <div v-animate class="relative w-full h-96 overflow-hidden">
      <!-- Container untuk animasi scroll dengan masonry grid -->
      <div class="scroll-container">
        <!-- Kelompok pertama (original) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 px-4 masonry-group">
          <div class="grid gap-4">
            <div v-for="img in gridData.col1" :key="`first-col1-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4">
            <div v-for="img in gridData.col2" :key="`first-col2-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col3" :key="`first-col3-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col4" :key="`first-col4-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
        </div>

        <!-- Kelompok kedua (duplikat) untuk scroll mulus -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 px-4 masonry-group">
          <div class="grid gap-4">
            <div v-for="img in gridData.col1" :key="`second-col1-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4">
            <div v-for="img in gridData.col2" :key="`second-col2-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col3" :key="`second-col3-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col4" :key="`second-col4-${img.id}`">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay gradients untuk efek fade dengan warna putih -->
      <div class="fade-overlay-top"></div>
      <div class="fade-overlay-bottom"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import bgImage from '../assets/images/WP-WHITE.jpg'
import fallbackImage1 from '../assets/images/fallback1.jpg'
import fallbackImage2 from '../assets/images/fallback2.jpg'
import { createClient } from '@supabase/supabase-js'

// Inisialisasi Supabase client (ganti dengan konfigurasi Anda)
const supabaseUrl = ''
const REMOVED = ''
const supabase = createClient(supabaseUrl, REMOVED)

// State untuk menyimpan data gambar
const images = ref([])
const isLoading = ref(true)
const error = ref(null)
const selectedFile = ref(null)
const isUploading = ref(false)
const uploadSuccess = ref(false)
const uploadError = ref(null)

const uploadImage = (event) => {
  selectedFile.value = event.target.files[0]
  uploadError.value = null
  uploadSuccess.value = false
}

const submitUpload = async () => {
  if (!selectedFile.value) {
    uploadError.value = 'Silakan pilih file terlebih dahulu'
    return
  }

  // Validasi ukuran file (max 2MB)
  if (selectedFile.value.size > 2 * 1024 * 1024) {
    uploadError.value = 'Ukuran file melebihi 2MB'
    return
  }

  try {
    isUploading.value = true
    uploadError.value = null

    const fileName = `${Date.now()}-${selectedFile.value.name}`
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(fileName, selectedFile.value)

    if (error) {
      throw error
    }

    // Reset form setelah upload berhasil
    selectedFile.value = null
    uploadSuccess.value = true

    // Refresh gallery dengan gambar baru
    await fetchGalleryImages()
  } catch (err) {
    console.error('Upload gagal:', err.message)
    uploadError.value = `Upload gagal: ${err.message}`
  } finally {
    isUploading.value = false
  }
}

// Fungsi untuk mengacak array
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Fungsi untuk mendapatkan gambar dari Supabase Storage
const fetchGalleryImages = async () => {
  try {
    isLoading.value = true

    const { data, error: storageError } = await supabase.storage.from('gallery').list('', {
      sortBy: { column: 'created_at', order: 'desc' },
    })

    if (storageError) throw storageError

    const imageFiles = data.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))

    const imageUrls = imageFiles.map((file, index) => ({
      id: index + 1,
      name: file.name,
      url: `${supabaseUrl}/storage/v1/object/public/gallery/${file.name}`,
      size: file.metadata?.size || 0,
    }))

    images.value = shuffleArray(imageUrls)

    if (images.value.length === 0) {
      console.warn('Tidak ada gambar dari Supabase. Menggunakan dua gambar lokal sebagai fallback.')
      images.value = getFallbackImages()
    }
    isLoading.value = false
  } catch (err) {
    error.value = err.message
    isLoading.value = false
    console.error('Error fetching images:', err)

    images.value = getFallbackImages()
  }
}

// Fungsi untuk mendapatkan satu gambar fallback dari lokal
const getFallbackImages = () => {
  return [
    { id: 998, url: fallbackImage1 },
    { id: 999, url: fallbackImage2 },
  ]
}

// Fungsi untuk mendapatkan gambar demo (fallback)
const getDemoImages = () => {
  const demoImages = [
    { id: 1, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg' },
    { id: 2, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg' },
    { id: 3, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg' },
    { id: 4, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg' },
    { id: 5, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg' },
    { id: 6, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg' },
    { id: 7, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg' },
    { id: 8, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg' },
    { id: 9, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg' },
    { id: 10, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg' },
    { id: 11, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg' },
    { id: 12, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg' },
  ]
  return shuffleArray(demoImages)
}

// Computed property untuk mendistribusikan gambar ke grid masonry
const gridData = computed(() => {
  const cols = { col1: [], col2: [], col3: [], col4: [] }

  if (images.value.length === 0) return cols

  // Distribute images evenly across columns
  images.value.forEach((img, index) => {
    const colIndex = index % 4
    if (colIndex === 0) cols.col1.push(img)
    else if (colIndex === 1) cols.col2.push(img)
    else if (colIndex === 2) cols.col3.push(img)
    else cols.col4.push(img)
  })

  return cols
})

// Fetch images on component mount
onMounted(() => {
  fetchGalleryImages() // Rename from fetchImages to fetchGalleryImages for consistency
})
</script>

<style>
.scroll-container {
  width: 100%;
  position: absolute;
  animation: scrollUp 40s linear infinite;
}

.masonry-group {
  width: 100%;
  margin-bottom: 10px;
}

/* Animasi scroll */
@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%); /* Hanya pindah setengah dari container */
  }
}

/* Gradients untuk efek fade in/out dengan warna putih */
.fade-overlay-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(249, 249, 249, 1) 0%, rgba(249, 249, 249, 0) 100%);
  z-index: 10;
  pointer-events: none;
}

.fade-overlay-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, rgba(249, 249, 249, 1) 0%, rgba(249, 249, 249, 0) 100%);
  z-index: 10;
  pointer-events: none;
}
</style>
