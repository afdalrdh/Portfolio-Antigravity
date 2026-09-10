// Published & verified testimonials list
// Only approved testimonials appear publicly.
export const publishedTestimonials = [
  /* 
  Uncomment or insert verified testimonials here once approved:
  {
    id: "testi-1",
    clientName: "Bapak Erwan",
    projectTitle: "The Old Heritage Rumah Hunian",
    location: "Bandung",
    rating: 5,
    quote: "Proyek berjalan sangat rapi dan komunikatif...",
    date: "2025"
  }
  */
];

export const submitTestimonialLocal = (newTestimonial) => {
  console.log("Testimonial submitted for review:", newTestimonial);
  return {
    success: true,
    message: "Terima kasih! Ulasan Anda telah diterima dan akan ditampilkan setelah proses verifikasi tim."
  };
};
