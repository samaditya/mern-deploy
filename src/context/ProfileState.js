import ProfileContext from "./profileContext";
import React, { useState } from 'react';

export const ProfileState = (props) => {
  const host = "http://localhost:5000";
  const [profile, setProfile] = useState(null);

  const AddProfile = async (name, email, company, designation, description, address, profilePicture) => {
  
      const response = await fetch(`${host}/api/createprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          email,
          company,
          designation,
          description,
          address,
          profilePicture,
        }),
      });

      const createdProfile = await response.json();
      setProfile(createdProfile);
      console.log(createdProfile)
   
  };

  const ShowProfile = async (id) => {
  
    const response = await fetch(`${host}/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    const newProfile = profile.filter((note) => { return note._id === id })
    setProfile(newProfile);
};

  return (
    <ProfileContext.Provider
      value={{
        profile,
        AddProfile,
        ShowProfile
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
