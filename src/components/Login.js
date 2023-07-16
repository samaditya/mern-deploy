import {useState , React} from 'react'
import {Link , to} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password } = credentials;
    const response = await fetch(" http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/profile");
     }else{
        alert("Invalid credentials")
     }
  };
  const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }



  return (
    <div className='container my-4'>
    <h2>LOGIN</h2>
    <form onSubmit={handleSubmit}>
   
    <div className="mb-3">
      <input onChange={onChange} type="email" id="email" name='email' className="form-control" />
      <label className="form-label" htmlhtmlfor="email">Email address</label>
    </div>
  
    
    <div className="form-outline mb-4">
      <input onChange={onChange} type="password" id="password" name='password' className="form-control" />
      <label className="form-label" htmlhtmlfor="password">Password</label>
    </div>
  
   
    <div className="row mb-4">
      <div className="col d-flex justify-content-center">
        
      </div>
  
    </div>
  
    
    <button type="submit" className="btn btn-primary btn-block mb-3 ">Sign in</button>
  
   
    <div className="text-center">
      <p>Not a member? <Link to="/signup">Register</Link></p>
      <p>or sign up with:</p>
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fab fa-facebook-f"></i>
      </button>
  
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fab fa-google"></i>
      </button>
  
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fab fa-twitter"></i>
      </button>
  
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fab fa-github"></i>
      </button>
    </div>
  </form></div>
  )
}

export default Login