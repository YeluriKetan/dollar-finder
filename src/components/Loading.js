import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import "./loading.css";

function Loading({ color }) {
  const useStyles = makeStyles({
    loadicon: {
      color: color,
      display: "block",
    },
  });
  return (
    <div className="loading">
      <CircularProgress className={useStyles().loadicon} />
      <p className="loading-text" style={{ color: color }}>
        Loading...
      </p>
    </div>
  );
}

export default Loading;
