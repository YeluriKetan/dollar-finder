import React from "react";
import "./header.css";
import Logo from "./../images/logo.svg";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  accountIcon: {
    width: 50,
    height: 50,
    margin: 25,
    marginRight: 45,
    color: "white",
    "&:hover": {
      color: "#a3c4bc",
    },
  },
});
function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" className="icon" />
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="header-nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="header-nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/login">
              <AccountCircleOutlinedIcon className={useStyles().accountIcon} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
