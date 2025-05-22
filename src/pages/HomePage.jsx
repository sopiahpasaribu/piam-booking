import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import { useNavigate } from "react-router-dom";
import { Hotel } from 'lucide-react';
import BookingModal from "../components/BookingModal"; // Make sure to import BookingModal

const hotels = [
  {
    id: 1,
    nama: "Hotel Indonesia Kempinski",
    alamat: "Jl. MH Thamrin No. 1, Jakarta Pusat",
    jumlahKamar: 289,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Spa", "Pusat Kebugaran"],
    rating: 4.9,
    hargaPerMalam: 3200000,
    kamarTersedia: 50,
    gambar : "https://images.trvl-media.com/lodging/2000000/1950000/1942700/1942665/c71c3d95.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    tipeKamar: [
      {
        nama: "Superior Room",
        harga: 3200000,
        fasilitas: ["Wi-Fi", "TV Kabel", "Mini Bar", "AC"]
      },
      {
        nama: "Deluxe Room",
        harga: 4500000,
        fasilitas: ["Wi-Fi", "Kolam Renang Pribadi", "Spa", "Pemandangan Kota"]
      },
      {
        nama: "Executive Suite",
        harga: 6000000,
        fasilitas: ["Wi-Fi", "Spa", "Kolam Renang Pribadi", "Balkon", "TV OLED"]
      }
    ]
  }, 
  {
    id: 2,
    nama: "Padma Hotel Bandung",
    alamat: "Jl. Ranca Bentang No. 56-58, Ciumbuleuit, Bandung",
    jumlahKamar: 124,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Restoran", "Taman Bermain Anak"],
    rating: 4.8,
    hargaPerMalam: 2500000,
    kamarTersedia: 20,
    gambar: "https://padmahotelbandung.com/images/content/home-aerial.jpg",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 2500000,
        fasilitas: ["Wi-Fi", "TV", "Mini Bar"]
      },
      {
        nama: "Family Room",
        harga: 3500000,
        fasilitas: ["Wi-Fi", "Kolam Renang", "Tempat Tidur King", "Dapur Mini"]
      }
    ]
  },
  {
    id: 3,
    nama: "The Ritz-Carlton Bali",
    alamat: "Jl. Raya Nusa Dua Selatan Lot III, Bali",
    jumlahKamar: 313,
    fasilitas: ["Wi-Fi", "Pantai Pribadi", "Kolam Renang", "Spa"],
    rating: 4.9,
    hargaPerMalam: 4500000,
    kamarTersedia: 40,
    gambar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/03/e7/78/exterior.jpg?w=700&h=-1&s=1",
    tipeKamar: [
      {
        nama: "Ocean View Room",
        harga: 4500000,
        fasilitas: ["Wi-Fi", "Pemandangan Laut", "Balkon Pribadi"]
      },
      {
        nama: "Villas",
        harga: 8000000,
        fasilitas: ["Kolam Renang Pribadi", "Spa", "Pemandangan Laut", "TV 4K"]
      }
    ]
  },
  {
    id: 4,
    nama: "JW Marriott Hotel Surabaya",
    alamat: "Jl. Embong Malang No. 85-89, Surabaya",
    jumlahKamar: 407,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Pusat Kebugaran", "Bar"],
    rating: 4.7,
    hargaPerMalam: 2000000,
    kamarTersedia: 30,
    gambar: "https://id.jwmarriottsurabaya.com/resourcefiles/home-content-section-image/jw-marriott-surabaya-facade.jpg?version=11052024081947",
    tipeKamar: [
      {
        nama: "Deluxe Room",
        harga: 2000000,
        fasilitas: ["Wi-Fi", "AC", "Mini Bar", "TV Kabel"]
      },
      {
        nama: "Marriott Suite",
        harga: 4500000,
        fasilitas: ["Spa", "Kolam Renang", "Balkon", "TV OLED"]
      }
    ]
  },
  {
    id: 5,
    nama: "The Phoenix Hotel Yogyakarta",
    alamat: "Jl. Jenderal Sudirman No. 9, Yogyakarta",
    jumlahKamar: 144,
    fasilitas: ["Wi-Fi", "Restoran", "Spa", "Kolam Renang"],
    rating: 4.6,
    hargaPerMalam: 1500000,
    kamarTersedia: 25,
    gambar: "https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg",
    tipeKamar: [
      {
        nama: "Superior Room",
        harga: 1500000,
        fasilitas: ["Wi-Fi", "AC", "TV Kabel"]
      },
      {
        nama: "Deluxe Room",
        harga: 2000000,
        fasilitas: ["Kolam Renang", "Mini Bar", "Balkon"]
      },
      {
        nama: "Royal Suite",
        harga: 3500000,
        fasilitas: ["Spa", "Kolam Renang Pribadi", "Pemandangan Kota"]
      }
    ]
  },
  {
    id: 6,
    nama: "Harris Hotel & Conventions Malang",
    alamat: "Jl. A. Yani Utara Riverside Blok C No. 1, Malang",
    jumlahKamar: 229,
    fasilitas: ["Wi-Fi", "Restoran", "Kolam Renang", "Pusat Kebugaran", "Spa"],
    rating: 4.5,
    hargaPerMalam: 900000,
    kamarTersedia: 50,
    gambar: "https://pix10.agoda.net/hotelImages/408/408193/408193_16042513020041769119.jpg?ca=6&ce=1&s=414x232",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 900000,
        fasilitas: ["Wi-Fi", "AC", "TV Kabel"]
      },
      {
        nama: "Family Suite",
        harga: 1500000,
        fasilitas: ["Kolam Renang", "Balkon", "Tempat Tidur King"]
      }
    ]
  },
];
const HomePage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [roomsToBook, setRoomsToBook] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  
  const navigate = useNavigate();

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
  };

