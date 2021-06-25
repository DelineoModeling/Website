import React, { Component } from "react";
import "./GeneralSimulator.css";
import ConfigurationsPanel from "../components/ConfigurationsPanel";
import { Typography } from "@material-ui/core";
import okc_city from "../images/OKC_CITY.jpg";

class GeneralSimulator extends Component {
  constructor() {
    super();
    this.state = {
      configurations: {
        maskPercent: 25,
        capacityPercent: 25,
        massPercent: 25,
        stayAtHome: false,
        schoolsShutdown: false,
        restaurantsShutdown: false,
        gymsShutdown: false,
        barsShutdown: false,
        vaccinePercent: 25,
      }
    }
  }

  //Update configurations once user presses confirm
  updateConfigurations = (configs) => {
    this.setState({
      configurations: configs
    })
  }

  render() {
    return (
      
      <div className="content">
        <h1>
        Oklahoma City
        </h1>
        <div>
          <img
            img src={okc_city} alt="okc"
            height={100}
            width={375}
            style={{ alignSelf: 'center'}}
          />
        </div>

        <div>
          {/*PLEASE READ:
          ======================================================================================
          All the stuff below in this div are not needed, someone on Haley/Ryan's scrum team
          was kind enough to leave this here to show how to access the various state variables.
          Please remove and replace with the Population and POI info (see figma) when ready.
           */}
          <Typography>
            mask wearing percent: {this.state.configurations.maskPercent}
          </Typography>
          <Typography>
            capacity restrictions: {this.state.configurations.capacityPercent}
          </Typography>
          <Typography>
            mass testing: {this.state.configurations.massPercent}
          </Typography>
          <Typography>
            stay at home order: {this.state.configurations.stayAtHome.toString()}
          </Typography>
          <Typography>
            schools: {this.state.configurations.schoolsShutdown.toString()}
          </Typography>

          <Typography>
            restaurants: {this.state.configurations.restaurantsShutdown.toString()}
          </Typography>
          <Typography>
            gyms: {this.state.configurations.gymsShutdown.toString()}
          </Typography>
          <Typography>
            bars: {this.state.configurations.barsShutdown.toString()}
          </Typography>
          <Typography>
            vaccination percent: {this.state.configurations.vaccinePercent}
          </Typography>

        </div>
        <ConfigurationsPanel updateConfigs={this.updateConfigurations} configs={this.state.configurations}/>
      </div >
    );
  }
}

export default GeneralSimulator;