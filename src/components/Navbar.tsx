import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle touch events for drawer
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!isMenuOpen) return;
      touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isMenuOpen) return;
      
      const touchEnd = e.touches[0].clientX;
      const diff = touchEnd - touchStartRef.current;

      // If swiping right while menu is open, close it
      if (diff > 50) {
        setIsMenuOpen(false);
      }
    };

    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener('touchstart', handleTouchStart, { passive: true });
      menu.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      if (menu) {
        menu.removeEventListener('touchstart', handleTouchStart);
        menu.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const handleBackdropClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const renderNavLinks = () => (
    <>
      <a href="#about" onClick={(e) => handleNavClick(e, 'about')} role="menuitem">
        Hakkımızda
      </a>
      <Link to="/gallery" onClick={handleLinkClick} role="menuitem">Galeri</Link>
      <Link to="/teachers" onClick={handleLinkClick} role="menuitem">Hocalarımız</Link>
      <a href="#programs" onClick={(e) => handleNavClick(e, 'programs')} role="menuitem">
        Programlar
      </a>
      <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} role="menuitem">
        İletişim
      </a>
    </>
  );

  return (
    <>
      <nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          <div className="logo">
            <Link to="/" onClick={handleLinkClick}>KICKBOXING</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="nav-links" role="menubar">
              {renderNavLinks()}
            </div>
          </div>
          
          <button 
            ref={hamburgerRef}
            className="hamburger" 
            onClick={toggleMenu} 
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-links"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`drawer-container ${isMenuOpen ? 'active' : ''}`}>
        <div className="drawer-backdrop" onClick={handleBackdropClick} />
        <div 
          id="mobile-nav-links"
          ref={menuRef}
          className="nav-links"
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          {renderNavLinks()}
        </div>
      </div>
    </>
  );
}; 