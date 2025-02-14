import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Teachers } from './components/Teachers';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';
import { TeachersPage } from './pages/TeachersPage';
import './styles/fonts.css';
import './styles/theme.css';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <About />
              <Gallery />
              <Teachers />
              <Programs />
              <Contact />
            </main>
          } />
          <Route path="/teachers" element={<TeachersPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
