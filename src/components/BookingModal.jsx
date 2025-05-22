import React from "react";

const BookingModal = ({
  selectedHotel,
  closeModal,
  handleBooking,
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  roomsToBook,
  setRoomsToBook,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  selectedRoomType,
  setSelectedRoomType
}) => {
  return (
    <div className="booking-form">
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={closeModal}>
            ✖
          </button>
          <h3>Pesan Kamar di {selectedHotel.nama}</h3>
          <form onSubmit={handleBooking}>
            <div>
              <label>Nama :</label>
              <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
            </div>
            <div>
              <label>Email :</label>
              <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required />
            </div>
            <div>
              <label>Tipe Kamar :</label>
              <select
                onChange={(e) => {
                  const selectedRoom = selectedHotel.tipeKamar.find((room) => room.nama === e.target.value);
                  setSelectedRoomType(selectedRoom);
                }}
                required
              >
                {selectedHotel.tipeKamar.map((room) => (
                  <option key={room.nama} value={room.nama}>
                    {room.nama} - Rp{room.harga.toLocaleString()} per malam
                  </option>
                ))}
              </select>
              <p>Total Harga: Rp{(selectedRoomType?.harga * roomsToBook).toLocaleString()}</p>
            </div>
            <div>
              <label>Jumlah Kamar :</label>
              <input type="number" value={roomsToBook} onChange={(e) => setRoomsToBook(Number(e.target.value))} min="1" max={selectedHotel.kamarTersedia} />
            </div>
            <div>
              <label>Tanggal Check-in :</label>
              <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
            </div>
            <div>
              <label>Tanggal Check-out :</label>
              <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
            </div>
            <button type="submit" className="submit-button">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;