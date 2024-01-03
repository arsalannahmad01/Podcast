// ModalForm.js
import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

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


const Login = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });

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


  const handleLogin = async() => {
    const res = await axios.post(`http://localhost:8000/api/v1/user/login`, formData)

    if(!res.data) {
        alert('Something went wrong while login')
        return
    }

    localStorage.setItem('token', JSON.stringify(res.data.token))

  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder='Email'
            onChange={handleInputChange}
          />
        </label>
            <br />
        <label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder='Password'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit" onClick={handleLogin} >Login</button>
      </form>
    </Modal>
  );
};

export default Login;