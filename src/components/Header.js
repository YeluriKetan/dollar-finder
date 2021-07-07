import React from "react";
import "./header.css";
import Logo from "./../images/logo.svg";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link, NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  accountIcon: {
    width: "3rem",
    height: "3rem",
    color: "white",
    "&:hover": {
      color: "#a3c4bc",
    },
  },
  accountActiveIcon: {
    "& .MuiSvgIcon-root": {
      color: "#a3c4bc",
    },
  },
});
function Header() {
  return (
    <header className="header">
      <Link to="/about">
        <img src={Logo} alt="Logo" className="icon" />
      </Link>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              className="header-nav-link"
              activeClassName="header-active-nav-link"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/about"
              className="header-nav-link"
              activeClassName="header-active-nav-link"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/account"
              activeClassName={useStyles().accountActiveIcon}
            >
              <AccountCircleOutlinedIcon className={useStyles().accountIcon} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
