import React from "react";
import "./home.css";
import NameLogo from "./../images/namelogo.svg";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
// import { makeStyles } from "@material-ui/core/styles";
import Marketplace from "./Marketplace";

// const useStyles = makeStyles({
//   iconButton: {
//     width: "3.75rem",
//     height: "3.75rem",
//     margin: 0,
//     marginRight: "0.625rem",
//     padding: 0,
//   },
//   searchIcon: {
//     width: "2.5rem",
//     height: "2.5rem",
//     margin: 0,
//     padding: 0,
//   },
// });

function Home() {
  // const [search, setSearch] = React.useState("");
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  // };
  return (
    <main className="home-main">
      <div className="search-bar-background">
        <img src={NameLogo} alt="Dollar Finder" className="logo-text" />
        {/* <form className="search-form" action="#" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            name="search-bar"
            id="search-bar"
            className="search-bar"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
          <IconButton className={useStyles().iconButton} type="submit">
            <SearchIcon className={useStyles().searchIcon} />
          </IconButton>
        </form> */}
      </div>
      <div className="home-main-main">
        <Marketplace />
      </div>
    </main>
  );
}

export default Home;
