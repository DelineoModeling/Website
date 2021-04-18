import React, { Component }  from 'react';

import TeamGridList from '../components/TeamGridList.js'
import SupGridList from '../components/SupGridList.js'
import LeadGridList from '../components/LeaderGridList.js'
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core';

import FullStackGridList from '../components/FullStackGridList.js';
import SimGridList from "../components/SimGridList.js";
import MLGridList from '../components/MLGridList.js';
import InfoTeamGridList from '../components/InfoTeamGridList.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    borderColor: '#66FCF1',
    backgroundColor: '#222629',
    border: '2px solid',
    color: '#66FCF1',
    fontWeight: 'bold',

    width: '200px',
    textAlign: 'center',


    '&$selected, &$selected:hover': {
      backgroundColor: '#66FCF1',
      color: '#222629',
      borderColor: '#66FCF1',
    },
    "&:hover": {
      backgroundColor: '#66FCF1',
      color: '#222629',
      borderColor: '#66FCF1',
    },
    '&:hover $selectedColor': {

      color: '#222629',

    }

  },

  selectedColor: {


  },

  CardGreenBackground1: {
    marginTop: '0%',
    backgroundColor:'#4A4E51',
  },
  h2: {
    color: 'white',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 0,
    borderBottom: '3px solid #66FCF1',
    width: 'fit-content',
    paddingBottom: 0,
    paddingTop: '20px',
    fontSize: 40,


  },
  h3: {
    color: 'white',
    marginRight: 100,
    marginLeft: 100,
    marginTop: 40,

    width: 'fit-content',

    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
     borderRadius: '25px',
     border: '2px solid #2f3538',
     padding: '20px 20px 20px 20px',
    backgroundColor: '#2f3538'


  },
  focus: {
    backgroundColor: '#222629',
    color: '#66FCF1',
    borderColor: '#66FCF1',
    border: '1px solid',
  },
  notfocus: {
    borderColor: '#66FCF1',
    backgroundColor: '#66FCF1',
    border: '1px solid',
    color: '#444f56',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,

    backgroundColor: '#66FCF1',
    color: '#66FCF1',

    margin: '0 auto',
    width: 'fit-content'
  },
  clickedOn: {

    color: '#222629',

  }


};

const ColorButton = withStyles((theme) => ({
  root: {
    borderColor: '#66FCF1',
    backgroundColor: '#66FCF1',
    border: '1px solid',
    color: '#444f56',
    fontWeight: 'bold',
    "&:hover": {
        backgroundColor: '#222629',
        color: '#66FCF1',
        borderColor: '#66FCF1',
    },
  },
    "&:active": {
    backgroundColor: '#222629',
    color: '#66FCF1',
    borderColor: '#66FCF1',
    border: '1px solid',
  }



}))(Button);

const ColorListItem = withStyles((theme) => ({
  root: {
    borderColor: '#66FCF1',
    backgroundColor: '#222629',
    border: '2px solid',
    color: '#66FCF1',
    fontWeight: 'bold',

    width: '200px',
    textAlign: 'center',


    '&.Mui-selected, &$.Mui-selected:hover': {
      backgroundColor: '#66FCF1',
      color: '#222629',
      borderColor: '#66FCF1',
    },
    "&:hover": {
      backgroundColor: '#66FCF1',
      color: '#222629',
      borderColor: '#66FCF1',
    },
    '&:hover $selectedColor': {

      color: '#222629',

    }
  }


}))(ListItem);




