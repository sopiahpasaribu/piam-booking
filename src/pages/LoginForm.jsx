import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Ambil data pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert("Login berhasil!");
      navigate("/home");
    } else {
      alert("Kata sandi salah");
    }
  };

  return (
    <div className="pii-container">
      <div className="image-section">
        <img src="pexels-andrew-3201762.jpg" alt="Gambar Latar Belakang" />
        <h2 className="form-title">PIAM BOOKING</h2>
        <div className="form-overlay">
          <div className="user-icon-container">
            <User className="user-icon" size={50} />
          </div>
          <h2>Selamat Datang Kembali!</h2>
          <p>Silakan masukkan detail login Anda</p>
          <form onSubmit={handleLogin}>
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
            {/* Input Password */}
            <div className="input-group" style={{ position: "relative" }}>
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password Anda"
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
            <button type="submit">Masuk</button>
          </form>
          <p>
            Belum punya akun?
            <button type="button" onClick={() => navigate("/signup")}>
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
