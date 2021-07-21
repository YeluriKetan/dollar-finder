import React from "react";
import Postmini from "./Postmini";
import "./marketplace.css";
import { useGet } from "./useGet";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "./Loading";

const useStyles = makeStyles({
  form: {},
  select: {
    fontFamily: "Overpass Mono",
    backgroundColor: "white",
    borderRadius: 50,
    height: "2.5rem",
    width: "18.75rem",
    fontSize: "1rem",
    boxShadow: "2px 2px 4px 2px #979c82",
    "@media (max-width: 600px)": {
      height: "2rem",
      width: "15rem",
      fontSize: "0.75rem",
    },
  },
  option: {
    fontSize: "1rem",
    fontFamily: "Overpass Mono",
    "&:hover": {
      backgroundColor: "#a3c4bc",
    },
    "@media (max-width: 600px)": {
      fontSize: "0.75rem",
      margin: 0,
    },
  },
});
function MarketPlace() {
  const classes = useStyles();
  const [sortMethod, setSortMethod] = React.useState(0);
  const getPostUrl = "https://dollarfinder.herokuapp.com/posts";
  const handleSelectChange = (event) => {
    setSortMethod(event.target.value);
  };
  const { data, loading } = useGet(getPostUrl, "market");
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
            className={classes.select}
          >
            <MenuItem value={0} className={classes.option}>
              Price: Low - High
            </MenuItem>
            <MenuItem value={1} className={classes.option}>
              Price: High - Low
            </MenuItem>
            <MenuItem value={2} className={classes.option}>
              Date: Newest - Oldest
            </MenuItem>
            <MenuItem value={3} className={classes.option}>
              Date: Oldest - Newest
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="posts-background">
        {loading ? (
          <Loading />
        ) : (
          data
            .filter(
              (obj) =>
                obj.hasOwnProperty("id") &&
                obj.hasOwnProperty("title") &&
                obj.hasOwnProperty("price") &&
                obj.hasOwnProperty("location") &&
                obj.hasOwnProperty("date")
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
