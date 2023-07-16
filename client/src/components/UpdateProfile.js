import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from "../context/profileContext";

const EditProfile = () => {

    useEffect(() => {
        if (localStorage.getItem('token')) {
            alert("yoooo")
        } else {
            navigate('/login')
            alert("You need to signed in first")
        }
        // eslint-disable-next-line
    }, [])

  const navigate = useNavigate();
  const context = useContext(ProfileContext);
  const { profile, updateProfile } = context;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    designation: "",
    company: "",
    address: "",
  });

  useEffect(() => {
    // Set the form data with the existing profile values
    setFormData({
      name: profile.name,
      email: profile.email,
      description: profile.description,
      designation: profile.designation,
      company: profile.company,
      address: profile.address,
    });
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e,id,name, email, description, designation, company, address, profilePicture) => {
  e.preventDefault();
  try {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/updateprofile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    updateProfile(data)
    navigate('/profile')
    // Update the profile in the context or handle any other response data as needed
    // Redirect to the profile page
   
  } catch (error) {
    console.error({error});
    // Handle any error scenarios
  }
};


  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            className="form-control"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
