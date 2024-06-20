import './App.css';
// import Navbar from './components/navbar/Navbar'
import Start from './components/start/Start';
import FloatingNavbar from './components/floatingNavbar/FloatingNavbar'
import About from './components/about/About';
import Contact from './components/contactMe/Contact';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Start />
      <About />
      <Contact />
    </div>
  );
}

export default App;