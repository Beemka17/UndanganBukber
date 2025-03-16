<template>
  <div class="min-h-screen w-full" :style="{ backgroundImage: `url(${bgImage})` }">
    <header class="pt-20 pb-20" v-animate>
      <h1 class="text-4xl font-family-serif text-amber-400 !font-bold text-center">
        Rundown <br />Acara
      </h1>
    </header>

    <div id="timeline" class="container mx-auto mt-40" v-animate>
      <ul class="timeline timeline-snap-icon timeline-vertical px-4">
        <li>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5 text-green-900"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-start mb-10 md:text-end">
            <time class="font-family-sans italic text-black">16:30 - 17:00</time>
            <div class="text-lg !font-bold text-black">Open Gate</div>
            <br />
            <br />
            <br />
          </div>
          <hr class="bg-amber-400" />
        </li>
        <li>
          <hr class="bg-amber-400" />
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5 text-green-900"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-end md:mb-10">
            <time class="font-family-sans italic text-black">17:00 - Maghrib</time>
            <div class="text-lg !font-bold text-black">Free Time</div>
            <br />
            <br />
            <br />
          </div>
          <hr class="bg-amber-400" />
        </li>
        <li>
          <hr class="bg-amber-400" />
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5 text-green-900"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-start mb-10 md:text-end">
            <time class="font-family-sans italic text-black">Maghrib - Isya</time>
            <div class="text-lg !font-bold text-black">Buka Bersama</div>
            <br />
            <br />
            <br />
          </div>
          <hr class="bg-amber-400" />
        </li>
        <li>
          <hr class="bg-amber-400" />
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5 text-green-900"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-end md:mb-10">
            <time class="font-family-sans italic text-black">Isya - Beres</time>
            <div class="text-lg !font-bold text-black">Main Event</div>
            <p class="text-black opacity-65 italic font-family-sans">
              Games, Doorprize, Music, and etc
            </p>
            <br />
            <br />
          </div>
          <hr class="bg-amber-400" />
        </li>
        <li>
          <hr class="bg-amber-400" />
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5 text-green-900"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-start mb-10 md:text-end">
            <time class="font-family-sans italic text-black">Gesan</time>
            <div class="text-lg ont-family-sans !font-bold text-black">Bubar</div>
            <br />
            <br />
            <br />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import bgImage from '../assets/images/WP-WHITE.jpg'
</script>
