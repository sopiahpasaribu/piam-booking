import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="about-container">
          <h1 className="about-title">Tentang PIAM Booking</h1>
          <p className="about-description">
            Selamat datang di <strong>PIAM Booking</strong>, platform pemesanan hotel terbaik di Indonesia! <br />
            Booking sekarang bayar nanti! <br />
             Kami hadir untuk membantu Anda menemukan dan memesan hotel terbaik dengan mudah, cepat, dan nyaman.
          </p>
          <br />
          <hr />
          </div>
                <section class="why-book">
            <h2 class="section-title">Mengapa Booking Hotel & Penginapan di PIAM Booking?</h2>
            <br />
            <br />
            <div class="feature-cards">
              <div class="feature-card">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/01/12/1673542640422-9a3789c88a9f75ed02759fbfa527de9c.png?tr=h-150,q-75,w-150" alt="Icon 1" class="feature-icon" />
                <h3>Beragam Pilihan Akomodasi</h3>
                <p>Pilihan hotel, villa, resort, apartemen, glamping, dari budget hingga mewah tersedia untukmu!</p>
              </div>
              <div class="feature-card">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/01/12/1673542741584-daafb45d930923e3d1a5118b6b990467.png?tr=h-150,q-75,w-150" alt="Icon 2" class="feature-icon" />
                <h3>Berbagai Cara Bayar Fleksibel dan Mudah</h3>
                <p>Kemudahan bertransaksi dengan Pay at Hotel, makin hemat dengan PayLater.</p>
              </div>
              <div class="feature-card">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/01/12/1673542801134-7e21cf6e98d7252fc0207d683a9bd690.png?tr=h-150,q-75,w-150" alt="Icon 3" class="feature-icon" />
                <h3>Program Loyalitas Pelanggan</h3>
                <p>Dapatkan manfaat dan layanan istimewa dari naik level di PIAM Priority.</p>
              </div>
              <div class="feature-card">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/01/12/1673544329885-06dcf43879115ca17387c4ef9eed5f3c.png?tr=h-150,q-75,w-150" alt="Icon 4" class="feature-icon" />
                <h3>Semakin Nyaman dengan CleanAccommodation</h3>
                <p>Dengan implementasi protokol kesehatan sesuai standar pemerintah.</p>
              </div>
              <div class="feature-card">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/01/12/1673545535112-70dd8e84b5a96caf33281a2933d87971.webp?tr=h-150,q-75,w-150" alt="Icon 5" class="feature-icon" />
                <h3>Review Tamu Asli</h3>
                <p>Jutaan ulasan tamu asli terpercaya yang sudah memesan di PIAM Booking.</p>
              </div>
            </div>
          </section>

      <Footer />
    </>
  );
};

export default AboutPage;
