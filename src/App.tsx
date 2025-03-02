import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Teachers } from './components/Teachers';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';
import { WomensClass } from './components/WomensClass';
import TeachersPage from './pages/TeachersPage';
import GalleryPage from './pages/GalleryPage';
import './styles/fonts.css';
import './styles/theme.css';
import './styles/App.css';
import './styles/responsive.css';

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
              <Programs />
              <Contact />
            </main>
          } />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="gallery" element={<GalleryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
