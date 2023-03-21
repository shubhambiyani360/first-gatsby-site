import React, { useState } from 'react'
import axios from 'axios'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
  //   e.preventDefault()

  //   // axios.defaults.headers.post['Content-Type'] = 'application/json'
  //   //console.log(formData)
  //   axios
  //     .post('http://localhost:1337/api/contact-forms', {data:formData})
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }


  e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/api/contact-forms", {data:formData});
      if (response.status === 200) {
        //alert("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset the form fields
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Form submission failed");
    }
  }; 



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" value={formData.message} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ContactForm
