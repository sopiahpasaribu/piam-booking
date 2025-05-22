import React from "react";

const HotelCard = ({ hotel, onViewDetails }) => {
  // Pastikan rating ada, jika tidak tampilkan "N/A"
  const rating = hotel.rating ? hotel.rating.toFixed(1) : "N/A";

  return (
    <div className="hotel-card">
      {/* Gambar Hotel */}
      <img
        src={hotel.gambar}
        alt={`Foto ${hotel.nama}` || "Hotel image not available"}
        className="hotel-image"
        onError={(e) => e.target.src = '/path/to/default-image.jpg'} // Gambar fallback jika error
      />

      {/* Detail Hotel */}
      <div className="hotel-details">
        <h3 className="hotel-name">{hotel.nama}</h3>
        <p className="hotel-rating">⭐ {rating}</p>
        <p className="hotel-price">
          <strong>Rp {hotel.hargaPerMalam.toLocaleString()}</strong>
        </p>
        <button
          className="view-details-btn"
          onClick={() => onViewDetails(hotel)}
>
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
