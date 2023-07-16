import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import UpdateProfile from './components/UpdateProfile';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import CreateProfile from './components/CreateProfile';
import UpdateTest from './components/UpdateTest';
import { ProfileState } from './context/ProfileState';
import About from './components/About';

function App() {
  return (
   <ProfileState>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
          <Route exact path="/signup" key={Signup} element={<Signup />} />
          <Route exact path="/login" key={Login} element={<Login/>} />
          <Route exact path="/updateprofile" key={UpdateProfile} element={<UpdateProfile/>} />
          <Route exact path="/" key={Home} element={<Home/>} />
          <Route exact path="/profile" key={Profile} element={<Profile/>} />
          <Route exact path="/createprofile" key={CreateProfile} element={<CreateProfile/>} />
          <Route exact path="/about" key={About} element={<About/>} />
          </Routes>
        </div>
      </BrowserRouter>
      </ProfileState>
    
  );
}

export default App;
