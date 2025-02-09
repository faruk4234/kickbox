import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';
import './styles/theme.css';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Gallery />
      <Programs />
      <Contact />
    </div>
  );
}

export default App; 