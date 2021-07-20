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
import { TwitterButton, EmailButton } from "react-social";
import TwitterIcon from "@material-ui/icons/Twitter";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";

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
  
const post3url = "https://covidweb.isi.jhu.edu/developmentblog/Simulation-Website";
  
const message = "Check out this article from the Delineo Disease Modeling Project";

function Post3(props) {
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
                alt="Shaopeng Zeng"
                src={'/iconPerson.png'}
                className={classes.avatar}
                variant="circle"
              />
              Shaopeng Zeng &#8226; March 2021
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
                        <TwitterButton message={message} url={post3url}>
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
                        <EmailButton message={message} url={post3url}>
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
            The Delineo simulator incorporates the relevant physical features of a particular 
            community of interest. Specifically, the number of households, and individual Facilities, 
            defined as points of interest such as retail outlets, restaurants, educational institutions, 
            offices, gyms, bars, healthcare facilities, places of worship, long-term care facilities, 
            jails/prisons, etc. Delineo uses this representation of the physical layer of a community as 
            the underlying model in which the members of a community, as well as visitors to it, move around and, 
            in some cases, spread disease as they move.
            </p>
            <figure>
              <div>
                <img
                  width="60%"
                  height="40%"
                  src="/blogpostPic6.jpg"
                  alt="Representative facilities in a community"
                  title="Representative facilities in a community"
                />
                <figcaption>
                  Figure 1 - Representative facilities in a community
                </figcaption>
              </div>
            </figure>
            <p className={classes.text}>
            The population will then be synthesized in two potential ways. The first way involves the 
            use of Python Stack. After incorporating additional demographic information such as gender, 
            age, race, and socioeconomic status into the synthetic population, the underlying medical 
            conditions are distributed among the population based on known demographic predispositions.  
            The second way to synthesize a given population is to explore the possibility of ingesting 
            demographic information and then creating a linear optimization model to set up constraints 
            such as the number of households with one person, two people, etc. as well as age distributions 
            in households, number of working people, and so on.
            </p>
            <p className={classes.text}>
            The simulator then generates mobility patterns of the users in the simulation zone. As agents 
            move through the various facilities available to them in the simulation, they may or may not 
            come in contact with individuals with COVID-19.
            </p>
            <p className={classes.text}>
            To generate the mobility patterns, the simulator employs a graph model that describes the degree 
            of connection between the overall community and each facility in the simulation, as well as 
            connections among the facilities themselves. A Markov process can use this graph model to simulate 
            how many people are visiting each facility at each moment in the simulation.
            </p>
            <p className={classes.text}>
            The Delineo team devises a way to quantify an individual's potential risk towards the Covid-19 
            in the simulation - severity risk (SR) score. An agent's possibility of contracting disease depends 
            on their severity risk (SR) score and the amount of viral load present in the community. The SR score, 
            which ranges from 0-100, takes into account sex, age, and underlying conditions. The SR score is derived 
            from the SR matrix. The rows of the matrix are separated by age, and the columns of the matrix are 
            separated by different underlying conditions. We allow for the small probability that an agent moves 
            into a state not predicted by the severity risk to account for unusual cases of perfectly healthy 
            people falling severely ill, or unhealthy people being asymptomatic.
            </p>
            <figure>
              <div>
                <img
                  src="/blogpostPic7.jpg"
                  width="60%"
                  height="40%"
                  alt="Overview of the Disease Model for an agent"
                  title="Overview of the Disease Model for an agent"
                />
                <figcaption>Figure 2 - Overview of the Disease Model for an agent</figcaption>
              </div>
            </figure>
            <p className={classes.text}>
            The SR score will be categorized into different severity states, such as 80/100 corresponds 
            to a “very high” risk state. Understanding an agent’s severity risk will elucidate the 
            agent’s likely infection trajectory and can inform as to what states/stages of infection 
            they should be in as their disease progresses. 
            </p>
            <figure>
              <div>
                <img
                  src="/blogpostPic8.jpg"
                  width="60%"
                  height="40%"
                  alt="An agent's disease trajectory based on viral load."
                  title="An agent's disease trajectory based on viral load."
                />
                <figcaption>Figure 3 - An agent's disease trajectory based on viral load</figcaption>
              </div>
            </figure>
            <p className={classes.text}>
            The amount of viral load present in a facility is a function of how many infected 
            agents were present in a facility in prior simulation time steps.Wells-Riley formula, 
            which has been extensively used in analyzing ventilation strategy and its association 
            to airborne infections.  
            </p>
            <p className={classes.text}>
            Non-pharmaceutical interventions (NPIs), such as guarantee or capacity restriction 
            order, can also affect the COVID-19 spread in the community. These will be modeled 
            by targeting different components of the simulation. For NPIs that are proven to 
            reduce viral spread (mask orders, frequent cleaning, etc.), an agent's severity 
            risk can be lowered correspondingly, and the infectiousness of a particular facility 
            can be similarly reduced. The Delineo system will also compare the effectiveness of 
            the combinations of different NPIs during the simulation process. 
            </p>
            <p className={classes.text}>
            To allow Delineo to be used by a variety of people in different communities, the 
            different modelling components (population model, mobility model, disease model, 
            facility infection model) are represented by a set of parameters that could be 
            set to represent different communities. 
            </p>
            <p className={classes.text}>
            In the future, the Delineo team will work on incorporating different formulas for 
            infectiousness in a facility and employing state-of-the-art multi-objective black-box 
            optimization algorithms designed by researchers from Tsukuba University in Japan. 
            We are also thankful for the partnerships of the researchers at the Tsukuba University 
            with the Mito City Public Health Center and the University of Tsukuba Hospital, as they 
            will provide the team with the means to hone the model and validate the results of the 
            simulation with the real-world data.
            </p>
            <Toolbar></Toolbar>
          </Grid>
        </div>
      </div>
    );
}
export default Post3