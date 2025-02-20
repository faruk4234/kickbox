import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If we're not on the home page, first navigate to home
      navigate('/');
      // Then scroll after a small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">KICKBOXING</Link>
        </div>
        <div className="nav-links">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            Hakkımızda
          </a>
          <Link to="/gallery">Galeri</Link>
          <Link to="/teachers">Hocalarımız</Link>
          <a href="#programs" onClick={(e) => handleNavClick(e, 'programs')}>
            Programlar
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
            İletişim
          </a>
        </div>
      </div>
    </nav>
  );
}; 