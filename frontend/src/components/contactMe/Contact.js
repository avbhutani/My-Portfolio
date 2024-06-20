import React from 'react'
import './Contact.css'
const Contact = ()=> {
    return (
    <>
    <div className='contact-me'>
        <form action="">
        <h1>Contact Me</h1>
            <div><span>Name:</span> <input placeholder='Enter Your Name...'/></div>
            <div><span>Email: </span> <input placeholder='Enter your Email...'/></div>
            <div><span>Message: </span> <textarea name="" id="" placeholder='Enter Your Query...'></textarea></div>
        </form>
    </div>
    </>)
}

export default Contact;