import React from 'react'
import './About.css'

const resumeURL = 'https://drive.google.com/file/d/17m1Iu6O52ZcCLAL1V-EGZ6A5UzhGC0RS/view?usp=sharing'

const About = ()=> {
    const downloadFile = () => {
        window.open(resumeURL,"_blank")
    }
    return (
        <>
            <div className='about-me-section'>
                <div className='about-me-section-1'>
                    <h1>About Me</h1>
                    <p>A Dynamic and highly diversified person responsible for solving problems.</p>
                    
                    <p>Passionate about Technology and love to solve the problems in hand.</p>
                    
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