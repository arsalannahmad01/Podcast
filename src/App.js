import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Podcast from './components/Podcast';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/podcast' element={<Podcast />} />
          {/* <Route exact path='/otp' element={<Otp />} />
          <Route exact path='/welcome' element={<Welcome />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
