import React from "react";
import Postmini from "./Postmini";
import "./marketplace.css";
import { useFetch } from "./useFetch";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  form: {},
  select: {
    fontFamily: "Overpass Mono",
    backgroundColor: "white",
    borderRadius: 50,
    height: "2.5rem",
    width: "18.75rem",
    fontSize: "1rem",
  },
  option: {
    fontSize: "1rem",
    fontFamily: "Overpass Mono",
    "&:hover": {
      backgroundColor: "#a3c4bc",
    },
  },
  select2: {
    fontFamily: "Overpass Mono",
    backgroundColor: "white",
    borderRadius: 50,
    height: "2rem",
    width: "15rem",
    fontSize: "0.75rem",
  },
  option2: {
    fontSize: "0.75rem",
    fontFamily: "Overpass Mono",
    "&:hover": {
      backgroundColor: "#a3c4bc",
    },
    margin: 0,
  },
});
function MarketPlace() {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const [sortMethod, setSortMethod] = React.useState(0);
  const getPostUrl = "https://dollarfinder.herokuapp.com/posts";
  const handleSelectChange = (event) => {
    setSortMethod(event.target.value);
  };
  const { data, loading } = useFetch(getPostUrl, "market");
  console.log(sortMethod);
  console.log(data);
  return (
    <div className="marketplace-background">
      <div className="marketplace-sortby-form">
        <label htmlFor="">Sort by: </label>
        <FormControl variant="outlined" className={classes.form}>
          <Select
            labelId=""
            id=""
            value={sortMethod}
            onChange={handleSelectChange}
            className={matches ? classes.select : classes.select2}
          >
            <MenuItem
              value={0}
              className={matches ? classes.option : classes.option2}
            >
              Price: Low - High
            </MenuItem>
            <MenuItem
              value={1}
              className={matches ? classes.option : classes.option2}
            >
              Price: High - Low
            </MenuItem>
            <MenuItem
              value={2}
              className={matches ? classes.option : classes.option2}
            >
              Date: Newest - Oldest
            </MenuItem>
            <MenuItem
              value={3}
              className={matches ? classes.option : classes.option2}
            >
              Date: Oldest - Newest
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="posts-background">
        {loading ? (
          <p>Loading</p>
        ) : (
          data
            .filter(
              (obj) =>
                obj.hasOwnProperty("id") &&
                obj.hasOwnProperty("title") &&
                obj.hasOwnProperty("price") &&
                obj.hasOwnProperty("location") &&
                obj.hasOwnProperty("date") &&
                obj.hasOwnProperty("img")
            )
            .map((obj) => {
              return <Postmini key={obj.id} {...obj} />;
            })
        )}
      </div>
    </div>
  );
}

export default MarketPlace;
