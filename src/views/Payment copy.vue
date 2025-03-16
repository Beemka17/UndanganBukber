<template>
  <section class="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
    <h2 class="text-2xl font-bold mb-4">Konfirmasi Pembayaran</h2>

    <form @submit.prevent="submitPayment" class="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
      <label class="block mb-2 font-medium">Nama Tamu:</label>
      <input type="text" v-model="namaTamu" class="w-full p-2 border rounded mb-4" readonly />

      <label class="block mb-2 font-medium">Upload Bukti Transfer:</label>
      <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded mb-4" />

      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
        Kirim
      </button>
    </form>

    <p v-if="message" class="mt-4 text-green-600 font-semibold">{{ message }}</p>
  </section>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

// Inisialisasi Supabase
const supabaseUrl = 'REMOVED'
const REMOVED =
  'REMOVED'
const supabase = createClient(supabaseUrl, REMOVED)

export default {
  data() {
    return {
      namaTamu: new URLSearchParams(window.location.search).get('to') || 'Tamu Undangan',
      file: null,
      message: '',
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0]
    },
    async submitPayment() {
      if (!this.file) {
        alert('Silakan upload bukti transfer!')
        return
      }

      const filePath = `bukti/${this.namaTamu}_${Date.now()}.${this.file.name.split('.').pop()}`

      // Upload ke Supabase Storage
      const { data, error } = await supabase.storage
        .from('bukti-pembayaran')
        .upload(filePath, this.file)

      if (error) {
        console.error('Upload error:', error)
        this.message = 'Gagal mengirim konfirmasi pembayaran.'
        return
      }

      // Dapatkan URL gambar
      const { publicUrl } = supabase.storage.from('bukti-pembayaran').getPublicUrl(filePath)

      this.message = `Konfirmasi pembayaran berhasil! Bukti: ${publicUrl}`
    },
  },
}
</script>
