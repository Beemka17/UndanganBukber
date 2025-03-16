export default {
  beforeMount(el, binding) {
    const animationClass = binding.value || 'animate-fade-in'
    el.classList.add('opacity-0')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(animationClass, 'opacity-100')
          el.classList.remove('opacity-0')

          if (binding.modifiers.once) {
            observer.unobserve(el) // Hapus observer agar animasi hanya terjadi sekali
          }
        }
      },
      { threshold: 0.4 }, // Aktifkan animasi saat 20% elemen masuk viewport
    )

    observer.observe(el)
  },
}
