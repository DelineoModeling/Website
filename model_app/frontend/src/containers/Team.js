import React, { Component } from "react";
import TeamFilter from "../components/TeamFilter";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./Team.css";

const styles = {
  root: {
    "& > *": {
      margin: 1,
    },
  },

  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },

  CardBackground: {
    backgroundColor: '#222629',
    height: '100%',
    minHeight: '100%',
    minWidth: '100%',
    margin: 0,
    alignContent: 'center',
    paddingBottom: '5%',
  },

  MainHeader: {
    backgroundColor: "#222629",

    minWidth: "100%",
    margin: 0,
    alignContent: "center",

    paddingBottom: "5px",
  },

  h3: {
    color: "white",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 0,

    width: "fit-content",
    paddingBottom: 0,
    paddingTop: "20px",
    fontSize: "50px",
  },
};

class Team extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.CardBackground}>
        <div className={classes.MainHeader} align="center">
          <Typography varient="h3" className={classes.h3} align="center">
            Meet the Team
          </Typography>
        </div>

        <div className={classes.CardBackground}>
          <TeamFilter></TeamFilter>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Team);
