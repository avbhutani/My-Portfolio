import { ToastContainer } from 'react-toastify';

import { useHashNavigation } from './hooks/useHashNavigation';
import About from './components/About/About';
import Achievements from './components/Achievements/Achievements';
// `components/Contact/Contact` is kept in the repo but intentionally not
// rendered; the site now offers direct email and LinkedIn links instead.
// Re-enable it by swapping the import and the `<ContactLinks />` line below.
import ContactLinks from './components/ContactLinks/ContactLinks';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

export default function App() {
  // Back/Forward and deep links have to move the viewport, not just the URL.
  useHashNavigation();

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
        <ContactLinks />
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