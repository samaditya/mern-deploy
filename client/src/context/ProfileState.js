
import ProfileContext from "./profileContext";
import React, { useState } from "react";

export const ProfileState = (props) => {
  const host = "http://localhost:5000";
  const [profile, setProfile] = useState(null);
  

  const AddProfile = async (
    name,
    email,
    company,
    designation,
    description,
    address,
    profilePicture
  ) => {
    try {
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
      const profileId = createdProfile._id;
      setProfile(createdProfile);
      console.log(createdProfile);
    } catch (error) {
      console.error(error.message);
    }
  };

  const DeleteProfile = async (userId) => {
    try {
      // API Call
      await fetch(`${host}/api/deletenote/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const updatedProfile = profile.filter((item) => item._id !== userId);
      setProfile(updatedProfile);
    } catch (error) {
      console.error(error);
    }
  };

  const ShowProfile = async (id) => {
    try {
      const response = await fetch(`${host}/api/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to retrieve profile");
      }
  
      const json = await response.json();
      setProfile(json)
      console.log(json)

    } catch (error) {
      console.error(error);
      // Display an error message to the user
      // Handle the error appropriately
    }
  };
  

  return (
    <ProfileContext.Provider
      value={{
        profile,
        AddProfile,
        ShowProfile,
        DeleteProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
