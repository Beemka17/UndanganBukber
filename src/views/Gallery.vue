<template>
  <div class="min-h-fit w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header v-animate class="pt-16 pb-12">
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Gallery <br />Acara
      </h1>
    </header>

    <div v-animate class="flex flex-col items-center pb-6 px-4">
      <fieldset class="fieldset pb-4 w-full max-w-xs">
        <legend class="fieldset-legend font-family-sans text-black">
          Bagikan momen-mu di acara Tiba-tiba Bukber!
        </legend>
        <button
          @click="openCamera"
          :disabled="isDisabled"
          class="btn-camera w-full mb-2 px-4 py-3 rounded-lg bg-amber-400 text-white font-medium text-center shadow-md"
          :class="{ 'opacity-50 cursor-not-allowed': isDisabled }"
        >
          <span v-if="!isCameraOpen">Ambil Foto</span>
          <span v-else>Tutup Kamera</span>
        </button>
        <label class="fieldset-label text-black text-sm"
          >Max size 2MB (foto hanya dapat di-upload saat hari H)</label
        >
      </fieldset>

      <!-- Status Messages -->
      <div v-if="uploadSuccess" class="upload-success text-green-500 mt-2 text-center">
        Foto berhasil diupload!
      </div>
      <div v-if="uploadError" class="upload-error text-red-500 mt-2 text-center">
        {{ uploadError }}
      </div>
    </div>

    <!-- Mobile-optimized Camera Modal -->
    <div v-if="isCameraOpen" class="mobile-camera-modal">
      <div class="mobile-camera-container">
        <div class="camera-header">
          <button @click="closeCamera" class="close-btn">✕</button>
        </div>

        <div class="camera-view-container">
          <video ref="videoElement" autoplay playsinline class="camera-view"></video>
          <canvas ref="canvasElement" class="hidden"></canvas>
        </div>

        <div v-if="!capturedImage" class="camera-controls">
          <button @click="capturePhoto" class="capture-btn">
            <div class="inner-circle"></div>
          </button>
        </div>

        <div v-if="capturedImage" class="preview-section">
          <img :src="capturedImage" class="preview-image" />
          <div class="preview-actions">
            <button @click="retakePhoto" class="action-btn retake-btn">Ambil Ulang</button>
            <button @click="submitUpload" class="action-btn upload-btn" :disabled="isUploading">
              {{ isUploading ? 'Mengupload...' : 'Upload' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Gallery Section with continuous scrolling -->
    <div v-animate class="relative w-full h-120 min-h-96 overflow-hidden">
      <!-- Loading indicator -->
      <div v-if="isLoading" class="flex justify-center items-center h-full">
        <div class="spinner"></div>
      </div>

      <!-- Container untuk animasi scroll dengan masonry grid -->
      <div v-else class="scroll-container">
        <!-- Kelompok pertama (original) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 px-4 masonry-group">
          <div class="grid gap-4">
            <div v-for="img in gridData.col1" :key="`first-col1-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4">
            <div v-for="img in gridData.col2" :key="`first-col2-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col3" :key="`first-col3-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col4" :key="`first-col4-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
        </div>

        <!-- Kelompok kedua (duplikat) untuk scroll mulus -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 px-4 masonry-group">
          <div class="grid gap-4">
            <div v-for="img in gridData.col1" :key="`second-col1-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4">
            <div v-for="img in gridData.col2" :key="`second-col2-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col3" :key="`second-col3-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
          <div class="grid gap-4 hidden md:block">
            <div v-for="img in gridData.col4" :key="`second-col4-${img.id}`" class="gallery-item">
              <img class="h-auto max-w-full rounded-lg" :src="img.url" :alt="`Image ${img.id}`" />
            </div>
          </div>
        </div>
      </div>

      <!-- No images message -->
      <div v-if="!isLoading && images.length === 0" class="text-center py-12 text-gray-500">
        Belum ada foto yang diupload.
      </div>

      <!-- Overlay gradients untuk efek fade dengan warna putih -->
      <div class="fade-overlay-top"></div>
      <div class="fade-overlay-bottom"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, onUnmounted } from 'vue'
import bgImage from '../assets/images/WP-WHITE.jpg'
import fallbackImage1 from '../assets/images/fallback1.jpg'
import fallbackImage2 from '../assets/images/fallback2.jpg'
import { createClient } from '@supabase/supabase-js'

// Inisialisasi Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// State untuk kamera
const isCameraOpen = ref(false)
const videoElement = ref(null)
const canvasElement = ref(null)
const capturedImage = ref(null)
const stream = ref(null)
const hasCameraPermission = ref(false)

// State untuk galeri dan upload
const images = ref([])
const isLoading = ref(true)
const error = ref(null)
const isUploading = ref(false)
const uploadSuccess = ref(false)
const uploadError = ref(null)
const photoCount = ref(0)
const maxPhotos = 200
const isDisabled = ref(false)
const unlockTime = new Date('2025-03-22T16:30:00').getTime()
//const unlockTime = new Date().getTime() + 10000

// Fungsi untuk membuka/menutup kamera
const openCamera = async () => {
  if (isCameraOpen.value) {
    closeCamera()
    return
  }

  try {
    uploadError.value = null
    uploadSuccess.value = false
    capturedImage.value = null

    // Set camera flag first to show modal immediately
    isCameraOpen.value = true

    // Timeout to ensure DOM is updated before accessing video element
    setTimeout(async () => {
      try {
        // Meminta izin kamera dengan constraints khusus mobile
        const constraints = {
          video: {
            facingMode: 'environment', // Gunakan kamera belakang
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        }

        stream.value = await navigator.mediaDevices.getUserMedia(constraints)
        hasCameraPermission.value = true

        // Menghubungkan stream ke elemen video
        if (videoElement.value) {
          videoElement.value.srcObject = stream.value
          videoElement.value.onloadedmetadata = () => {
            videoElement.value.play()
          }
        }
      } catch (err) {
        console.error('Error accessing camera:', err)
        uploadError.value = 'Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin.'
        // Keep modal open to display the error
      }
    }, 100)
  } catch (err) {
    console.error('Error in openCamera:', err)
    uploadError.value = 'Terjadi kesalahan saat mencoba mengakses kamera.'
    isCameraOpen.value = false
  }
}

// Fungsi untuk menutup kamera
const closeCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
    stream.value = null
  }

  if (videoElement.value) {
    videoElement.value.srcObject = null
  }

  isCameraOpen.value = false
  capturedImage.value = null
  hasCameraPermission.value = false
}

