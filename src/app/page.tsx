'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Animated Background Component
function AnimatedBackground() {
  // Pre-defined particles with deterministic values based on index
  // This avoids hydration mismatch while still providing visual variety
  const particles = Array.from({ length: 30 }, (_, i) => {
    // Use a simple hash-like calculation based on index for deterministic values
    const seed = i * 137.508 // Golden angle for better distribution
    const leftVal = ((seed * 7.3) % 100).toFixed(2)
    const delayVal = ((seed * 0.8) % 8).toFixed(2)
    const durationVal = (6 + ((seed * 1.2) % 6)).toFixed(2)
    const sizeVal = (1 + ((seed * 0.9) % 3)).toFixed(2)
    
    return {
      id: i,
      left: `${leftVal}%`,
      animationDelay: `${delayVal}s`,
      animationDuration: `${durationVal}s`,
      size: `${sizeVal}px`,
    }
  })

  return (
    <>
      {/* Animated Gradient Background */}
      <div className="animated-bg" />
      
      {/* Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      
      {/* Particles */}
      <div className="particle-field">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>
      
      {/* Glowing Lines */}
      <div className="glow-line" style={{ top: '20%', animationDelay: '0s' }} />
      <div className="glow-line" style={{ top: '50%', animationDelay: '3s' }} />
      <div className="glow-line" style={{ top: '80%', animationDelay: '6s' }} />
    </>
  )
}

