import React , {useContext , useState} from 'react';
import ProfileContext from "../context/profileContext";

const Profile = () => {
   const context = useContext(ProfileContext)
   const {ShowProfile} = context;

   const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    designation: "",
    description: "",
    address: "",
    profilePicture: "",
  });

  

  const containerStyle = {
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const profilePictureStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const pictureStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  };

  const userInfoStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const valueStyle = {
    margin: '0',
    color: '#666666',
  };

  return (
    <ProfileContext.Consumer>
    {profile=>(
    <div style={containerStyle}>
      <div style={profilePictureStyle}>
        <img src={profile.profilePicture} alt="Profile Picture" style={pictureStyle} />
      </div>
      <div style={userInfoStyle}>
        <label style={labelStyle}>Name:</label>
        <p style={valueStyle}>{profile.name}</p>
      </div>
      <div style={userInfoStyle}>
        <label style={labelStyle}>Email:</label>
        <p style={valueStyle}>{profile.email}</p>
      </div>
      <div style={userInfoStyle}>
        <label style={labelStyle}>Company:</label>
        <p style={valueStyle}>{profile.company}</p>
      </div>
      <div style={userInfoStyle}>
        <label style={labelStyle}>Designation:</label>
        <p style={valueStyle}>{profile.designation}</p>
      </div>
      <div style={userInfoStyle}>
        <label style={labelStyle}>Description:</label>
        <p style={valueStyle}>{profile.description}</p>
      </div>
      <div style={userInfoStyle}>
        <label style={labelStyle}>Address:</label>
        <p style={valueStyle}>{profile.address}</p>
      </div>
    </div>
    )}
    </ProfileContext.Consumer>
  );
};

export default Profile;
