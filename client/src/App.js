import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import UpdateProfile from './components/UpdateProfile';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import CreateProfile from './components/CreateProfile';
import UserProfile from './components/UserProfile';
import { ProfileState } from './context/ProfileState';
import About from './components/About';

function App() {
  return (
    <ProfileState>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/profile/:profileId" element={<UserProfile />} />
            <Route path="/createprofile" element={<CreateProfile />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileState>
  );
}

export default App;
