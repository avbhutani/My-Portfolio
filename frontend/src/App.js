import './App.css';
// import Navbar from './components/navbar/Navbar'
import Start from './components/start/Start';
import FloatingNavbar from './components/floatingNavbar/FloatingNavbar'
import About from './components/about/About';
import Contact from './components/contactMe/Contact';
import ProudThings from './components/proudThings/ProudThings';
import EducationalDetails from './components/educationTimeline/EducationalDetails';
import ExperienceDetails from './components/experienceDetails/ExperienceDetails';
// import EducationalTimeline from './components/educationTimeline/EducationalTimeLine';
function App() {
  return (
    <div className="App">

      <Start />
      <About />
      <h1>Experience</h1>
      <ExperienceDetails position="SDE Intern" companyName="Fidelity Investments" duration="June 2024 - Present" location="Bengaluru,Karnataka, India"/>
      
      <h1>Educational Details</h1>
      <EducationalDetails grade ="9.69" session="2021-2025" stage="Undergraduation" instituteName="SRM INSTITUTE OF SCIENCE AND TECHNOLOGY, CHENNAI, TAMIL NADU" />
      <EducationalDetails grade ="93.4%" session="2020-2021" stage="Class 12" instituteName="DAV PUBLIC SCHOOL SECTOR 48, 49 GURGAON, HARYANA" />
      <EducationalDetails grade ="94%" session="2018-2019" stage="Class 10" instituteName="DAV PUBLIC SCHOOL SECTOR 48, 49 GURGAON, HARYANA" />
    
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