import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
    
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>KICKBOXING</Link>
        </div>
        
        <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            Hakkımızda
          </a>
          <Link to="/gallery" onClick={handleLinkClick}>Galeri</Link>
          <Link to="/teachers" onClick={handleLinkClick}>Hocalarımız</Link>
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