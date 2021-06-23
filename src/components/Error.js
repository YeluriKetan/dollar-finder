import React from "react";
import "./error.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    width: 150,
    height: 50,
    textTransform: "none",
    borderRadius: 25,
    fontFamily: "Teko",
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#E7EFC5",
    color: "black",
    "&:hover": {
      backgroundColor: "#afb594",
    },
  },
});

function Error() {
  return (
    <main className="error-main">
      <h2 className="message">Oops...Page doesn't exist...</h2>
      <Button
        variant="contained"
        className={useStyles().button}
        component={Link}
        to="/"
      >
        Home
      </Button>
    </main>
  );
}

export default Error;
