import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';
import './styles/fonts.css';
import './styles/theme.css';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Programs />
        <Contact />
      </main>
    </div>
  );
};

export default App;
