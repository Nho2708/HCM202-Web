import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LearningHub from './components/Content/LearningHub';
import GameSection from './components/GameSection';
import AboutProject from './components/AboutProject';
import QASection from './components/QASection';
import Footer from './components/Footer';
import Onboarding from './components/Onboarding';

const HomePage = () => (
  <>
    <Hero />
    <LearningHub />
    <GameSection />
    <QASection />
  </>
);

function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    !sessionStorage.getItem('hasSeenOnboarding')
  );

  const handleOnboardingComplete = () => {
    sessionStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-cream flex flex-col font-sans">
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

        {!showOnboarding && (
          <div className="animate-reveal flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutProject />} />
              </Routes>
            </main>
            <Footer />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
