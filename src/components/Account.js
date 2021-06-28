import React from "react";
import "./account.css";
import ProfilePic from "./../images/sampleprofilepic.jpg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import Createapost from "./Createapost";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});
const useStyles = makeStyles({
  tab: {
    textTransform: "none",
    fontFamily: "Teko",
    fontSize: 30,
  },
});

function Account({ setLogin }) {
  const [dashboardValue, setDashboardValue] = React.useState(0);
  const dashboard = () => {
    if (dashboardValue) {
      return <Createapost />;
    } else {
      return <Profile />;
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    setLogin(false);
    const newLoginStorage = {
      loginState: false,
      username: "",
      logintoken: "",
    };
    localStorage.setItem("dollarfinderlogin", JSON.stringify(newLoginStorage));
  };
  return (
    <main className="account-main">
      <div className="dashboard">
        <Selector
          style={{
            margin: 0,
            padding: 0,
            height: "fit-content",
            width: "fit-content",
          }}
          dashboardValue={dashboardValue}
          changeDashboardValue={setDashboardValue}
        />
        <div className="dashboard-container">{dashboard()}</div>
      </div>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}

function Selector({ dashboardValue, changeDashboardValue }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Tabs
          value={dashboardValue}
          indicatorColor="primary"
          onChange={(event, newValue) => changeDashboardValue(newValue)}
        >
          <Tab label="Account" className={useStyles().tab} />
          <Tab label="Create a Post" className={useStyles().tab} />
        </Tabs>
      </ThemeProvider>
    </>
  );
}
function Profile() {
  const { username, email } = JSON.parse(
    localStorage.getItem("dollarfinderlogin")
  );
  const date = "Coming soon...";
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
