import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <>
      <div className="contact-me">
          <h1>Contact Me</h1>
        <form action="https://formspree.io/f/mrbzzpew" method="POST">
          <div>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name..."
              required
            />
          </div>
          <div>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email..."
              required
            />
          </div>
          <div>
            <span>Message:</span>
            <textarea
              name="message"
              placeholder="Enter Your Query..."
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
