import React, { useContext, useEffect } from "react";
import ProfileContext from "../context/profileContext";

const UserProfile = ({ profileId }) => {
  const { profile, ShowProfile } = useContext(ProfileContext);

  useEffect(() => {
    ShowProfile(profileId);
  }, [profileId, ShowProfile]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <img
          src={profile.profilePicture}
          alt="Profile Picture"
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{profile.name}</h5>
          <p className="card-text">{profile.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Email:</strong> {profile.email}
          </li>
          <li className="list-group-item">
            <strong>Address:</strong> {profile.address}
          </li>
          <li className="list-group-item">
            <strong>Company Name:</strong> {profile.company}
          </li>
          <li className="list-group-item">
            <strong>Designation:</strong> {profile.designation}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
