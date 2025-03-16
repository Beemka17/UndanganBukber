import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  stages: [
    { duration: '2m', target: 200 }, // Naik ke 200 user dalam 2 menit
    { duration: '18m', target: 200 }, // Tetap di 200 user selama 18 menit
    { duration: '1m', target: 0 }, // Turun kembali ke 0
  ],
}

export default function () {
  http.get('http://192.168.100.105:5173/') // Sesuaikan dengan alamat localhost-mu
  sleep(1)
}
