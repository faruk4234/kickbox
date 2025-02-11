import React, { useState, useEffect } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#home">CESUR KICKBOX</a>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#about">Hakkımızda</a>
            <a href="#gallery">Galeri</a>
            <a href="#programs">Programlar</a>
            <a href="#contact">Iletişim</a>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}; 