// Layanan/Services Data - Updated colors
const services = [
  {
    title: 'Nursery House',
    description: 'Penyediaan benih berkualitas unggul yang dipilih secara selektif untuk memastikan produktivitas optimal dan ketahanan terhadap hama penyakit.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    gradient: 'from-[#00d9ff] to-[#0891b2]'
  },
  {
    title: 'Agro Input',
    description: 'Penyediaan sarana produksi tani (saprotan) organik dan ramah lingkungan untuk mendukung praktik pertanian berkelanjutan.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    gradient: 'from-[#a855f7] to-[#7c3aed]'
  },
  {
    title: 'Agro Farm',
    description: 'Manajemen budidaya yang berfokus pada produktivitas dengan pendampingan agronomis profesional dari persiapan lahan hingga panen.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    gradient: 'from-[#10b981] to-[#059669]'
  },
  {
    title: 'Offtaking Produce',
    description: 'Penyaluran hasil budidaya ke pasar-pasar, industri, hingga pasar ekspor untuk memastikan hasil panen mendapatkan nilai jual terbaik.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    gradient: 'from-[#f59e0b] to-[#d97706]'
  }
];

// Portfolio/Projects Data
const projects = [
  {
    name: 'Gadog, Megamendung',
    location: 'Jawa Barat',
    area: '14 Hektar',
    crop: 'Cabai Merah',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=300&fit=crop'
  },
  {
    name: 'Bojong Gede',
    location: 'Jawa Barat',
    area: '1.2 Hektar',
    crop: 'Sayuran',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
  },
  {
    name: 'Kundangwangi, Sumedang',
    location: 'Jawa Barat',
    area: '25 Hektar',
    crop: 'Padi & Palawija',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop'
  }
];

// Products Data
const products = [
  { 
    id: 1, 
    name: 'Benih Cabai Merah Keriting', 
    category: 'benih', 
    price: 'Rp 125.000', 
    image: 'https://images.unsplash.com/photo-1583458856590-ec09b2a3c6f6?w=400&h=400&fit=crop', 
    rating: 4.9,
    description: 'Varietas unggul dengan produktivitas tinggi dan tahan terhadap penyakit'
  },
  { 
    id: 2, 
    name: 'Benih Padi Ciherang', 
    category: 'benih', 
    price: 'Rp 85.000', 
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&h=400&fit=crop', 
    rating: 4.8,
    description: 'Benih padi berkualitas dengan potensi hasil panen tinggi'
  },
  { 
    id: 3, 
    name: 'Pupuk Organik Granul', 
    category: 'pupuk', 
    price: 'Rp 150.000', 
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', 
    rating: 4.9,
    description: 'Pupuk organik berkualitas untuk meningkatkan kesuburan tanah'
  },
  { 
    id: 4, 
    name: 'Pupuk NPK Mutiara', 
    category: 'pupuk', 
    price: 'Rp 180.000', 
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop', 
    rating: 4.7,
    description: 'Pupuk majemuk untuk pertumbuhan optimal tanaman'
  },
  { 
    id: 5, 
    name: 'Pestisida Nabati', 
    category: 'pestisida', 
    price: 'Rp 95.000', 
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop', 
    rating: 4.6,
    description: 'Pestisida organik ramah lingkungan untuk pengendalian hama'
  },
  { 
    id: 6, 
    name: 'Benih Jagung Hibrida', 
    category: 'benih', 
    price: 'Rp 110.000', 
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop', 
    rating: 4.8,
    description: 'Benih jagung hibrida dengan produktivitas tinggi'
  },
  { 
    id: 7, 
    name: 'Pupuk Cair Bioaktif', 
    category: 'pupuk', 
    price: 'Rp 175.000', 
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=400&fit=crop', 
    rating: 4.7,
    description: 'Pupuk cair dengan mikroorganisme bermanfaat untuk tanah'
  },
  { 
    id: 8, 
    name: 'Fungisida Organik', 
    category: 'pestisida', 
    price: 'Rp 120.000', 
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop', 
    rating: 4.5,
    description: 'Pengendali penyakit tanaman yang aman dan efektif'
  }
];

// Testimonials Data
const testimonials = [
  { 
    id: 1, 
    name: 'Pak Darmawan', 
    role: 'Pemilik Lahan - Bogor', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', 
    text: 'Lahan saya yang sebelumnya tidur sekarang sudah produktif berkat pengelolaan Agromas. Pendapatan saya meningkat signifikan dengan sistem bagi hasil yang transparan.' 
  },
  { 
    id: 2, 
    name: 'Bu Sri Wahyuni', 
    role: 'Mitratani - Sumedang', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', 
    text: 'Sebagai mitra petani lokal, saya mendapatkan pendampingan langsung dari agronomis Agromas. Ilmu yang saya dapat sangat berharga untuk masa depan pertanian saya.' 
  },
  { 
    id: 3, 
    name: 'Pak Hendra', 
    role: 'Investor - Jakarta', 
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', 
    text: 'Investasi di sektor pertanian bersama Agromas memberikan return yang menarik dengan laporan progress yang transparan dan terukur.' 
  },
  { 
    id: 4, 
    name: 'Bu Ratna', 
    role: 'Pemilik Lahan - Megamendung', 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', 
    text: 'Proses kerjasama sangat profesional. Agromas mengelola lahan saya dengan baik dan saya mendapatkan laporan berkala tentang perkembangan budidaya.' 
  }
];

// Navigation Component
function Navigation({ isMenuOpen, toggleMenu, scrolled }: { isMenuOpen: boolean; toggleMenu: () => void; scrolled: boolean }) {
  return (
    <>
      <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#a855f7] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-6 h-6 text-[#0a0f1a]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-[#f0f4ff] leading-tight">Agro Mandala</span>
                <span className="gradient-text text-xs font-medium tracking-wider">SINERGI</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#beranda" className="nav-link text-[#b4c6e7] hover:text-[#f0f4ff] transition-colors font-medium">Beranda</a>
              <a href="#tentang" className="nav-link text-[#b4c6e7] hover:text-[#f0f4ff] transition-colors font-medium">Tentang</a>
              <a href="#layanan" className="nav-link text-[#b4c6e7] hover:text-[#f0f4ff] transition-colors font-medium">Layanan</a>
              <a href="#proyek" className="nav-link text-[#b4c6e7] hover:text-[#f0f4ff] transition-colors font-medium">Proyek</a>
              <a href="#produk" className="nav-link text-[#b4c6e7] hover:text-[#f0f4ff] transition-colors font-medium">Produk</a>
              <a href="#kontak" className="btn-primary text-sm">Hubungi Kami</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu} 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d9ff] rounded-lg" 
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-[#f0f4ff] transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-[#f0f4ff] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-[#f0f4ff] transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed inset-0 z-40 glass lg:hidden ${isMenuOpen ? 'active' : ''}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <a href="#beranda" onClick={toggleMenu} className="text-2xl font-display text-[#f0f4ff] hover:text-[#00d9ff] transition-colors">Beranda</a>
          <a href="#tentang" onClick={toggleMenu} className="text-2xl font-display text-[#f0f4ff] hover:text-[#00d9ff] transition-colors">Tentang</a>
          <a href="#layanan" onClick={toggleMenu} className="text-2xl font-display text-[#f0f4ff] hover:text-[#00d9ff] transition-colors">Layanan</a>
          <a href="#proyek" onClick={toggleMenu} className="text-2xl font-display text-[#f0f4ff] hover:text-[#00d9ff] transition-colors">Proyek</a>
          <a href="#produk" onClick={toggleMenu} className="text-2xl font-display text-[#f0f4ff] hover:text-[#00d9ff] transition-colors">Produk</a>
          <a href="#kontak" onClick={toggleMenu} className="btn-primary text-lg mt-4">Hubungi Kami</a>
        </div>
      </div>
    </>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center pt-20 grid-overlay">
      {/* Floating Decorations */}
      <div className="absolute top-32 left-10 w-20 h-20 opacity-20 leaf-float">
        <svg viewBox="0 0 24 24" fill="#00d9ff">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
        </svg>
      </div>
      <div className="absolute bottom-32 right-10 w-16 h-16 opacity-15 leaf-float-delay">
        <svg viewBox="0 0 24 24" fill="#a855f7">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1e3a5f] bg-[#111c2e]/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse"></span>
              <span className="text-sm text-[#b4c6e7]">Farm Management Service</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight reveal" style={{ transitionDelay: '0.1s' }}>
              Layanan<br/>
              <span className="gradient-text">Pengelolaan</span><br/>
              Lahan
            </h1>
            
            <p className="text-lg text-[#b4c6e7] max-w-xl leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
              Optimalisasi Produktivitas Lahan dengan Praktik Pertanian Terintegrasi dan Berkelanjutan
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 reveal" style={{ transitionDelay: '0.3s' }}>
              <a href="#layanan" className="btn-primary text-center">Lihat Layanan</a>
              <a href="#tentang" className="btn-secondary text-center">Pelajari Lebih Lanjut</a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative reveal-scale" style={{ transitionDelay: '0.4s' }}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] rotating-border">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/30 to-[#a855f7]/20 hero-img-overlay"></div>
              <Image 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=800&fit=crop" 
                alt="Pengelolaan Lahan Pertanian" 
                fill
                className="object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent"></div>
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-6 shadow-2xl reveal-left card-shine" style={{ transitionDelay: '0.6s' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#0891b2] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#0a0f1a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold stat-number">40+</div>
                  <div className="text-sm text-[#6b7fa3]">Hektar Dikelola</div>
                </div>
              </div>
            </div>

            {/* Stats Card 2 */}
            <div className="absolute -top-4 -right-4 glass rounded-2xl p-5 shadow-2xl reveal-right card-shine" style={{ transitionDelay: '0.7s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0a0f1a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold stat-number">3+</div>
                  <div className="text-xs text-[#6b7fa3]">Lokasi Proyek</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-[#6b7fa3]">Scroll</span>
        <svg className="w-5 h-5 text-[#00d9ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="tentang" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* About Image */}
          <div className="relative reveal-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square card-hover">
                  <Image 
                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop" 
                    alt="Petani" 
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#00d9ff] to-[#0891b2] flex items-center justify-center morph-bg">
                  <div className="text-center p-6">
                    <div className="text-4xl font-bold text-[#0a0f1a]">100%</div>
                    <div className="text-sm text-[#0a0f1a]/80">Praktik Berkelanjutan</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] card-hover">
                  <Image 
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop" 
                    alt="Hasil panen" 
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square card-hover">
                  <Image 
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=400&fit=crop" 
                    alt="Pertanian" 
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6 reveal-right">
            <div className="inline-block px-4 py-1 rounded-full border border-[#00d9ff] text-[#00d9ff] text-sm font-medium">
              Tentang Kami
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Solusi Pertanian<br/>
              <span className="gradient-text">Terintegrasi</span>
            </h2>
            <p className="text-[#b4c6e7] leading-relaxed">
              Banyak lahan pertanian atau lahan tidur milik pribadi atau perusahaan yang tidak atau kurang produktif dikarenakan kondisi tanah yang terdegradasi, praktik pertanian yang tidak optimal, dan kurangnya tenaga tani yang kompeten dan berpengalaman.
            </p>
            <p className="text-[#b4c6e7] leading-relaxed">
              <strong className="text-[#f0f4ff]">Agromas</strong> hadir untuk memberikan solusi melalui layanan manajemen pertanian yang terintegrasi. Kami mengambil alih operasional harian di lapangan, memastikan efisiensi dan produktivitas tinggi, sekaligus membuka peluang bagi Mitra untuk mendapatkan penghasilan yang lebih produktif.
            </p>

            {/* Goals */}
            <div className="grid sm:grid-cols-1 gap-4 pt-4">
              <div className="flex items-start gap-3 glass rounded-xl p-4 card-hover card-shine">
                <div className="w-10 h-10 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#00d9ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#f0f4ff]">Optimalisasi Produktivitas dan Keuntungan</h4>
                  <p className="text-sm text-[#6b7fa3]">Pengelolaan lahan dengan maksimal untuk meningkatkan produktivitas dan pendapatan melalui efisiensi operasional.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 glass rounded-xl p-4 card-hover card-shine">
                <div className="w-10 h-10 rounded-lg bg-[#a855f7]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#a855f7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#f0f4ff]">Praktik Pertanian Berkelanjutan</h4>
                  <p className="text-sm text-[#6b7fa3]">Penerapan budidaya pertanian berkelanjutan melalui benih berkualitas dan saprotan organik.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 glass rounded-xl p-4 card-hover card-shine">
                <div className="w-10 h-10 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#10b981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#f0f4ff]">Pemberdayaan Ekonomi Masyarakat</h4>
                  <p className="text-sm text-[#6b7fa3]">Pelibatan masyarakat dan petani lokal dalam proses budidaya untuk menggerakkan ekonomi setempat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .stagger-children');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="layanan" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-block px-4 py-1 rounded-full border border-[#00d9ff] text-[#00d9ff] text-sm font-medium mb-4">
            Layanan Kami
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Solusi Pertanian<br/>
            <span className="gradient-text">Terintegrasi</span>
          </h2>
          <p className="text-[#b4c6e7]">
            Agromas mengembangkan model pertanian hulu yang terintegrasi mulai dari penyediaan benih dan saprotan berkualitas hingga penyaluran hasil budidaya ke pasar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {services.map((service, index) => (
            <div key={index} className="group glass rounded-2xl p-6 card-hover card-shine">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <div className="text-[#0a0f1a]">{service.icon}</div>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-[#b4c6e7] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Implementation Notes */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 reveal">
          <div className="glass rounded-2xl p-6 card-hover">
            <h4 className="font-display text-lg font-bold mb-4 gradient-text">Catatan Teknis Implementasi</h4>
            <ul className="space-y-3 text-[#b4c6e7] text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#00d9ff] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Agromas mengalokasikan agronomis di masing-masing lokasi untuk pengawasan dan pendampingan.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#00d9ff] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Pelaporan progress secara berkala yang aksesnya diberikan pada setiap Mitra.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#00d9ff] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Penempatan petani setempat sebagai mitra dengan bagi hasil atau upah harian.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#00d9ff] to-[#a855f7] rounded-2xl p-6 card-hover relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-30"></div>
            <h4 className="font-display text-lg font-bold mb-4 text-[#0a0f1a] relative z-10">Skema Kerjasama</h4>
            <p className="text-[#0a0f1a]/90 text-sm mb-4 relative z-10">
              Investasi bersama (Joint Investment) dengan sistem bagi hasil yang transparan dan terukur.
            </p>
            <ul className="space-y-2 text-[#0a0f1a]/80 text-sm relative z-10">
              <li>• Mitra menyediakan lahan</li>
              <li>• Agromas mengelola operasional</li>
              <li>• Bagi hasil sesuai kesepakatan</li>
              <li>• Laporan berkala dan transparan</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .stagger-children');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="proyek" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-block px-4 py-1 rounded-full border border-[#00d9ff] text-[#00d9ff] text-sm font-medium mb-4">
            Portofolio Proyek
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Proyek<br/>
            <span className="gradient-text">Budidaya</span>
          </h2>
          <p className="text-[#b4c6e7]">
            Beberapa proyek budidaya yang sedang dikelola oleh Agromas di berbagai lokasi
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {projects.map((project, index) => (
            <div key={index} className="product-card group glass rounded-2xl overflow-hidden card-hover card-shine">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-[#00d9ff]">
                  {project.area}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#f0f4ff] mb-2 group-hover:text-[#00d9ff] transition-colors">{project.name}</h3>
                <div className="flex items-center gap-4 text-sm text-[#6b7fa3]">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                    </svg>
                    {project.crop}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Products Section
function ProductsSection() {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .stagger-children');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="produk" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-block px-4 py-1 rounded-full border border-[#00d9ff] text-[#00d9ff] text-sm font-medium mb-4">
            Produk Unggulan
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sarana Produksi<br/>
            <span className="gradient-text">Berkualitas</span>
          </h2>
          <p className="text-[#b4c6e7]">
            Temukan berbagai produk pertanian berkualitas untuk mendukung keberhasilan budidaya Anda
          </p>
        </div>

        {/* Product Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal" style={{ transitionDelay: '0.1s' }}>
          {['all', 'benih', 'pupuk', 'pestisida'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all border border-[#1e3a5f] ${filter === cat ? 'active' : 'hover:border-[#00d9ff] hover:text-[#00d9ff]'}`}
            >
              {cat === 'all' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group glass rounded-2xl overflow-hidden card-hover card-shine">
              <div className="relative aspect-square overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-[#00d9ff]">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <svg className="w-4 h-4 text-[#f59e0b]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm text-[#b4c6e7]">{product.rating}</span>
                </div>
                <h3 className="font-semibold text-[#f0f4ff] mb-1 group-hover:text-[#00d9ff] transition-colors">{product.name}</h3>
                <p className="text-xs text-[#6b7fa3] mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold gradient-text">{product.price}</span>
                  <button className="w-10 h-10 rounded-full border border-[#1e3a5f] flex items-center justify-center text-[#6b7fa3] hover:border-[#00d9ff] hover:text-[#00d9ff] hover:bg-[#00d9ff]/10 transition-all" aria-label="Add to cart">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            entry.target.classList.add('active');
            setAnimated(true);
            
            // Animate stat numbers
            const statNumbers = entry.target.querySelectorAll('[data-target]');
            statNumbers.forEach((stat) => {
              const target = parseInt(stat.getAttribute('data-target') || '0');
              let current = 0;
              const increment = target / 50;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                const suffix = stat.getAttribute('data-suffix') || '+';
                stat.textContent = Math.floor(current) + suffix;
              }, 30);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <section className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          <div className="text-center glass rounded-2xl p-6 card-hover">
            <div className="text-5xl lg:text-6xl font-bold stat-number mb-2" data-target="40" data-suffix="+ Ha">0</div>
            <div className="text-[#b4c6e7]">Lahan Dikelola</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 card-hover">
            <div className="text-5xl lg:text-6xl font-bold stat-number mb-2" data-target="3" data-suffix="+">0</div>
            <div className="text-[#b4c6e7]">Lokasi Proyek</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 card-hover">
            <div className="text-5xl lg:text-6xl font-bold stat-number mb-2" data-target="50" data-suffix="+">0</div>
            <div className="text-[#b4c6e7]">Mitratani</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 card-hover">
            <div className="text-5xl lg:text-6xl font-bold stat-number mb-2" data-target="100" data-suffix="%">0</div>
            <div className="text-[#b4c6e7]">Praktik Berkelanjutan</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const maxSlide = Math.max(0, testimonials.length - 3);

  const updateSlider = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.clientWidth + 24 || 0;
      sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  };

  useEffect(() => {
    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [currentSlide]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-block px-4 py-1 rounded-full border border-[#00d9ff] text-[#00d9ff] text-sm font-medium mb-4">
            Testimoni
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Apa Kata<br/>
            <span className="gradient-text">Mitra Kami</span>
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden reveal" style={{ transitionDelay: '0.2s' }}>
          <div ref={sliderRef} className="flex gap-6 transition-transform duration-500">
            {testimonials.map((t) => (
              <div key={t.id} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] glass rounded-2xl p-8 card-hover card-shine">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#f59e0b]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[#b4c6e7] mb-6 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <Image 
                    src={t.image} 
                    alt={t.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[#f0f4ff]">{t.name}</div>
                    <div className="text-sm text-[#6b7fa3]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button 
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="w-10 h-10 rounded-full border border-[#1e3a5f] flex items-center justify-center text-[#6b7fa3] hover:border-[#00d9ff] hover:text-[#00d9ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={() => setCurrentSlide(Math.min(maxSlide, currentSlide + 1))}
              disabled={currentSlide >= maxSlide}
              className="w-10 h-10 rounded-full border border-[#1e3a5f] flex items-center justify-center text-[#6b7fa3] hover:border-[#00d9ff] hover:text-[#00d9ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Next"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section id="kontak" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff] via-[#0891b2] to-[#a855f7]"></div>
          <div className="absolute inset-0 shimmer opacity-20"></div>
          
          {/* Content */}
          <div className="relative z-10 p-12 md:p-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#0a0f1a]">
              Siap Memulai<br/>Kerjasama?
            </h2>
            <p className="text-[#0a0f1a]/80 max-w-xl mx-auto mb-8">
              Hubungi kami untuk konsultasi gratis dan temukan bagaimana Agromas dapat membantu mengoptimalkan lahan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:info@agromas.id" className="bg-[#0a0f1a] text-[#00d9ff] px-8 py-4 rounded-xl font-semibold hover:bg-[#0a0f1a]/90 transition-all hover:scale-105 hover:shadow-lg">
                Hubungi Kami
              </a>
              <a href="#layanan" className="border-2 border-[#0a0f1a] text-[#0a0f1a] px-8 py-4 rounded-xl font-semibold hover:bg-[#0a0f1a] hover:text-[#00d9ff] transition-all">
                Pelajari Layanan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-[#1e3a5f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#a855f7] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-[#0a0f1a]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-[#f0f4ff] leading-tight">Agro Mandala</span>
                <span className="gradient-text text-xs font-medium tracking-wider">SINERGI</span>
              </div>
            </a>
            <p className="text-[#6b7fa3] text-sm leading-relaxed mb-6">
              Layanan Pengelolaan Lahan dengan Praktik Pertanian Terintegrasi dan Berkelanjutan.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg border border-[#1e3a5f] flex items-center justify-center text-[#6b7fa3] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-[#1e3a5f] flex items-center justify-center text-[#6b7fa3] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-[#1e3a5f] flex items-center justify-center text-[#6b7fa3] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-[#f0f4ff]">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li><a href="#beranda" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Tentang Kami</a></li>
              <li><a href="#layanan" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Layanan</a></li>
              <li><a href="#proyek" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Proyek</a></li>
              <li><a href="#produk" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Produk</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-[#f0f4ff]">Layanan</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Nursery House</a></li>
              <li><a href="#" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Agro Input</a></li>
              <li><a href="#" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Agro Farm</a></li>
              <li><a href="#" className="text-[#6b7fa3] hover:text-[#00d9ff] transition-colors">Offtaking Produce</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-[#f0f4ff]">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00d9ff] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-[#6b7fa3] text-sm">Ruko Permata Yasmin 15, Jl. Brigjen Saptadji Hadiprawira No.142, Bogor, Jawa Barat 16112</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#00d9ff] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="text-[#6b7fa3] text-sm">+62 xxx-xxxx-xxxx</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#00d9ff] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-[#6b7fa3] text-sm">info@agromas.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#1e3a5f] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#6b7fa3] text-sm">
            2025 PT. Agro Mandala Sinergi. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#6b7fa3] text-sm hover:text-[#00d9ff] transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-[#6b7fa3] text-sm hover:text-[#00d9ff] transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} scrolled={scrolled} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProductsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
