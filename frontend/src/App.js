import './App.css';
// import Navbar from './components/navbar/Navbar'
import Start from './components/start/Start'
import FloatingNavbar from './components/floatingNavbar/FloatingNavbar'
import About from './components/about/About'
import Contact from './components/contactMe/Contact'
import ProudThings from './components/proudThings/ProudThings'
import EducationalDetails from './components/educationTimeline/EducationalDetails'
import ExperienceDetails from './components/experienceDetails/ExperienceDetails'
// import EducationalTimeline from './components/educationTimeline/EducationalTimeLine'

function App() {
  return (
    <div className="App">
      <section>
      <div id='start-section'>
      <Start />
      </div>
      </section>

      <section>
      <div id='about-section'>
      <About />
      </div>
      </section>

      <section>
      <div id='experience-section'>
      <h1>Experience</h1>
      <ExperienceDetails position="SDE Intern" companyName="Fidelity Investments" duration="June 2024 - August 2024" location="Bengaluru,Karnataka, India"/>
      </div>
      </section>

      <section>
      <div id='education-section'>
      <h1>Educational Details</h1>
      <EducationalDetails grade ="CGPA: 9.70" session="2021-2025" stage="Undergraduation" instituteName="SRM INSTITUTE OF SCIENCE AND TECHNOLOGY, CHENNAI, TAMIL NADU" />
      <EducationalDetails grade ="Percentage: 93.4%" session="2020-2021" stage="Class 12" instituteName="DAV PUBLIC SCHOOL SECTOR 48, 49 GURGAON, HARYANA" />
      <EducationalDetails grade ="Percentage: 94%" session="2018-2019" stage="Class 10" instituteName="DAV PUBLIC SCHOOL SECTOR 48, 49 GURGAON, HARYANA" />
      </div>
      </section>

      <section>
      <div id='proud-section' className='proud-things'>
      <h1>Most Proud Of</h1>
      <ProudThings headerContent = 'RECEIVED SRM JEE MERIT SCHOLARSHIP WORTH Rs. 7,50,000 (100% Tuition Fee Wavier)' />
      <ProudThings headerContent = 'Rated >= 2000 on CodeStudio. ' />
      <ProudThings headerContent = 'PARTICIPATED IN CODE FOR GOOD 2024 BY JP MORGAN CHASE'  />
      </div>
      </section>

      <section>
      <div id='contact-section'>
      <Contact />
      </div>
      </section>
      
      <FloatingNavbar />
      {/* <EducationalTimeline /> */}
    </div>
  );
}

export default App;