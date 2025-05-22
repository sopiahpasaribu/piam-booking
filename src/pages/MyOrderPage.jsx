import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, Plus, Save, X } from "lucide-react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const loadOrders = () => {
    try {
      const storedOrders = localStorage.getItem("order");
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        // Ensure we always have an array
        const ordersArray = Array.isArray(parsedOrders) ? parsedOrders : [parsedOrders];
        // Filter out any null/undefined entries and format the data
        const validOrders = ordersArray
          .filter(order => order && order.hotel)
          .map(order => ({
            ...order,
            // Handle cases where roomType might be stored differently
            roomType: typeof order.roomType === 'string' 
              ? { nama: order.roomType, harga: order.price || 0 } 
              : order.roomType
          }));
        setOrders(validOrders);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    }
  };

  loadOrders();
}, []);


  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedOrders = localStorage.getItem("order");
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          const ordersArray = Array.isArray(parsedOrders) ? parsedOrders : [parsedOrders];
          setOrders(ordersArray.filter(order => order !== null && order !== undefined));
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  const handleEditOrder = (index) => {
    setEditing(index);
  };

  const handleSaveOrder = (index) => {
    setEditing(null);
    const updatedOrders = [...orders];
    localStorage.setItem("order", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index] = {
        ...updatedOrders[index],
        [name]: name === "roomsToBook" ? parseInt(value) : value,
      };
      return updatedOrders;
    });
  };

  const handleCancelBooking = () => {
    const updatedOrders = orders.filter((_, i) => i !== selectedOrderIndex);
    setOrders(updatedOrders);
    localStorage.setItem("order", JSON.stringify(updatedOrders));
    setShowCancelDialog(false);
  };

  const handleAddBooking = () => {
    navigate("/booking");
  };

  const calculateNights = (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut - checkIn;
    return timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;
  };

  const calculateTotalPrice = (roomPrice, nights, roomsToBook) => {
    if (!roomPrice || !nights || !roomsToBook) return 0;
    return roomPrice * nights * roomsToBook;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const openDeleteConfirmation = (index) => {
    setSelectedOrderIndex(index);
    setShowCancelDialog(true);
  };

return (
  <div className="app">
    <Header />
    <section className="my-orders">
      <h1>Pesanan Saya</h1>

      {orders.length > 0 ? (
        orders.map((order, index) => {
          const roomType = order.roomType || {};
          const harga = typeof roomType.harga === 'number' ? roomType.harga : 0;
          const roomsToBook = order.roomsToBook || 1;
          const nights = calculateNights(order.checkInDate, order.checkOutDate);
          const totalPrice = calculateTotalPrice(harga, nights, roomsToBook);

          return (
            <div key={index} className="invoice-wrapper">
              <h2>Struk Pemesanan #{index + 1}</h2>
              {order.hotelImage && (
                <img src={order.hotelImage} alt={order.hotel} className="invoice-hotel-image" />
              )}

              <div className="invoice-info">
                {editing === index ? (
                  <>
                    <div className="form-group">
                      <label>Nama Tamu:</label>
                      <input
                        type="text"
                        name="guestName"
                        value={order.guestName || ""}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="guestEmail"
                        value={order.guestEmail || ""}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Check-in:</label>
                      <input
                        type="date"
                        name="checkInDate"
                        value={order.checkInDate || ""}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Check-out:</label>
                      <input
                        type="date"
                        name="checkOutDate"
                        value={order.checkOutDate || ""}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Jumlah Kamar:</label>
                      <input
                        type="number"
                        name="roomsToBook"
                        min="1"
                        value={order.roomsToBook || 1}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Hotel:</strong> {order.hotel || "-"}</p>
                    <p><strong>Alamat:</strong> {order.hotelAddress || "-"}</p>
                    <p><strong>Nama Tamu:</strong> {order.guestName || "-"}</p>
                    <p><strong>Email:</strong> {order.guestEmail || "-"}</p>
                    <p><strong>Jenis Kamar:</strong> {roomType.nama || "-"}</p>
                    <p><strong>Check-in:</strong> {formatDate(order.checkInDate)}</p>
                    <p><strong>Check-out:</strong> {formatDate(order.checkOutDate)}</p>
                    <p><strong>Jumlah Kamar:</strong> {roomsToBook}</p>
                    <p><strong>Jumlah Malam:</strong> {nights}</p>
                    <p><strong>Total Harga:</strong> Rp {totalPrice.toLocaleString("id-ID")}</p>
                    {order.bookingDate && (
                      <p>
                        <b>silahkan datang kehotel untuk administrasi</b><br /><br />
                        <small>Dipesan pada: {formatDate(order.bookingDate)}</small>
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Tombol Edit dan Hapus dipindahkan ke bawah */}
              <div className="invoice-actions">
                {editing === index ? (
                  <>
                    <button onClick={() => handleSaveOrder(index)} className="action-btn save">
                      <Save size={18} /> Simpan
                    </button>
                    <button onClick={handleCancelEdit} className="action-btn cancel">
                      <X size={18} /> Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditOrder(index)} className="action-btn edit">
                      <Edit size={18} /> Edit
                    </button>
                    <button onClick={() => openDeleteConfirmation(index)} className="action-btn delete">
                      <Trash size={18} /> Hapus
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-orders">
          <p>Tidak ada pesanan!</p>
          <button onClick={handleAddBooking} className="add-booking-btn">
            <Plus /> Buat Pesanan Baru
          </button>
        </div>
      )}

      {orders.length > 0 && (
        <button onClick={handleAddBooking} className="add-booking-btn">
          <Plus /> Tambah Pesanan
        </button>
      )}
    </section>

    {showCancelDialog && (
      <>
        <div className="dialog-overlay" onClick={() => setShowCancelDialog(false)}></div>
        <div className="cancel-dialog">
          <p>Apakah Anda yakin ingin membatalkan pesanan ini?</p>
          <div className="dialog-buttons">
            <button onClick={handleCancelBooking}>Ya</button>
            <button onClick={() => setShowCancelDialog(false)}>Tidak</button>
          </div>
        </div>
      </>
    )}
    <Footer />
  </div>
);

      
};

export default MyOrdersPage;