class TeamFilter extends Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.

  constructor(props) {
    super(props);
    this.state = {
      all: true,
      fs: false,
      sim: false,
      ml: false,
      info: false,
      backgroundColor: '#222629',
      color: '#66FCF1',
      borderColor: '#66FCF1',
    }
  this.changeDiv= this.changeDiv.bind(this);
}
  changeDiv() {
    this.setState({
      all: false,
      fs: false,
      sim: false,
      ml: false,
      info: false
  })
}



  render() {
    let inputStyle = {
      borderColor: '#66FCF1',
      backgroundColor: '#66FCF1',
      border: '1px solid',
      color: '#444f56',
    };


    const { classes } = this.props


    const { all } = this.state
    const { fs } = this.state
    const { sim } = this.state
    const { ml } = this.state
    const { info } = this.state

    const { showing} = this.state

    const highlightedAll = this.state.all ?  "classes.focus" : "classes.notfocus";


    return (
      <div  >
    <br/>
    <div className ={classes.flexContainer}>
        <List className = {classes.flexContainer} component="nav" aria-label="all fs sim ml info">
            <ColorListItem className ={classes.root}
              button
              onClick={() => this.setState({ all: true, fs: false, sim: false, ml: false, info: false})}
              selected = {all}

            >

              <ListItemText className = {this.state.all ? classes.clickedOn:classes.selectedColor} primary = {<Typography type="body2" style={{fontWeight: 'bold', fontSize: '16px'}}>All</Typography>}/>
            </ColorListItem>

            <ColorListItem
              button
              selected = {fs}
              onClick={() => this.setState({ all: false, fs: true, sim: false, ml: false, info: false})}
            >
              <ListItemText className = {this.state.fs ? classes.clickedOn:classes.selectedColor} primary = {<Typography type="body2" style={{fontWeight: 'bold', fontSize: '16px'}}>Fullstack</Typography>}/>
            </ColorListItem>
            <ColorListItem
              button
              selected = {sim}
              onClick={() => this.setState({ all: false, fs: false, sim: true, ml: false, info: false })}
            >

              <ListItemText className = {this.state.sim ? classes.clickedOn:classes.selectedColor} primary = {<Typography type="body2" style={{fontWeight: 'bold', fontSize: '16px'}}>Simulation</Typography>}/>
            </ColorListItem>
            <ColorListItem
              button
              selected = {ml}
              onClick={() => this.setState({ all: false, fs: false, sim: false, ml: true, info: false })}
            >
              <ListItemText className = {this.state.ml ? classes.clickedOn:classes.selectedColor} primary = {<Typography type="body2" style={{fontWeight: 'bold', fontSize: '16px'}}>Machine Learning</Typography>}/>
            </ColorListItem>
            <ColorListItem
              button
              selected = {info}
              onClick={() => this.setState({ all: false, fs: false, sim: false, ml: false, info: true })}
            >
              <ListItemText className = {this.state.info ? classes.clickedOn:classes.selectedColor} primary = {<Typography type="body2" style={{fontWeight: 'bold', fontSize: '16px'}}>Information Support</Typography>}/>
            </ColorListItem>



        </List>
        </div> 
        {/*
          <ColorButton mt={2} variant="contained" color="#66FCF1" onClick={() => this.setState({ all: true, fs: false, sim: false, ml: false, info: false})}>all</ColorButton>

          <ColorButton mt={2} variant="contained" color="#66FCF1"  onClick={() => this.setState({ all: false, fs: true, sim: false, ml: false, info: false})}>full stack</ColorButton>

          <ColorButton mt={2} variant="contained" color="#66FCF1"  onClick={() => this.setState({ all: false, fs: false, sim: true, ml: false, info: false })}>simulation</ColorButton>

          <ColorButton mt={2} variant="contained" color="#66FCF1"  onClick={() => this.setState({ all: false, fs: false, sim: false, ml: true, info: false })}>machine learning</ColorButton>

          <ColorButton mt={2} variant="contained" color="#66FCF1"  onClick={() => this.setState({ all: false, fs: false, sim: false, ml: false, info: true })}>infop</ColorButton>
        */}

          { all
              ?  <div>
                    <br></br>
                    <div>
                      <h2 className = {classes.h2} align='center'>Principle Investigator</h2>
                      <br/>
                      <SupGridList/>
                      <h2 className = {classes.h2} align="center">Team Leaders</h2>
                      <br/>
                      <LeadGridList></LeadGridList>
                      <h2 className = {classes.h2} align="center">Team Members</h2>
                      <br/>
                      <TeamGridList></TeamGridList>
                    </div>
                </div>

              : null
          }
          { fs
            ?  <div>
                  <div align ='center' >

                    <h3 className={classes.h3} align='center'>Members of the fullstack team work throughout the stack. Our web application is built using the MERN stack (MongoDB, Express, ReactJS, NodeJS) and Unity Webgl. Members of this team also manage and access our geolocation data.</h3>
                  </div>
                  <div>
                    <h2 className = {classes.h2} align="left">Team Members</h2>
                    <br/>
                    <FullStackGridList></FullStackGridList>
                  </div>
              </div>
              : null
          }
          { sim
            ?  <div>
                  <div align ='center' >
                    <h3 className={classes.h3} align ='center'>The simulation team is responsible for the implementation of the simulation that lies at the heart of the Delineo project. Team members focus on programming the various modules, algorithms, and statistical drivers that are utilized in our models.</h3>
                  </div>
                  <div >
                    <h2 className = {classes.h2} align="left">Team Members</h2>
                    <br/>
                    <SimGridList></SimGridList>
                  </div>
              </div>
              : null
          }
          { ml
            ?  <div>
                  <div align ='center' >
                    <h3 className={classes.h3}>The machine learning group is tackling the challenge of learning from the massive amounts of geolocation data the Delineo project has access to. One of the main focuses is on developing machine learning models that are capable of discerning and generating population movement patterns within communities ranging from rural towns to urban cities.</h3>
                  </div>
                  <div >
                    <h2 className = {classes.h2} align="left">Team Members</h2>
                    <br/>
                    <MLGridList></MLGridList>
                  </div>
              </div>
              : null
          }
          { info
            ?  <div>
                  <div align ='center' >
                    <h3 className={classes.h3}>The information support team is responsible for gathering, summarizing, and disseminating research articles/papers that prove helpful for informing the development of Delineo's model.</h3>
                  </div>
                  <div>
                    <h2 className = {classes.h2} align="left">Team Members</h2>
                    <br/>
                    <InfoTeamGridList></InfoTeamGridList>
                  </div>
              </div>
              : null
          }

      </div>
    );
  }
}
export default withStyles(styles)(TeamFilter);
