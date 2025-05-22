import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, House, BedDouble, Info } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <header className="header">
      <h2>PIAM BOOKING</h2>
      <nav>
        <ul>
          <li><Link to="/home"><House /></Link></li>
          <li><Link to="/booking"><BedDouble /></Link></li>
          <li><Link to="/about"><Info /></Link></li>
          <li><Link to="/my-orders"><ShoppingCart /></Link></li>
          <li>
            <a href="/" className="logoutLink" onClick={handleLogout}>
              <LogOut />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
