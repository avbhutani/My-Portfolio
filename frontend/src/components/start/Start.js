
import './Start.css'
import Typewriter from './TypeWriter';
const Start = ()=> {
    return (<>
        <div className='Start'>
            <div className='Start-left-content'>
            <h1> <Typewriter text={"Hi, I'm Anubhav Bhutani"} delay={100} infinite></Typewriter></h1>
            <h3>Software Developer</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ab quibusdam perferendis tempore officia dolores obcaecati iste enim? Enim suscipit animi rem ut, itaque nesciunt asperiores nam eveniet quisquam omnis molestiae consequatur praesentium?</p>
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