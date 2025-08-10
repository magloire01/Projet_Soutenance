import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TemplatesCatalog from './components/TemplatesCatalog';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <TemplatesCatalog />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;