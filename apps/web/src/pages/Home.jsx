import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiShield, FiSliders, FiClock, FiMessageSquare } from 'react-icons/fi';
import Button from '../components/ui/Button';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import { projectsData } from '../data/projectsData';
import { servicesData, seoLandingServices } from '../data/servicesData';
import { articlesData } from '../data/articlesData';
import { publishedTestimonials } from '../data/testimonialsData';

export default function Home() {
  return (
    <>
      <SEOHead
        title="PT Arsi Karya Unggul — Membangun Tuntas, Unggul Dalam Kualitas"
        description="Jasa Kontraktor Umum, Design & Build (Arsitektur & Interior), Fabrikasi, dan Pengadaan Barang Terpercaya di Bandung. Membangun Tuntas, Unggul Dalam Kualitas."
      />

      {/* 01. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-neutral-700)',
          color: '#ffffff',
          paddingTop: 'calc(var(--header-height) + 40px)',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
      >
        {/* Background Video / Architectural Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            opacity: 0.35,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-poster.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/6179fd5c38ec05cd8ff9df2b_background_video-transcode.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ maxWidth: '820px' }}>
            <SectionTag light>PT ARSI KARYA UNGGUL</SectionTag>

            <h1
              style={{
                color: '#ffffff',
                marginBottom: '24px',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                lineHeight: 1.1,
              }}
            >
              Membangun Tuntas, <br />
              <span style={{ color: 'var(--color-primary-200)' }}>Unggul Dalam Kualitas</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.6,
                color: '#EFEFEA',
                marginBottom: '36px',
                maxWidth: '680px',
              }}
            >
              Perusahaan jasa konstruksi & <em>Design & Build</em> terintegrasi di Bandung. Kami mengedepankan proses terstruktur, eksekusi efisien, dan pengawasan kualitas presisi.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button to="/kontak" variant="primary" showArrow style={{ padding: '16px 32px' }}>
                Konsultasi Gratis
              </Button>
              <Button to="/proyek" variant="dark" style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '16px 32px' }}>
                Lihat Proyek
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 02. TRUST STRIP */}
      <section style={{ backgroundColor: 'var(--color-neutral-50)', padding: '36px 0', borderBottom: '1px solid var(--color-neutral-200)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            {[
              { title: "Proses Terstruktur", desc: "Alur kerja terencana tanpa spekulasi" },
              { title: "Kontrol Kualitas Ketat", desc: "Inspeksi material & konstruksi berkala" },
              { title: "Transparansi Biaya", desc: "RAB detail tanpa biaya tersembunyi" },
              { title: "Komunikasi Jelas", desc: "Laporan progres berkala untuk Anda" }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <FiCheckCircle style={{ color: 'var(--color-primary-300)', fontSize: '1.4rem', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2px' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-400)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. TAGLINE BANNER */}
      <section style={{ backgroundColor: 'var(--color-primary-300)', color: '#ffffff', padding: '54px 0', textTransform: 'uppercase' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="display-title" style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '0.04em', margin: 0 }}>
            “Membangun Tuntas, Unggul Dalam Kualitas”
          </h2>
        </div>
      </section>

      {/* 04. WHY ARSI KARYA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
            <SectionTag>NILAI KEUNGGULAN</SectionTag>
            <h2>Mengapa Memilih PT Arsi Karya Unggul?</h2>
            <p style={{ color: 'var(--color-neutral-400)', marginTop: '12px' }}>
              Komitmen kami adalah memberikan hasil bangunan berkualitas tinggi dengan eksekusi amanah dan profesional.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px',
            }}
          >
            {[
              { icon: <FiSliders />, title: "Proses Terstruktur", desc: "Setiap tahap perencanaan, desain, dan pembangunan dijalankan sesuai SOP standar konstruksi." },
              { icon: <FiClock />, title: "Eksekusi Efisien", desc: "Manajemen waktu dan tenaga ahli presisi untuk menjamin proyek selesai tepat jadwal." },
              { icon: <FiShield />, title: "Kontrol Kualitas", desc: "Pengawasan ketat spesifikasi bahan dan kerapian finishing hingga detail terkecil." },
              { icon: <FiMessageSquare />, title: "Komunikasi Jelas", desc: "Klien mendapatkan pembaruan berkala dan transparansi penuh di setiap progres lapangan." }
            ].map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-neutral-50)',
                  padding: '36px 28px',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-neutral-200)',
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    backgroundColor: 'var(--color-primary-100)',
                    color: 'var(--color-primary-300)',
                    borderRadius: 'var(--radius-control)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '20px',
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{pillar.title}</h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--color-neutral-400)', lineHeight: 1.6 }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. SERVICES OVERVIEW */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-50)', borderTop: '1px solid var(--color-neutral-200)', borderBottom: '1px solid var(--color-neutral-200)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
            <div>
              <SectionTag>LAYANAN UTAMA</SectionTag>
              <h2>Solusi Konstruksi Terpadu</h2>
            </div>
            <Button to="/layanan" variant="secondary">Lihat Semua Layanan</Button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '36px',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-neutral-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '14px', color: 'var(--color-neutral-700)' }}>{svc.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-neutral-400)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {svc.shortDesc}
                  </p>
                </div>
                <Button to={`/layanan/${svc.slug}`} variant="text" showArrow>
                  Detail Layanan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. FEATURED PROJECTS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
            <div>
              <SectionTag>PORTOFOLIO UNGGULAN</SectionTag>
              <h2>Pengalaman Proyek Terverifikasi</h2>
            </div>
            <Button to="/proyek" variant="secondary">Portofolio Lengkap</Button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {projectsData.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                style={{
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-neutral-200)',
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ height: '240px', backgroundColor: 'var(--color-neutral-200)', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(0,86,151,0.9)',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {proj.category}
                  </div>
                </div>

                <div style={{ padding: '28px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-400)', marginBottom: '8px' }}>
                    {proj.location} • {proj.year}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.3 }}>{proj.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-400)', fontStyle: 'italic', marginBottom: '20px' }}>
                    {proj.roleDisclosure}
                  </p>
                  <Button to={`/proyek/${proj.slug}`} variant="text" showArrow>
                    Lihat Detail Proyek
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07. HOW WE WORK (METHODOLOGY) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
            <SectionTag light>METODOLOGI KERJA</SectionTag>
            <h2 style={{ color: '#ffffff' }}>Alur Kerja Terstruktur & Transparan</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '32px',
            }}
          >
            {[
              { step: "01", title: "Konsultasi & Survey", desc: "Diskusi kebutuhan proyek, analisis lahan, dan penentuan indikatif anggaran." },
              { step: "02", title: "Desain & RAB Detail", desc: "Pembuatan sketsa 3D, gambar kerja teknis, dan Rencana Anggaran Biaya rinci." },
              { step: "03", title: "Eksekusi Lapangan", desc: "Pembangunan fisik dengan tim ahli dan pengawasan mutu material ketat." },
              { step: "04", title: "QC & Handover", desc: "Inspeksi akhir bersama klien, penerbitan BAST, dan garansi pemeliharaan." }
            ].map((st, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: '2px solid var(--color-primary-300)',
                  paddingLeft: '24px',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-primary-200)', marginBottom: '8px' }}>
                  {st.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>{st.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-300)', lineHeight: 1.6 }}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. SELECTED PROJECT EXPERIENCE MATRIX */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <SectionTag>REKAM JEJAK PROYEK</SectionTag>
            <h2>Pengalaman Proyek Terdaftar</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary-300)', color: '#ffffff', textAlign: 'left' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.9rem' }}>Nama Pekerjaan / Proyek</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.9rem' }}>Lokasi</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.9rem' }}>Tahun</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.9rem' }}>Keterangan Entitas Listed</th>
                </tr>
              </thead>
              <tbody>
                {projectsData.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.925rem' }}>{p.title}</td>
                    <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: 'var(--color-neutral-500)' }}>{p.location}</td>
                    <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: 'var(--color-neutral-500)' }}>{p.year}</td>
                    <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--color-neutral-400)', fontStyle: 'italic' }}>{p.roleDisclosure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 09. TESTIMONIALS (CMS READY) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
            <SectionTag>ULASAN KLIEN</SectionTag>
            <h2>Pengalaman Bekerjasama</h2>
          </div>

          {publishedTestimonials.length > 0 ? (
            <div>{/* Render published testimonials if present */}</div>
          ) : (
            <div
              style={{
                backgroundColor: 'var(--color-neutral-50)',
                padding: '48px',
                borderRadius: 'var(--radius-card)',
                textAlign: 'center',
                border: '1px border var(--color-neutral-200)',
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Komitmen Kualitas Tanpa Kompromi</h3>
              <p style={{ color: 'var(--color-neutral-400)', marginBottom: '24px', lineHeight: 1.6 }}>
                Kami mengutamakan integritas dan kepuasan nyata. Apakah Anda pernah bekerja sama dengan PT Arsi Karya Unggul? Bagikan pengalaman ulasan Anda bersama kami.
              </p>
              <Button to="/testimoni" variant="secondary">
                Kirimkan Ulasan Klien
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 10. SPECIALIZED SERVICES / SEO */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-50)', borderTop: '1px solid var(--color-neutral-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <SectionTag>SPESIALISASI LAINNYA</SectionTag>
            <h2>Layanan Spesialis & Renovasi</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {seoLandingServices.map((s, idx) => (
              <Link
                key={idx}
                to={`/layanan/${s.slug}`}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '24px',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-neutral-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-neutral-700)' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-400)', lineHeight: 1.5 }}>{s.shortDesc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary-300)', fontWeight: 700, fontSize: '0.85rem', marginTop: '16px' }}>
                  <span>Detail</span> <FiArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ARTICLES & INSIGHTS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
            <div>
              <SectionTag>ARTIKEL & EDUKASI</SectionTag>
              <h2>Wawasan Konstruksi & Desain</h2>
            </div>
            <Button to="/artikel" variant="secondary">Baca Semua Artikel</Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {articlesData.slice(0, 3).map((art) => (
              <div
                key={art.id}
                style={{
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-neutral-200)',
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ height: '200px', backgroundColor: 'var(--color-neutral-200)', overflow: 'hidden' }}>
                  <img src={art.thumbnail} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-primary-300)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                    {art.category} • {art.date}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', lineHeight: 1.4 }}>{art.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-400)', lineHeight: 1.6, marginBottom: '20px' }}>{art.excerpt}</p>
                  <Button to={`/artikel/${art.slug}`} variant="text" showArrow>
                    Baca Selengkapnya
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONSULTATION BANNER */}
      <section style={{ backgroundColor: 'var(--color-primary-300)', color: '#ffffff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionTag light>KONSULTASI PROYEK</SectionTag>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '20px' }}>
            Konsultasi gratis! Klik link dibawah ini
          </h2>
          <p style={{ color: '#EAF4FA', fontSize: '1.1rem', marginBottom: '36px' }}>
            Diskusikan rencana pembangunan rumah, renovasi, atau proyek konstruksi Anda bersama tim ahli PT Arsi Karya Unggul.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button
              href="https://wa.me/628997932802?text=Hallo%20Arsi%20Karya,%20saya%20ingin%20konsultasi%20mengenai%20rencana%20proyek%20saya."
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              style={{ padding: '16px 36px', fontSize: '1.05rem' }}
            >
              Chat WhatsApp (+62 899-7932-802)
            </Button>
            <Button to="/kontak" variant="dark" style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '16px 36px', fontSize: '1.05rem' }}>
              Isi Formulir Konsultasi
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
