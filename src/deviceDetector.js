export const deviceDetector = {
  isMobileDevice() {
    // Pengecekan user agent untuk mobile device
    const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

    // Pengecekan ukuran layar
    const smallScreen = window.innerWidth < 600

    // Pengecekan apakah touch-enabled
    const touchEnabled = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Pengecekan apakah pengguna meminta tampilan desktop
    const notRequestingDesktopSite = !navigator.userAgent.includes('Mozilla') || smallScreen

    // Perangkat dianggap mobile jika memenuhi kriteria di atas
    return (mobileUserAgent || smallScreen) && touchEnabled && notRequestingDesktopSite
  },

  isDesktopMode() {
    return !this.isMobileDevice()
  },
}