const handleBooking = (e) => {
  e.preventDefault();
  
  if (!selectedRoomType) {
    alert("Please select a room type");
    return;
  }

  const bookingData = {
    hotel: selectedHotel.nama,
    hotelAddress: selectedHotel.alamat, // Added hotel address
    hotelImage: selectedHotel.gambar,
    roomType: selectedRoomType,
    price: selectedRoomType.harga * roomsToBook,
    checkInDate,
    checkOutDate,
    guestName,
    guestEmail,
    roomsToBook,
    status: "Confirmed",
    bookingDate: new Date().toISOString() // Add booking date
  };
  
  // Save to localStorage with key 'order' (to match MyOrdersPage)
  const existingOrders = JSON.parse(localStorage.getItem('order') || '[]');
  const updatedOrders = [...existingOrders, bookingData];
  localStorage.setItem('order', JSON.stringify(updatedOrders));
  
  navigate("/my-orders");
};
  const handleOpenBookingModal = () => {
    setShowModal(true);
    // Set default room type when opening modal
    if (selectedHotel?.tipeKamar?.length > 0) {
      setSelectedRoomType(selectedHotel.tipeKamar[0]);
    }
  };

  return (
    <div className="app">
      <Header />


      
<section className="home-section">
  <img 
    src="https://images.pexels.com/photos/3201762/pexels-photo-3201762.jpeg" 
    alt="Luxury hotel background"
    onError={(e) => {
      e.target.onerror = null; 
      e.target.src = "https://via.placeholder.com/1920x1080?text=Hotel+Background"; // Fallback image
    }}
  />
  <div className="home-content">
    <h1>Your Dream Luxurious Hotel Room</h1>
    <p>Experience the best hospitality in Indonesia.</p>
  </div>
</section>



      <section className="promo-section">
        <h2 className="promo-title">Kode Promo Hotel 🔔✨</h2>
        <p className="promo-subtitle">Manfaatkan promo untuk perjalanan lokal Anda!</p>
        <div className="promo-cards">
          <div className="promo-card">
            <span className="promo-badge">Hotel Lokal</span>
            <h3 className="promo-heading">Diskon untuk Staycation</h3>
            <p className="promo-description">
              Nikmati diskon 10% hingga Rp500rb untuk staycation di seluruh Indonesia!
            </p>
            <div className="promo-code">
              <span className="code">STAYDIINDO</span>
              <button className="copy-button">Copy</button>
            </div>
          </div>
          <div className="promo-card">
            <span className="promo-badge">Weekend</span>
            <h3 className="promo-heading">Promo Akhir Pekan</h3>
            <p className="promo-description">
              Dapatkan potongan harga Rp200rb untuk pemesanan di hari Sabtu & Minggu.
            </p>
            <div className="promo-code">
              <span className="code">AKHIRPEKAN</span>
              <button className="copy-button">Copy</button>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="hotels">
          <h4>POPULAR HOTELS</h4>
          <div className="hotel-cards">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        <div className="promo-banner">
          <div className="promo-content">
            <div className="promo-text">
              <h2>Bayar di Hotel</h2>
              <p>
                Pastikan dapat kamar terbaik dari jauh-jauh hari, bayarnya bisa nanti. Keuangan terkendali, liburan pasti jadi!
              </p>
              <button className="cta-button" onClick={() => navigate('/booking')}>
                Pesan Sekarang
              </button>
            </div>
            <div className="promo-illustration">
              <img
                src="bayar-removebg-preview.png"  
                alt="Bayar di Hotel"
                className="promo-image"
              />
            </div>
          </div>
        </div>
      </main>

      {selectedHotel && !showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedHotel.nama}</h2>
            <img
              src={selectedHotel.gambar}
              alt={selectedHotel.nama}
              className="modal-image"
            />
            <p>{selectedHotel.alamat}</p>
            <p>Rating: {selectedHotel.rating}</p>
            <p>Fasilitas: {selectedHotel.fasilitas.join(", ")}</p>
            <p>Harga per malam: Rp {selectedHotel.hargaPerMalam.toLocaleString()}</p>
            <p>Kamar tersedia: {selectedHotel.kamarTersedia}</p>
            <button className="booking-button" onClick={handleOpenBookingModal}>
              Booking
            </button>
          </div>
        </div>
      )}

      {showModal && selectedHotel && (
        <BookingModal
          selectedHotel={selectedHotel}
          closeModal={closeModal}
          handleBooking={handleBooking}
          guestName={guestName}
          setGuestName={setGuestName}
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
          roomsToBook={roomsToBook}
          setRoomsToBook={setRoomsToBook}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          selectedRoomType={selectedRoomType}
          setSelectedRoomType={setSelectedRoomType}
          // Removed facilityIcons as it wasn't defined
        />
      )}

      <Footer />
    </div>
  );
};

export default HomePage;