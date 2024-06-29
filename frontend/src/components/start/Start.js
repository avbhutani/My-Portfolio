
import './Start.css'
import Typewriter from './TypeWriter';
const Start = ()=> {
    return (<>
        <div className='Start'>
            <div className='Start-left-content'>
            <h1> <Typewriter text={"Hi, I'm Anubhav Bhutani"} delay={100} infinite></Typewriter></h1>
            <h3>Software Developer</h3>
            <p>I am a Seasoned Technical Architect, bringing extensive expertise as a Full-Stack Developer and Cloud SME with high level proficiency in leading the entire product lifecycle of complex software solutions, from planning and design to development, implementation, and management.
Contact Me</p>
            <button>
                Contact Me &#128231;
            </button>
            </div>
            <div className='Start-right-content'>
                <img src="https://media.licdn.com/dms/image/D5635AQEPvigyBNvLQw/profile-framedphoto-shrink_400_400/0/1700494624777?e=1720252800&v=beta&t=eF9qAa2K_2XBdlVjRd0eddW4Ole_crYM1FASRNjJ16E" alt="ok" />
            </div>
        </div>
    </>)
}


export default Start;