import React from "react";
import "./account.css";
import ProfilePic from "./../images/sampleprofilepic.jpg";
import Login from "./Login";

function Account({ login, setLogin }) {
  return login ? (
    <DashBoard setLogin={setLogin} />
  ) : (
    <Login setLogin={setLogin} />
  );
}
function DashBoard({ setLogin }) {
  const handleLogout = (e) => {
    e.preventDefault();
    setLogin(false);
  };
  return (
    <main className="account-main">
      <div className="dashboard">
        <Profile />
      </div>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}
function Profile() {
  const username = "Sample Name";
  const email = "sample-email@gmail.com";
  const date = "27-06-2020";
  return (
    <div className="profile">
      <h3 className="profile-heading">Your Account</h3>
      <div className="profile-pic-group">
        <div className="profile-pic-container">
          <img
            src={ProfilePic}
            alt="Sample Profile Pic"
            className="profile-pic"
          />
        </div>
      </div>
      <div className="profile-info-container">
        <div className="profile-label-group">
          <p className="profile-label">Username :</p>
          <p className="profile-label">Email :</p>
          <p className="profile-label">Date joined :</p>
        </div>
        <div className="profile-content-group">
          <p className="profile-content">{username}</p>
          <p className="profile-content">{email}</p>
          <p className="profile-content">{date}</p>
        </div>
      </div>
    </div>
  );
}
export default Account;
