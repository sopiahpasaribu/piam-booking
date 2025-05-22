import React from "react";
import { Facebook, Instagram, Mail, Phone, MapPin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Kolom Informasi Hotel */}
        <div className="footer-row">
          <div className="footer-col">
            <h3>PIAM BOOKING</h3>
            <p>
              Temukan pengalaman menginap terbaik dengan fasilitas dan layanan
              kelas dunia. Pesan hotel favoritmu sekarang juga!
            </p>
            <p>
              <MapPin size={20} /> Jalan Merdeka No. 123, Bandung
            </p>
            <p>
              <Phone size={20} /> +62 831-3591-0632
            </p>
            <p>
              <Mail size={20} /> support@piambooking.com
            </p>
          </div>

          {/* Kolom Navigasi */}
          <div className="footer-col">
            <h3>Navigation</h3>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/rooms">Rooms</a>
              </li>
              <li>
                <a href="/facilities">Facilities</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
            </ul>
          </div>

          {/* Kolom Sosial Media */}
          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Kolom Form Subscribe */}
          <div className="footer-col">
            <h3>Subscribe</h3>
            <p>Dapatkan penawaran terbaik dan diskon langsung di inbox Anda.</p>
            <form className="footer-form">
              <input type="email" placeholder="Masukkan email Anda" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Footer Bawah */}
        <hr />
        <div className="footer-bottom">
          <p>&copy; 2024 PIAM BOOKING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
