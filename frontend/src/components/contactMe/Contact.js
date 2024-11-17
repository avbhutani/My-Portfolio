import React, { useEffect, useState } from "react";
import "./Contact.css";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [content,setContent] = useState()
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('')
  async function handleFormSubmission(event) {
    event.preventDefault()
    
    if(!name || !email || !content) {
      // setMessage('One or More Fields are Empty!')
      toast.warn('One or More Fields are Empty!')

      return
    }
    setLoading(true)
    toast('Submitting Form!')
    try {
      const res = await axios.post('https://my-portfolio-ouo6.vercel.app/submitForm',{
        name:name,
        email:email,
        content:content
      })
      setLoading(false)

      toast.success('Form Submitted!')
      setContent('')
      setEmail('')
      setName('')
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
        <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} className="form-name"/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}  className="form-email"/>
        <textarea cols="30" rows="10" placeholder="Message" value={content} onChange={(e)=> setContent(e.target.value)} className="form-textarea"></textarea>
        <button type="submit" onClick={handleFormSubmission}>Submit</button> 
      </form>
      
    </>
  );
};

export default Contact;
