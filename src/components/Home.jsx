import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css'
import podcastIcon from "./microphone.png"
import Podcast from './Podcast';
import Signup from './Signup';
import Login from './Login';
import { Link } from 'react-router-dom';

const Home = () => {

    const [isPodcastOpen, setIsPodcastOpen] = useState(false)
    const [isSignupOpen, setIsSignupOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const openPodcast = () => { setIsPodcastOpen(true) }
    const closePodcast = () => { setIsPodcastOpen(false) }

    const openSignup = () => { setIsSignupOpen(true) }
    const closeSignup = () => { setIsSignupOpen(false) }

    const openLogin = () => { setIsLoginOpen(true) }
    const closeLogin = () => { setIsLoginOpen(false) }


    return (
        <>
    <div className='container-fluid main' >
        <div className='row p-3 bg-primary-subtle text-primary position-relative' >
            <div className='col'>
                <img src={podcastIcon} alt="" className='position-absolute top-0 start-0 m-3 ms-5' width={45} height={45} />
            </div>

            <div className='col col-sm-2 ' >
                <div className='row' > 
                    <div className='col col-5 btn btn-primary m-1' onClick={openSignup} >SIGNUP</div>
                    <div className='col col-5 btn btn-primary m-1' onClick={openLogin} >LOGIN</div>
                </div>
            </div>
        </div>
        <div className='fill-height' >
            <div className='side-nav' >
                <button className='cr-pod-btn'  onClick={openPodcast}>Create Podcast</button>
                <div type='category' className='category' >
                    <h3>Category</h3>
                    <div className='category-btn' >Music</div>
                    <div className='category-btn' >Arts</div>
                    <div className='category-btn' >Business</div>
                    <div className='category-btn' >Education</div>
                    <div className='category-btn' >MMA</div>
                </div>

            </div>
            <div className='col' >Main</div>
        </div>
    </div>

      <Podcast isOpen={isPodcastOpen} onClose={closePodcast} />
      <Signup isOpen={isSignupOpen} onClose={closeSignup} />
      <Login isOpen={isLoginOpen} onClose={closeLogin} />

    </>
    )
}

export default Home