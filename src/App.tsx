import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Teachers } from './components/Teachers';
import { Students } from './components/Students';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';
import { WomensClass } from './components/WomensClass';
import TeachersPage from './pages/TeachersPage';
import GalleryPage from './pages/GalleryPage';
import './styles/fonts.css';
import './styles/theme.css';
import './styles/App.css';
import './styles/responsive.css';

// Presentation redirect component
const PresentationRedirect: React.FC = () => {
  React.useEffect(() => {
    // Get the base URL from the homepage in package.json
    const baseUrl = process.env.PUBLIC_URL || '';
    window.location.href = `${baseUrl}/presentation/index.html`;
  }, []);
  
  return <div>Redirecting to presentation...</div>;
};

const App: React.FC = () => {
  return (
    <Router basename="/">
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="" element={
            <main>
              <Hero />
              <About />
              <WomensClass />
              <Gallery />
              <Teachers />
              <Students />
              <Programs />
              <Contact />
            </main>
          } />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="presentation" element={<PresentationRedirect />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
