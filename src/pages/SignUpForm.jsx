import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Mail, Phone, Lock, User, Eye, EyeOff } from "lucide-react"; // Ikon yang digunakan

function SignUpForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk visibilitas password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk visibilitas confirm password

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi data form
    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    // Simpan data pengguna ke localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { fullName, email, phone, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Akun berhasil dibuat!");
    // Navigasi ke halaman login setelah sukses
    navigate("/");
  };

  return (
    <div className="pii-container">
      <div className="image-section">
        <img src="pexels-andrew-3201762.jpg" alt="Gambar Latar Belakang" />
        <h2 className="form-title">PIAM BOOKING</h2>

        <div className="form-overlay">
          <h2>Buat Akun untuk Pemesanan Hotel</h2>
          <p>Bergabung dengan kami dan pesan penginapan Anda selanjutnya!</p>
          <form onSubmit={handleSubmit}>
            {/* Input Nama Lengkap */}
            <div className="input-group">
              <User className="input-icon" />
              <input
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            {/* Input Email */}
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Input Nomor Telepon */}
            <div className="input-group">
              <Phone className="input-icon" />
              <input
                type="tel"
                placeholder="Masukkan nomor telepon Anda"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            {/* Input Kata Sandi */}
            <div className="input-group" style={{ position: "relative" }}>
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {/* Input Konfirmasi Kata Sandi */}
            <div className="input-group" style={{ position: "relative" }}>
              <Lock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi kata sandi Anda"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-password-btn"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button type="submit">Daftar</button>
          </form>
          <p>
            Sudah punya akun?{" "}
            <button type="button" onClick={() => navigate("/")}>
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
