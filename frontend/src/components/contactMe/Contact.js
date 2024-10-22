import React, { useState } from "react";
import "./Contact.css";
import axios from 'axios'

const Contact = () => {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [content,setContent] = useState()

  async function handleFormSubmission(event) {
    event.preventDefault()
    
    try {
      const res = await axios.post('https://my-portfolio-ouo6.vercel.app/submitForm',{
        name:name,
        email:email,
        content:content
      })
      console.log('Submitted')
    }
    catch(error) {
      console.log(error)
    }

  }

  async function handleScroll(e) {
    console.log('scrolled')
  }
  return (
    <>
        <h1>Contact Me</h1>
      <form className="contact-me-form" id="contact-me-form" onScroll={handleScroll}> 
        

        <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} className="form-name"/>
        <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}  className="form-email"/>
        <textarea cols="30" rows="10" placeholder="Message" onChange={(e)=> setContent(e.target.value)} className="form-textarea"></textarea>
        <button onClick={handleFormSubmission}>Submit</button>
       
      </form>
    </>
  );
};

export default Contact;
