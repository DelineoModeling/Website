import React from "react";
// import { useHistory } from "react-router-dom";
import "./BlogPost.css";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import FacebookIcon from "@material-ui/icons/Facebook";
import ShareIcon from "@material-ui/icons/Share";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import {TwitterButton, EmailButton } from "react-social";
import TwitterIcon from "@material-ui/icons/Twitter";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";
import ameya from "../images/Ameya Dehade.jpg";

const useStyles = makeStyles((theme) => ({
    center: {
      justifyContent: "center",
      alignItems: "center",
      //marginBottom: "-50%",
      //maxWidth: "50%",
    },
  
    top: {
      display: "inline-block",
      marginTop: "-45px",
    },
    credit: {
      color: "black",
      marginTop: "-2%",
      marginBottom: "4%",
    },
    avatar: {
      display: "inline",
      marginRight: "0.7%",
      height: "30px",
      width: "30px",
      borderRadius: "50%",
    },
    text: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "left",
      lineHeight: "1.5",
      //padding: "20px 50px",
      //fontSize: "14pt",
      color: "black",
    },
  }));
  
const post2url = "https://covidweb.isi.jhu.edu/developmentblog/Simulation-Development";
  
const message = "Check out this article from the Delineo Disease Modeling Project";

function Post2(props) {
    // let history = useHistory();
    const classes = useStyles();
    return (
      <div className="App">
        <div className="center">
          <h2
            style={{
              color: "black",
              fontWeight: "bold",
              marginTop: "2%",
              marginBottom: "-1%",
            }}
          >
            Simulation Development
          </h2>
          <h5 style={{ color: "grey", fontWeight: "bold", marginBottom: "1%" }}>
            Learn more about the simulation process!
          </h5>
          <div>
            <div
              className="relative m-r-10 w-50 h-50 b-r-full"
              style={{
                backgroundImage:
                  'url("https://webassets.mongodb.com/_com_assets/cms/Siya-adfnai3e2j.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
  
            <h6>
              <img
                alt="Ameya Dehade"
                src={ameya}
                className={classes.avatar}
                variant="circle"
              />
              Ameya Dehade &#8226; March 2021
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton aria-label="share" {...bindTrigger(popupState)}>
                      <ShareIcon style={{ color: "black" }} />
                    </IconButton>
                    <Menu
                      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                      transformOrigin={{ vertical: "top", horizontal: "center" }}
                      {...bindMenu(popupState)}
                    >
                      <MenuItem
                        style={{ color: "black" }}
                        onClick={popupState.close}
                      >
                        <TwitterButton message={message} url={post2url}>
                          <TwitterIcon fontSize="small" />
                        </TwitterButton>
                      </MenuItem>
                      {/* <MenuItem
                        style={{ color: "black" }}
                        onClick={popupState.close}
                      >
                        {" "}
                        <FacebookButton
                          message={message}
                          url={post2url}
                          appId={"appId"}
                        >
                          <FacebookIcon fontSize="small" />{" "}
                        </FacebookButton>
                      </MenuItem> */}
                      <MenuItem
                        style={{ color: "white" }}
                        onClick={popupState.close}
                      >
                        <EmailButton message={message} url={post2url}>
                          <EmailIcon fontSize="small" />
                        </EmailButton>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </h6>
            <br />
            <h6 className={classes.credit}>
              <strong>Collaborators:</strong> Dr. Kimia Ghobadi, John C. Malone
              Assistant Professor in Civil Systems and Engineering at Johns
              Hopkins University
            </h6>
          </div>
          <Grid>
            <p className={classes.text}>
              Currently, the simulation team is working on the severity risk
              matrix, which is how they decide whether an agent is asymptomatic,
              mild, severe, or critical after their incubation period is over
              after exposure. The figure below illustrates the different stages
              before reaching the severity risk matrix determination.
            </p>
            <figure>
              <div>
                <img
                  width="60%"
                  height="40%"
                  src="/blogpostPic3.png"
                  alt="Severity Risk Matrix Determination"
                  title="Severity Risk Matrix Determination"
                />
                <figcaption>
                  Figure 1 - Severity Risk Matrix Determination
                </figcaption>
              </div>
            </figure>
            <p className={classes.text}>
              Currently, this is the proposed structure of the severity risk
              matrix.
            </p>
            <figure>
              <div>
                <img
                  src="/blogpostPic4.png"
                  width="60%"
                  height="40%"
                  alt="Severity Risk Matrix"
                  title="Severity Risk Matrix"
                />
                <figcaption>Figure 2 - Severity Risk Matrix</figcaption>
              </div>
            </figure>
            <p className={classes.text}>
              For the remainder of the semester, the simulation team will work on
              tasks related to the population and submodule representation. The
              population group will take the underlying health conditions and find
              distributions for population based on age and sex in order to
              distribute their findings to the synthetic population. The submodule
              representation group will instantiate a module with submodules
              corresponding the facilities list used in the prototype. Using a
              24-hour period, 3 trajectories will be created, where one trajectory
              has 24 nodes, representing a facility type: one for each of child,
              young adult, adult. Each person will be assigned a workplace and/or
              school corresponding to an appropriate submodule. A trajectory may
              look something like this: Home (12am - 8am) → Work (8am - 4pm) →
              Retail (4pm - 6pm) → Home (6pm onwards) A person assigned ‘retail’
              on their trajectory for the specific hour will be randomly assigned
              to a specific facility/submodule of that type. Each submodule should
              have a subgraph that connects people to each other. For the upcoming
              semester, the team would like to focus on assigning the probability
              of infection in its simulations. To start out, the group will
              analyze the simulation with a constant probability of infection. The
              steps are as follows: Before the simulation starts, infect a few
              random people in the population. Initially, all edge weights for
              each submodule graph can be set so that there’s a 30% chance someone
              gets infected if they are connected to an infected person. The
              output will be plotted to show the infected vs. time graph using
              matplotlib, which is similar to the initial prototype simulation.
              The Delineo team and simulation group also plan on implementing
              intervention for the upcoming semester.
            </p>
            <Toolbar></Toolbar>
          </Grid>
        </div>
      </div>
    );
}
export default Post2


