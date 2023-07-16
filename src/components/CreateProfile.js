import ProfileContext from "../context/profileContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const context = useContext(ProfileContext);
  const { AddProfile } = context;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    designation: "",
    description: "",
    address: "",
    profilePicture: "",
  });

  const handleClick = async  (e) => {
    e.preventDefault();
    AddProfile(
      profile.name,
      profile.email,
      profile.company,
      profile.designation,
      profile.description,
      profile.address,
      profile.profilePicture
    );
    setProfile({name: "",
    email: "",
    company: "",
    designation: "",
    description: "",
    address: "",
    profilePicture: "",})
  };

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <section className="text-center">
        <div
          className="card my-4 mx-4 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Create Your vProfile</h2>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          value={profile.name}
                          onChange={onChange}
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          value={profile.email}
                          onChange={onChange}
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      value={profile.address}
                      type="text"
                      onChange={onChange}
                      id="address"
                      name="address"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      value={profile.profilePicture}
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={onChange}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="profilePicture">
                      Upload Profile Picture
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      value={profile.company}
                      onChange={onChange}
                      type="text"
                      id="company"
                      name="company"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="company">
                      Company Name
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      value={profile.designation}
                      onChange={onChange}
                      type="text"
                      id="designation"
                      name="designation"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="designation">
                      Designation
                    </label>
                  </div>
                  <p>Write a short description about yourself.</p>
                  <textarea
                    value={profile.description}
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={onChange}
                    rows="9"
                    htmlFor="description"
                  ></textarea>

                  <button
                    onClick={handleClick}
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Finish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProfile;
