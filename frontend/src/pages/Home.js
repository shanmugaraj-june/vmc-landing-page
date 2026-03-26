import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Machines from '../components/Machines';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-carbon-900">
      <Navbar />
      <Hero />
      <About />
      <Machines />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
