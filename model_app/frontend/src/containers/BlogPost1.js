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

const post1url = "https://covidweb.isi.jhu.edu/developmentblog/Machine-Learning-Website";

const message =
  "Check out this article from the Delineo Disease Modeling Project";

function Post1(props) {
  //let history = useHistory();
  const classes = useStyles();
  return (
    <div className="App">
      <div className="center">
        <h2 style={{ color: "black", fontWeight: "bold", marginTop: "2%" }}>
          Machine Learning Website Development
        </h2>
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
                      <TwitterButton message={message} url={post1url}>
                        <TwitterIcon fontSize="small" />
                      </TwitterButton>
                    </MenuItem>

                    {/* IN ORDER TO HAVE A FACEBOOK SHARE, WE NEED A VALID FB APP ID 
                                  see: https://webkul.com/blog/how-to-generate-facebook-app-id/
                              */}


                    {/* <MenuItem
                      style={{ color: "black" }}
                      onClick={popupState.close}
                    >
                      {" "}
                      <FacebookButton
                        message={message}
                        url={post1url}
                        appId={"appId"}
                      >
                        <FacebookIcon fontSize="small" />{" "}
                      </FacebookButton>
                    </MenuItem> */}
                    <MenuItem
                      style={{ color: "white" }}
                      onClick={popupState.close}
                    >
                      <EmailButton message={message} url={post1url}>
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
            Our model uses the Iterative Proportional Fitting Procedure (IPFP),
            a classical algorithm in computer science that performs data scaling
            based on current datasets, to create a mobility network containing
            information about the number of individuals (agents) traveling from
            each Census Block Group (CBG) to Point of Interest (POI). A Census
            Block Group is the smallest geographical unit for which the Census
            bureau publishes sample data, and has a population of around 600 to
            3000 people. We define a POI as any location that an agent can visit
            such as a coffee shop, school, workplace, etc.
          </p>

          <figure>
            <img
              width="50%"
              height="50%"
              src="/blogpostPic1.png"
              alt="POI"
              title="POI Visual"
            />
            <figcaption>Figure 1 - Person of Interest Visual</figcaption>
          </figure>
          <p className={classes.text}>
            The data company Safegraph provides our model with accurate datasets
            outlining how many people from each CBG arrive at a particular POI
            every hour. In line with the value we place in users’ privacy,
            Safegraph data is completely anonymous and does not reveal any
            identifying information. We leverage this dataset to construct a CBG
            Marginal and a POI Marginal that are linked to the Visit Matrix
            which records the number of people travelling from a Census Block
            Group to a Point of Interest. Since all POI’s have varying durations
            of visit, we made two assumptions. One, that each visitor to a POI
            spends a median length of time calculated in that POI and two, that
            each new visitor in a POI is equally likely to arrive again any time
            from that time to the next hour. Extreme outliers are also
            truncated. The Dwell Time Correction Factor is then used to adjust
            the CBG and POI values, which are used in IPFP to calculate the
            adjusted visitor matrix that can serve as a probabilistic model for
            the general mobility network.
          </p>
          <figure>
            <img
              width="60%"
              height="40%"
              src="/blogpostPic2.png"
              alt="Visit Matrix"
              title="Visit Matrix Visual"
            />
            <figcaption>Figure 2 - Visit Matrix Visual</figcaption>
          </figure>
          <p className={classes.text}>
            Through our past work, we modeled trajectories for individual
            agents. After extrapolating that data to represent 20% of the US
            population, we scaled it up by a predetermined factor in the IPFP
            process to accurately delineate the complete picture. Our method
            also tries to reduce information entropy and limits the amount of
            error. Once a mobility network has been assembled using our Machine
            Learning model, we intend to integrate it with the main simulation.
            We can then assign members of our synthetic population to each
            ‘role’ (POI) depending on their CBG and have a simulation that
            accurately tracks real-world behaviour, trends, demographics and
            restrictions such as stay-at-home orders. In the future, we plan to
            utilize and compare Safegraph data over different months (eg, in
            January 2020, when there were no COVID restrictions, compared to
            March 2020, when regional lockdowns were in place) to search for
            notable patterns and supply our model different training sets. We
            also plan to incorporate more metrics such as how many people from
            each POI go to another POI, which will enhance the precision of our
            model. The model also needs to account for the mobility networks of
            populations not included in the dataset such as prisoners, homeless
            individuals, children under 13, or adults without cell phones.
          </p>
          <Toolbar></Toolbar>
        </Grid>
      </div>
    </div>
  );
}

export default Post1