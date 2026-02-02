import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LearningHub from './components/Content/LearningHub';
import GameSection from './components/GameSection';
import AboutProject from './components/AboutProject';
import QASection from './components/QASection';
import Footer from './components/Footer';

const HomePage = () => (
  <>
    <Hero />
    <LearningHub />
    <GameSection />
    <QASection />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutProject />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
