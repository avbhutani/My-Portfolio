import './App.css';
// import Navbar from './components/navbar/Navbar'
import Start from './components/start/Start';
import FloatingNavbar from './components/floatingNavbar/FloatingNavbar'
import Navbar from './components/navbar/Navbar'
import About from './components/about/About';
import Contact from './components/contactMe/Contact';
import ProudThings from './components/proudThings/ProudThings';
function App() {
  return (
    <div className="App">

      <Start />
      <About />
      <div className='proud-things'>
      <h1>Most Proud Of</h1>
      <ProudThings headerContent = 'ok this is the first one' bodyContent = 'This is the first box' />
      <ProudThings headerContent = 'ok this is the first one' bodyContent = 'This is the first box' />
      <ProudThings headerContent = 'ok this is the first one' bodyContent = 'This is the first box' />
      </div>
      <Contact />
    </div>
  );
}

export default App;