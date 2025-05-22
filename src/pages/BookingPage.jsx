import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import hotels from "../data/HotelData";
import BookingModal from "../components/BookingModal";
// import { Search, Star, ChevronDown, Sliders, Info } from "lucide-react";
import { 
  Search, 
  Star, 
  Sliders, 
  Info, 
  Wifi,
  SwimmingPool,
  Spa,
  Dumbbell,
  Utensils,
  ParkingCircle,
  Snowflake,
  Tv,
  Coffee,
  ConciergeBell
} from "lucide-react";

 // Facility icons mapping
const facilityIcons = {
  "Wi-Fi": <Wifi size={18} />,
  "Kolam Renang": <SwimmingPool size={18} />,
  "Spa": <Spa size={18} />,
  "Gym": <Dumbbell size={18} />,
  "Restoran": <Utensils size={18} />,
  "Parkir Gratis": <ParkingCircle size={18} />,
  "AC": <Snowflake size={18} />,
  "TV": <Tv size={18} />,
  "Sarapan Gratis": <Coffee size={18} />,
  "Room Service": <ConciergeBell size={18} />
};


const BookingPage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedHotelId, setExpandedHotelId] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [roomsToBook, setRoomsToBook] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [sortBy, setSortBy] = useState("hargaTermurah");

  const navigate = useNavigate();

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const toggleHotelDetails = (hotelId) => {
    if (expandedHotelId === hotelId) {
      setExpandedHotelId(null);
    } else {
      setExpandedHotelId(hotelId);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);
    
    if (checkOutDateObj <= checkInDateObj) {
      alert("Check-out date must be after check-in date");
      return;
    }

    const numberOfDays = Math.ceil((checkOutDateObj - checkInDateObj) / (1000 * 3600 * 24));
    const totalPrice = selectedRoomType.harga * roomsToBook * numberOfDays;

    const storedOrders = JSON.parse(localStorage.getItem("order")) || [];
    const newOrder = {
      guestName,
      guestEmail,
      hotel: selectedHotel.nama,
      hotelImage: selectedHotel.gambar,
      hotelAddress: selectedHotel.alamat,
      roomType: {
        nama: selectedRoomType.nama,
        harga: selectedRoomType.harga,
        fasilitas: selectedRoomType.fasilitas
      },
      roomsToBook,
      checkInDate,
      checkOutDate,
      totalPrice: totalPrice,
      bookingDate: new Date().toISOString(),
      numberOfDays: numberOfDays
    };

    const updatedOrders = [...storedOrders, newOrder];
    localStorage.setItem("order", JSON.stringify(updatedOrders));

    setGuestName("");
    setGuestEmail("");
    setRoomsToBook(1);
    setCheckInDate("");
    setCheckOutDate("");
    setSelectedRoomType({});

    navigate("/my-orders");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
  };

  const filteredHotels = hotels
    .filter((hotel) => hotel.nama.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((hotel) => selectedRating ? hotel.rating >= selectedRating : true)
    .filter((hotel) => selectedFacility ? hotel.fasilitas.includes(selectedFacility) : true)
    .sort((a, b) => {
      if (sortBy === "hargaTermurah") return a.hargaPerMalam - b.hargaPerMalam;
      if (sortBy === "hargaTermahal") return b.hargaPerMalam - a.hargaPerMalam;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="app">
      <Header />
      <section className="booking-section">
        <div className="search-bar">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Cari hotel..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label><Star className="icon" /> Rating:</label>
            <select value={selectedRating} onChange={(e) => setSelectedRating(Number(e.target.value))}>
              <option value={0}>Semua</option>
              <option value={4.5}>4.5 ke atas</option>
              <option value={4.8}>4.8 ke atas</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label><Sliders className="icon" /> Fasilitas:</label>
            <select value={selectedFacility} onChange={(e) => setSelectedFacility(e.target.value)}>
              <option value="">Semua</option>
              <option value="Kolam Renang">Kolam Renang</option>
              <option value="Spa">Spa</option>
              <option value="Wi-Fi">Wi-Fi</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Urutkan:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="hargaTermurah">Harga Termurah</option>
              <option value="hargaTermahal">Harga Termahal</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="hotel-list">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-item">
              <div className="hotel-summary" onClick={() => toggleHotelDetails(hotel.id)}>
                <img src={hotel.gambar} alt={hotel.nama} className="hotel-thumbnail" />
                <div className="hotel-basic-info">
                  <h3>{hotel.nama}</h3>
                  <div className="rating-price">
                    <div className="rating">
                      <Star className="star-icon" size={16} />
                      <span>{hotel.rating}</span>
                    </div>
                    <div className="price">
                      Rp {hotel.hargaPerMalam.toLocaleString()}/malam
                    </div>
                  </div>
                </div>
                <button 
                  className="info-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHotelDetails(hotel.id);
                  }}
                >
                  <Info size={20} />
                  <span>{expandedHotelId === hotel.id ? 'Sembunyikan' : 'Detail'}</span>
                </button>
              </div>

              {expandedHotelId === hotel.id && (
                <div className="hotel-details-expanded">
                  <div className="details-content">
                    <div className="hotel-address">
                      <h4>Alamat:</h4>
                      <p>{hotel.alamat}</p>
                    </div>
                    <div className="hotel-facilities">
                      <h4>Fasilitas:</h4>
                      <ul>
                        {hotel.fasilitas.map((fasilitas, index) => (
                          <li key={index}>
                            {facilityIcons[fasilitas] || null} {fasilitas}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="room-types">
                      <h4>Tipe Kamar:</h4>
                      <ul>
                        {hotel.tipeKamar.map((room, index) => (
                          <li key={index}>
                            {room.nama} - Rp {room.harga.toLocaleString()}/malam
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button 
                    className="booking-button" 
                    onClick={() => handleSelectHotel(hotel)}
                  >
                    Booking Sekarang
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="room-facilities">
  <h4>Fasilitas Kamar:</h4>
  <ul>
    {selectedRoomType.fasilitas?.map((fasilitas, index) => (
      <li key={index}>
        {facilityIcons[fasilitas] || null} {fasilitas}
      </li>
    ))}
  </ul>
</div>

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
            facilityIcons={facilityIcons} // Pass the icons to modal
          />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default BookingPage;