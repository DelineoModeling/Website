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
  quote: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    lineHeight: "1.5",
    //padding: "20px 50px",
    //fontSize: "14pt",
    color: "black",
  },
  hyperlink: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    lineHeight: "1.5",
    color: "black",
    textIndent: "40px",
  },
}));

const post4url = "https://covidweb.isi.jhu.edu/developmentblog/Wells-Riley-Equation";

const message =
  "Check out this article from the Delineo Disease Modeling Project";

function Post4(props) {
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
          Wells-Riley Equation in Delineo
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
              alt="Ian Zheng"
              src={'/iconPerson.png'}
              className={classes.avatar}
              variant="circle"
            />
            Ian Zheng &#8226; July 2021
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
                      <TwitterButton message={message} url={post4url}>
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
                      <EmailButton message={message} url={post4url}>
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
          The beauty of the Delineo simulation is that it uses a modular 
          approach to simulate the infectiousness of COVID-19 by building 
          on different places of interest (POI). In a real-world scenario, 
          the infectiousness of COVID-19 will vary city by city based on the 
          number of grocery stores, gyms, places of worship and other POI. 
          These all contribute to the spread of disease differently given the 
          variation of density of infectors, different air flow rates, 
          ventilation, as well as a number of other factors. 
          </p>
          <p className={classes.text}>
          The Wells-Riley Equation was developed by William F. Wells and his 
          colleagues during a measles outbreak in 1978 based on ‘quantum of infection’ 
          as proposed by Richard L. Riley. The equation was created to 
          determine the probability of susceptible individuals being infected by 
          an airborne transmissible disease in a room when other infectors are present.
          To get the probability of infection, we can put in variables including number 
          of infectors, average breathing rate, quantageneration rate, exposure time, 
          and air flow rate from HVAC systems. The equation is valuable because of its 
          ability to evaluate the transmission of airborne diseases, like COVID-19, 
          between individuals in defined spaces rather than the spread through a 
          general population. 
          </p>
          <figure>
            <div>
              <img
                width="60%"
                height="40%"
                src="/blogpostPic5.jpg"
                alt="The Wells-Riley Equation"
                title="The Wells-Riley Equation"
              />
              <figcaption>
                <cite>THE WELLS-RILEY EQUATION AND COVID-19: REDUCING RISK IN INDOOR ENVIRONMENTS</cite>, AJ Lowry, Engineer
              </figcaption>
            </div>
          </figure>
          <p className={classes.text}>
          The beauty lies in simplicity; only a few variables are needed for 
          the calculation. The simplistic nature provides us with scalability 
          and modular growth. Our research allows us to perfect the result of 
          infectiousness in different POIs using the Wells-Riley equation. 
          We can then model any town in the US by ‘building out’ the cities - 
          using our research we can represent all the POIs of the town. 
          Combining the Wells-Riley equation and cross referencing of census 
          and geo-location data, Delineo can be used to build an accurate model 
          of any town in the US and the probability of infection of airborne COVID-19. 
          </p>
          <p className={classes.text}>
          Moreover, in the simulation users can customize different interventions 
          and see their effect on the spread of disease. This includes non-pharmaceutical 
          interventions such as requiring masks and social distancing, as well as 
          pharmaceutical interventions like vaccines. Each intervention correlates with 
          variables in Wells-Riley Equation. For example, capacity restrictions could lower 
          the probability of infection by influencing the number of infector individuals 
          in the space.
          </p>
          <p className={classes.text}>
          Well-Riley Equation enables us to use quantifiable variables to investigate 
          the transmission of COVID-19 with scalability. We aim to provide a more 
          accurate picture to the public for understanding how COVID-19 is transmitted 
          and how interventions will affect the transmission. 
          </p>
          <blockquote>
            <p className={classes.text}>
            "Before, we could only imagine or estimate the infectiousness of COVID-19 
            in different facilities. With this equation, we are able to shift quantifiable 
            variables that are distinct to each facility, and this is amazing." 
            </p>
            <p className={classes.quote}><b>--Serena Chan, Simulation Team Lead</b></p>
          </blockquote>
          <p className={classes.text}>Additional Readings: </p>
          <p className={classes.hyperlink}>
          <a href="https://pubmed.ncbi.nlm.nih.gov/19874402/">
              Review and comparison between the Wells–Riley and dose‐response 
          approaches to risk assessment of infectious respiratory diseases 
          </a>
          </p>
          <p className={classes.hyperlink}>
          <a href="https://www.kw-engineering.com/
          reduce-risk-covid-19-indoor-air-conditioning-hvac-ventilation-buildings-wells-riley-equation/">
              REDUCING THE RISK OF COVID-19 IN INDOOR ENVIRONMENTS USING THE 
              WELLS-RILEY EQUATION: WHITEPAPER 
          </a>
          </p>
          <p className={classes.hyperlink}>
          <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2843948/">
              Mathematical models for assessing the role of airflow on the risk of airborne infection in hospital wards 
          </a>
          </p>

          <Toolbar></Toolbar>
        </Grid>
      </div>
    </div>
  );
}
export default Post4