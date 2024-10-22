
import './Start.css'
import Typewriter from './TypeWriter';
import image1 from './img.png'
// import {useNavigate} from 'react-router-dom'

const Start = ()=> {
    // const navigate = useNavigate()
    const handleScroll = (event, id) => {
        event.preventDefault();
        const element = document.getElementById(id);
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - (window.innerHeight / 2) + (element.clientHeight / 2);
        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        });
    }
    
    return (<>
        <div className='Start'>
            <div className='Start-left-content'>
            <h1> <Typewriter text={"Hi, I'm Anubhav Bhutani"} delay={100} infinite></Typewriter></h1>
            <h3>Software Developer</h3>
            <p>I'm Anubhav Bhutani, a B.Tech Computer Science student specializing in AI/ML. I love coding and have hands-on experience with Java, Python, ReactJS, and more. Recently, I honed my skills at Fidelity Investments. I'm passionate about creating impactful tech solutions! </p>
            <button onClick={(e)=> handleScroll(e,'contact-me-form')}>
                Contact Me &#128231;
            </button>
            </div>
            <div className='Start-right-content'>
                <img src={image1} alt="Portfolio Image" />
            </div>
        </div>
    </>)
}


export default Start;