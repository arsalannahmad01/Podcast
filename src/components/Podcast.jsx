// ModalForm.js
import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-modal';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import axios from 'axios'

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

const Podcast = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    speaker: '',
    file: ''
  });
  const [token, setToken] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    setToken(token)
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form data if needed
    setFormData({
      name: '',
      email: '',
    });
    // Close the modal
    onClose();
  };

  const uploadMedia = async(e) => {
    const { name, value } = e.target;
    const file = e.target.files[0]

    setUploading(true)

    const imageRef = ref(storage, `files/${ v4() + file.name}`)
    await uploadBytes(imageRef, file)

    const res = await getDownloadURL(imageRef)
    // console.log(res);
    // value = res
    setFormData({ ...formData, [name]: res });
    // setProfile(res)
    setUploading(false)

}

const handlePodcast = async() => {

    const res = await axios.post(`https://api-podcast.onrender.com/api/v1/podcast/create-podcast`, formData, {headers:{
        Authorization:`Bearer ${token}`
    }})

    console.log(res.data)

}

console.log(formData);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
        <div className='container' >
        <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder='Title'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder='Description'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="category"
            value={formData.category}
            placeholder='Category'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="speaker"
            value={formData.speaker}
            placeholder='Speaker Name'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="type"
            value={formData.type}
            placeholder='Type'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="file"
            name="file"
            // value={formData.file}
            accept="audio/*, video/*"
            onChange={uploadMedia}
          />
        </label>
        <br/>
        {uploading ? <p>Uploading...</p> : null}
        <br/>
        <button type="submit" onClick={handlePodcast} >Create</button>
      </form>
        </div>

    </Modal>
  );
};

export default Podcast;