// Fungsi untuk mengambil foto
const capturePhoto = () => {
  if (!videoElement.value || !canvasElement.value) return

  const video = videoElement.value
  const canvas = canvasElement.value

  // Sesuaikan ukuran canvas dengan ukuran video
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  // Gambar frame video ke canvas
  const context = canvas.getContext('2d')
  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  // Konversi ke data URL, kompres untuk mobile
  capturedImage.value = canvas.toDataURL('image/jpeg', 0.8) // 80% quality for mobile

  // Bisa stop video sementara saat preview
  if (stream.value) {
    stream.value.getVideoTracks().forEach((track) => (track.enabled = false))
  }
}

// Fungsi untuk mengambil ulang foto
const retakePhoto = () => {
  capturedImage.value = null

  // Aktifkan kembali video track
  if (stream.value) {
    stream.value.getVideoTracks().forEach((track) => (track.enabled = true))
  }
}

// Fungsi untuk mengupload foto yang diambil
const submitUpload = async () => {
  if (isDisabled.value) return
  if (!capturedImage.value) {
    uploadError.value = 'Silakan ambil foto terlebih dahulu'
    return
  }

  try {
    isUploading.value = true
    uploadError.value = null

    // Convert data URL to Blob
    const response = await fetch(capturedImage.value)
    const blob = await response.blob()

    // Check file size (max 2MB)
    if (blob.size > 2 * 1024 * 1024) {
      uploadError.value =
        'Ukuran foto melebihi 2MB. Silakan ambil ulang dengan resolusi lebih rendah.'
      isUploading.value = false
      return
    }

    // Create a file from the blob
    const fileName = `camera-${Date.now()}.jpg`
    const imageFile = new File([blob], fileName, { type: 'image/jpeg' })

    // Upload to Supabase
    const { data, error } = await supabase.storage.from('gallery').upload(fileName, imageFile)

    if (error) {
      throw error
    }

    // Reset state setelah upload berhasil
    capturedImage.value = null
    closeCamera()
    uploadSuccess.value = true
    fetchPhotoCount()

    // Refresh gallery dengan gambar baru
    await fetchGalleryImages()
  } catch (err) {
    console.error('Upload gagal:', err.message)
    uploadError.value = `Upload gagal: ${err.message}`
  } finally {
    isUploading.value = false
  }
}

// Cek apakah waktu sudah mencapai batas & jumlah foto masih kurang dari 200
const checkButtonStatus = () => {
  const now = new Date().getTime()

  if (now >= unlockTime && photoCount.value < maxPhotos) {
    isDisabled.value = false // Aktifkan tombol setelah waktu berlalu
  } else {
    isDisabled.value = true // Tetap nonaktif sebelum waktunya
  }
}

