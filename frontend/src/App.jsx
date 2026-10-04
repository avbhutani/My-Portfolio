import { ToastContainer } from 'react-toastify';

import About from './components/About/About';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

export default function App() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to main content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={4500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </>
  );
}