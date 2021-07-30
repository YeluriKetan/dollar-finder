import React from "react";
import "./account.css";
import ProfilePic from "./../images/sampleprofilepic.jpg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core";
import Createapost from "./Createapost";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Loading from "./Loading";
import { useGetHeader } from "./useGet";
import axios from "axios";
import Advanced from "./Advanced";
import YourPosts from "./Yourposts";

const useStyles = makeStyles({
  tabs: {
    "& .Mui-selected": {
      color: "#a3c4bc",
    },
  },
  tab: {
    textTransform: "none",
    fontFamily: "Teko",
    fontSize: "2rem",
    color: "white",
    "&:hover": {
      backgroundColor: "#665e8a",
    },
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    "@media (max-width: 600px)": {
      fontSize: "1rem",
      margin: 0,
    },
    "& .Mui-selected": {
      color: "#a3c4bc",
    },
  },
  indicator: {
    backgroundColor: "#a3c4bc",
  },
  logoutButton: {
    width: "10rem",
    height: "3rem",
    borderRadius: "1.5rem",
    fontFamily: "Teko",
    fontSize: "1.5rem",
    textTransform: "none",
    backgroundColor: "#413c58",
    color: "white",
    margin: "3rem 0 0 0",
    boxShadow: "0 0 5px 5px rgb(0, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: "#665e8a",
    },
    "@media (max-width: 600px)": {
      width: "5rem",
      height: "2rem",
      fontSize: "1rem",
      margin: "0.5rem 0",
    },
  },
});

function Account({ setLogin }) {
  const [dashboardValue, setDashboardValue] = React.useState(0);
  const dashboard = () => {
    switch (dashboardValue) {
      case 0:
        return <Profile />;
      case 1:
        return <Createapost />;
      case 2:
        return <YourPosts />;
      case 3:
        return <Advanced />;
      default:
        console.log("something wrong");
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    const logoutUrl = "https://dollarfinder.herokuapp.com/account/logout";
    const loginToken = JSON.parse(
      localStorage.getItem("dollarfinderlogin")
    ).logintoken;
    axios
      .get(logoutUrl, {
        headers: {
          logintoken: loginToken,
        },
      })
      .then(
        (response) => {},
        (error) => {}
      );
    setLogin(false);
    const newLoginStorage = {
      loginState: false,
      logintoken: "",
    };
    localStorage.setItem("dollarfinderlogin", JSON.stringify(newLoginStorage));
  };
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  return (
    <main className="account-main">
      <div className="dashboard-background">
        <div className="dashboard">
          <div className="dashboard-nav">
            <Button onClick={toggleDrawer(true)}>
              <MenuIcon style={{ transform: "scale(1.5)" }} />
            </Button>
          </div>
          <div className="dashboard-container">{dashboard()}</div>
        </div>
        {state && (
          <Selector
            dashboardValue={dashboardValue}
            changeDashboardValue={setDashboardValue}
            setState={setState}
          />
        )}
      </div>

      <Button
        type="button"
        variant="contained"
        className={useStyles().logoutButton}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </main>
  );
}

function Selector({ dashboardValue, changeDashboardValue, setState }) {
  return (
    <div className="selector">
      <div className="selector-nav">
        <Tabs
          value={dashboardValue}
          onChange={(event, newValue) => {
            changeDashboardValue(newValue);
            setState(false);
          }}
          orientation="vertical"
          textColor="primary"
          TabIndicatorProps={{ className: useStyles().indicator }}
          className={useStyles().tabs}
        >
          <Tab label="Account" className={useStyles().tab} />
          <Tab label="New post" className={useStyles().tab} />
          <Tab label="Your posts" className={useStyles().tab} />
          <Tab label="Advanced" className={useStyles().tab} />
        </Tabs>
      </div>
      <div
        className="selector-background"
        onClick={() => setState(false)}
      ></div>
    </div>
  );
}
function Profile() {
  const getProfileUrl = "https://dollarfinder.herokuapp.com/account";
  const { data, loading } = useGetHeader(getProfileUrl, "market");
  return (
    <div className="profile-container">
      <h3 className="profile-heading">Your Account</h3>
      {loading ? (
        <div className="profile-loading">
          <Loading color={"black"} />
        </div>
      ) : (
        <div className="profile">
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
              <p className="profile-content">{data.username}</p>
              <p className="profile-content">{data.email}</p>
              <p className="profile-content">
                {data.date
                  ? data.date.slice(0, 10).split("-").reverse().join("-")
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Account;
