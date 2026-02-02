import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LearningHub from './components/Content/LearningHub';
import QASection from './components/QASection';
import GameSection from './components/GameSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <LearningHub />
        <GameSection />
        <QASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
