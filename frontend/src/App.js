import './App.css';
// import Navbar from './components/navbar/Navbar'
import Start from './components/start/Start';
import FloatingNavbar from './components/floatingNavbar/FloatingNavbar'
import About from './components/about/About';
import Contact from './components/contactMe/Contact';
import ProudThings from './components/proudThings/ProudThings';
// import EducationalTimeline from './components/educationTimeline/EducationalTimeLine';
function App() {
  return (
    <div className="App">

      <Start />
      <About />
      <div className='proud-things'>
      <h1>Most Proud Of</h1>
      <ProudThings headerContent = 'SELECTED AS FSE SUMMER INTERN AT FIDELITY INVESTMENTS, BENGALURU' bodyContent = 'This is the first box' />
      <ProudThings headerContent = 'RECEIVED SRM JEE MERIT SCHOLARSHIP WORTH Rs. 7,50,000' bodyContent = 'This is the first box' />
      <ProudThings headerContent = 'PARTICIPATED IN CODE FOR GOOD 2024 BY JP MORGAN CHASE' bodyContent = 'This is the first box' />
      </div>
      <Contact />
      <FloatingNavbar />
      {/* <EducationalTimeline /> */}
    </div>
  );
}

export default App;