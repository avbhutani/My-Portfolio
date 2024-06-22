import React from 'react'
import './About.css'
const resumeURL = 'https://drive.google.com/file/d/1JKmzIYZiAGic0vqC3MaWmLnS8ZjnJb7R/view?usp=drive_link'

const About = ()=> {
    const downloadFile = () => {
        window.open(resumeURL,"_blank")
      }
    return (
        <>
            <div className='about-me-section'>
                <div className='about-me-section-1'>
                    <h1>About Me</h1>
                    <p>A Dynamic and highly diversified IT Professional responsible for assisting in the establishment of an IT Architecture practice, and the adoption of an architecture and standard methodology.</p>
                    
                    <p>Passionate about designing highly stable and scalable Software Solutions that transcend high performance ranging from traditional Mobile, Web to IoT Management System.</p>
                    
                    <p>If you stick till the end, you can have a glimpse of what I'm most proud of, the experience I hold and the skills I possess (Best of them being, I can centre a Div without Googling 😆).</p>
                    <p>Note: This is just a glimpse, I'm constantly improving and evolving! 👨‍💻</p>
                    <br />
                </div>
                <div className='about-me-section-2'>
                    <button onClick={downloadFile} download>Download Resume <img src='https://cdn.iconscout.com/icon/free/png-512/free-download-1438181-1216144.png?f=webp&w=256'></img></button>
                </div>
            </div>
        </>
    )
}


export default About;