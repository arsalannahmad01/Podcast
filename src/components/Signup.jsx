import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const formStyle = {
    margin:"10px",
    padding:"5px"
}

const Signup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
  });
  const [passsword, setPassword] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
        email: '',
        password: '',
    });
    onClose();
  };

  const handleSignup = async() => {

    if(formData.password != passsword) {
        alert(`Password dosen't match`)
        return
    }

    const res = await axios.post(`https://api-podcast.onrender.com/api/v1/user/register`, formData)
    console.log(res.data)
    console.log(res.data.token)

    localStorage.setItem('token', JSON.stringify(res.data.token))

  }

  console.log(formData);
  console.log(passsword);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit} style={formStyle} >
      <label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder='Name'
            onChange={handleInputChange}
          />
        </label>
          <br />
        <label>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder='Email'
            onChange={handleInputChange}
          />
        </label>
          <br />
        <label>
          <input
            type="passsword"
            name="password"
            value={formData.password}
            placeholder='Password'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>

          <input
            type="re-passsword"
            name="re-password"
            placeholder='Re-Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button type="submit" onClick={handleSignup} >Signup</button>
      </form>
    </Modal>
  );
};

export default Signup;