// Fungsi untuk mendapatkan jumlah foto di storage
const fetchPhotoCount = async () => {
  const { data, error } = await supabase.storage
    .from('gallery') // Ganti dengan nama bucket Anda
    .list('')

  if (error) {
    console.error('Error fetching files:', error)
    return
  }

  photoCount.value = data.length
  // Cek apakah tombol harus tetap disabled
  checkButtonStatus()
  console.log(`Jumlah foto saat ini di Supabase: ${photoCount.value}`)
  //isDisabled.value = photoCount.value >= maxPhotos
}

// Fungsi untuk mendapatkan gambar dari Supabase Storage - FIXED to sort by most recent
const fetchGalleryImages = async () => {
  try {
    isLoading.value = true
    error.value = null

    // Get all files from the 'gallery' bucket
    const { data, error: storageError } = await supabase.storage.from('gallery').list('', {
      sortBy: { column: 'created_at', order: 'desc' }, // Sort by newest first
      limit: 100, // Increase limit to get more images
    })
    console.log('Fetched images:', data)

    if (storageError) throw storageError

    // Filter to keep only image files
    const imageFiles = data.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))

    // Map to create image objects with public URLs
    const imageUrls = imageFiles.map((file, index) => ({
      id: `${file.name}-${index}`, // Create a unique ID using filename and index
      name: file.name,
      url: `${supabaseUrl}/storage/v1/object/public/gallery/${file.name}`,
      created_at: file.created_at || Date.now(), // Use created_at for sorting
    }))

    // Sort by newest first if created_at is available
    images.value = imageUrls.sort((a, b) => {
      if (a.created_at && b.created_at) {
        return new Date(b.created_at) - new Date(a.created_at)
      }
      return 0
    })

    // Use fallback images only if no images found
    if (images.value.length === 0) {
      console.warn('Tidak ada gambar dari Supabase. Menggunakan gambar lokal sebagai fallback.')
      images.value = getFallbackImages()
    }

    isLoading.value = false
  } catch (err) {
    console.error('Error fetching images:', err)
    error.value = err.message
    isLoading.value = false

    // Only use fallback if there was an error
    images.value = getFallbackImages()
  }
}

// Fungsi untuk mendapatkan gambar fallback dari lokal
const getFallbackImages = () => {
  return [
    { id: 'fallback-1', name: 'fallback1.jpg', url: fallbackImage1 },
    { id: 'fallback-2', name: 'fallback2.jpg', url: fallbackImage2 },
  ]
}

// Computed property untuk mendistribusikan gambar ke grid masonry - FIXED to distribute properly
const gridData = computed(() => {
  const cols = { col1: [], col2: [], col3: [], col4: [] }

  if (images.value.length === 0) return cols

  images.value.forEach((img, index) => {
    const colIndex = index % 2
    if (colIndex === 0) {
      cols.col1.push(img)
    } else if (colIndex) {
      cols.col2.push(img)
    }
  })

  console.log('Distributed columns:', cols) // Tambahkan log ini
  return cols
})

// Pastikan untuk menutup kamera dan membersihkan stream saat komponen unmount
onBeforeUnmount(() => {
  closeCamera()
})

let intervalId
// Fetch images on component mount
onMounted(() => {
  fetchPhotoCount()
  checkButtonStatus()
  fetchGalleryImages()
  intervalId = setInterval(fetchGalleryImages, 60000)
  // Cek waktu setiap detik
  setInterval(() => {
    checkButtonStatus()
  }, 1000)
})

// Hentikan polling jika komponen di-unmount
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style>
/* Styling for gallery items with better aspect ratio handling */
.gallery-item {
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.02);
}

/* Better scroll container with responsive height */
.scroll-container {
  width: 100%;
  position: absolute;
  animation: scrollUp 20s linear infinite;
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
    transform: translateY(-50%);
  }
}

/* Loading spinner */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #f59e0b;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Gradients untuk efek fade */
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

/* Mobile Camera UI Styling */
.mobile-camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mobile-camera-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.camera-header {
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.camera-view-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000;
}

.camera-view {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-controls {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.capture-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: 3px solid white;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
}

.preview-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.preview-image {
  flex: 1;
  width: 100%;
  height: auto;
  object-fit: contain;
  background-color: #000;
}

.preview-actions {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.7);
}

.action-btn {
  padding: 10px 20px;
  border-radius: 24px;
  font-weight: medium;
  border: none;
}

.retake-btn {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.upload-btn {
  background-color: #f59e0b; /* amber-500 */
  color: white;
}

.upload-btn:disabled {
  opacity: 0.7;
}

.hidden {
  display: none;
}

/* Ensuring modal works well on iOS */
.camera-view {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

/* Additional mobile-specific adjustments */
@media (max-width: 640px) {
  .camera-view {
    width: 100%;
    height: 100%;
  }

  .preview-image {
    max-height: calc(100vh - 130px);
  }
}
</style>
