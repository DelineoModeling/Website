import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { FormGroup } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: 'rgba(196,196,196,255)',
        margin: '2%',
        paddingBottom: '1%',
        borderRadius: '20px',
        justifyContent: 'space-around'
    },
    configurationsHeader: {
        backgroundColor: 'rgba(49,53,56,255)',
        paddingTop: '1%',
        paddingBottom: '1%',
        borderRadius: '5px',
        fontSize: '1.2rem',
        marginBottom: '2%',
    },
    panelSection: {
        textAlign: 'left',
        paddingTop: "2%",
        width: "30%"
    },
    confirmButtonPanel: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: "2%",
        width: "30%",
    },
    switchBase: {
        color: "rgba(49,53,56,255)",
        "&.Mui-checked": {
            color: "rgba(49,53,56,255)"
        },
        "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "rgb(102, 252, 241)",
            opacity: '1'
        }
    },
    switchTrack: {
        backgroundColor: "rgba(224,224,224,255)",
        opacity: "1"
    },
    sliderText: {
        color: "black",
        fontSize: "1.1rem",
        paddingLeft: "0",
        alignItems: "bottom"
    },
    switchText: {
        color: "black",
        paddingLeft: "0",
        fontSize: "1.1rem"
    },
    gridItemRight: {
        textAlign: "right"
    },
    centerText: {
        textAlign: "center",
    },
    button: {
        backgroundColor: "rgba(49,53,56,255)",
        color: "white",
        paddingLeft: "65px",
        paddingRight: "65px",
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'rgba(93, 96, 99)',
        },
        fontSize: '1rem'
    },
    inputPercent: {
        backgroundColor: "#989898",
        color: "black",
        borderRadius: "50px",
        width: "6ch",
        height: "35px",
        fontSize: "1rem",
        paddingRight: '5%',
        "& .MuiInputBase-input.Mui-disabled": {
            color:  "black",
            textAlign: 'center'
        }
    },
    unitText: {
        color: "black"
    },
    buttonSection: {
        textAlign: "center",
        paddingBottom: "25%"
    }
}));

const StyledSlider = withStyles({
    root: {
        color: 'rgba(49,53,56,255)',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: 'rgb(102, 252, 241)',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


function MaskSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(25);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        props.configs.maskPercent = sanitizePercentInput(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        props.configs.maskPercent = sanitizePercentInput(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div >
            <Grid container direction="row" alignItems="center">
                <Grid item xs={9}>
                    <Typography className={classes.sliderText}>
                        Mask-Wearing
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.gridItemRight}>
                    <Input
                        className={classes.inputPercent}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={true}
                        disableUnderline={true}
                        fullWidth={true}
                        endAdornment={<InputAdornment position="end"><div className={classes.unitText}>%</div></InputAdornment>}
                        inputProps={{
                            style: {textAlign: 'right'}, 
                            step: 25,
                            min: 0,
                            max: 100,
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledSlider
                        value={typeof value === 'number' ? value : 0}
                        step={25}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
function CapacitySlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(25);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        props.configs.capacityPercent = sanitizePercentInput(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        props.configs.capacityPercent = sanitizePercentInput(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={9}>
                    <Typography className={classes.sliderText}>
                        Capacity Restrictions
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.gridItemRight}>
                    <Input
                        className={classes.inputPercent}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={true}
                        disableUnderline={true}
                        fullWidth={true}
                        endAdornment={<InputAdornment position="end"><div className={classes.unitText}>%</div></InputAdornment>}
                        inputProps={{
                            style:{textAlign:"right"},
                            step: 25,
                            min: 0,
                            max: 100,
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledSlider
                        value={typeof value === 'number' ? value : 0}
                        step={25}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

function MassSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(25);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        sanitizePercentInput(props.configs.massPercent = newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        props.configs.massPercent = sanitizePercentInput(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={9}>
                    <Typography className={classes.sliderText} >
                        Mass Testing
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.gridItemRight}>
                    <Input
                        className={classes.inputPercent}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disableUnderline={true}
                        disabled={true}
                        fullWidth={true}
                        endAdornment={<InputAdornment position="end"><div className={classes.unitText}>%</div></InputAdornment>}
                        inputProps={{
                            style:{textAlign:"right"},
                            step: 25,
                            min: 0,
                            max: 100,
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledSlider
                        value={typeof value === 'number' ? value : 0}
                        step={25}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

function StayAtHome(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        stayAtHome: false,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        props.configs[event.target.name] = event.target.checked;
    };

    return (
        <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={9}>
                <Typography className={classes.switchText}>
                    Stay-at-Home Order
                </Typography>
            </Grid>
            <Grid item xs={3} className={classes.gridItemRight}>
                <Switch checked={state.Home} classes={{ track: classes.switchTrack, switchBase: classes.switchBase }} onChange={handleChange} name="stayAtHome" />
            </Grid>
        </Grid>
    );
}

function TargetedShutdown(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        schoolsShutdown: false,
        restaurantsShutdown: false,
        gymsShutdown: false,
        barsShutdown: false,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        props.configs[event.target.name] = event.target.checked;
    };

    return (
        <FormGroup>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={6}>
                    <Typography className={classes.switchText}>
                        Schools
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItemRight}>
                    <Switch checked={state.Schools} classes={{ track: classes.switchTrack, switchBase: classes.switchBase }} onChange={handleChange} name="schoolsShutdown" />
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.switchText}>
                        Restaurants
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItemRight}>
                    <Switch checked={state.Restaurants} classes={{ track: classes.switchTrack, switchBase: classes.switchBase }} onChange={handleChange} name="restaurantsShutdown" />
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.switchText}>
                        Gyms
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItemRight}>
                    <Switch checked={state.Gyms} classes={{ track: classes.switchTrack, switchBase: classes.switchBase }} onChange={handleChange} name="gymsShutdown" />
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.switchText}>
                        Bars
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItemRight}>
                    <Switch checked={state.Bars} classes={{ track: classes.switchTrack, switchBase: classes.switchBase }} onChange={handleChange} name="barsShutdown" />
                </Grid>
            </Grid>
        </FormGroup>
    );
}

function VaccinationSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(25);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        props.configs.vaccinePercent = sanitizePercentInput(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        props.configs.vaccinePercent = sanitizePercentInput(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={9}>
                    <Typography className={classes.sliderText}>
                        Vaccinated Population
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.gridItemRight}>
                    <Input
                        className={classes.inputPercent}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disableUnderline={true}
                        disabled={true}
                        fullWidth={true}
                        endAdornment={<InputAdornment position="end"><div className={classes.unitText}>%</div></InputAdornment>}
                        inputProps={{
                            style:{textAlign:"right"},
                            step: 25,
                            min: 0,
                            max: 100,
                            "aria-labelledby": "input-slider"
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledSlider
                        value={typeof value === "number" ? value : 0}
                        step={25}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

function ConfirmButton(props) {
    const classes = useStyles();
    const [showError, setShowError] = React.useState(false);

    const handleClick = (event) => {
        let configs = props.configs;
        if (configs.maskPercent < 0 || configs.capacityPercent < 0 || configs.massPercent < 0 || configs.vaccinePercent < 0) {
            setShowError(true);
        } else {
            props.updateConfigs(configs); //configs get updated in parent component
        }
    };

    //Closes invalid input toast
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowError(false);
    };

    return (
        <div>
            <FormControl className={classes.formControl}></FormControl>
            <Button
                variant="contained"
                className={classes.button}
                onClick={handleClick}
            >
                Confirm
            </Button>
            <Snackbar open={showError} autoHideDuration={3000} message="Invalid input value" onClose={handleClose} />
        </div>
    );
}

//Helper function to convert user inputs to be restricted between 0 and 100
//Returns -1 if input is not a number
function sanitizePercentInput(input) {
    if (isNaN(input) || typeof input !== "number") { //TODO: Test this logic
        return -1;
    }
    if (input > 100) {
        return 100;
    } else if (input < 0) {
        return 0;
    } else {
        return input;
    }
}

export default function ConfigurationsPanel(props) {
    const classes = useStyles();

    let configs = JSON.parse(JSON.stringify(props.configs)); //Create a deep copy of parent configurations

    return (
        <div className={classes.root}>
            <div className={classes.panelSection}>
                <Typography className={classes.configurationsHeader}>
                    NPI's
                </Typography>
                <MaskSlider configs={configs} />
                <CapacitySlider configs={configs} />
                <MassSlider configs={configs} />
                <StayAtHome configs={configs} />
            </div>
            <div className={classes.panelSection}>
                <Typography className={classes.configurationsHeader}>
                    Targeted Shutdowns
                </Typography>
                <TargetedShutdown configs={configs} />
            </div>
            <div className={classes.confirmButtonPanel}>
                <div>
                    <Typography className={classes.configurationsHeader}>
                        Vaccinations
                    </Typography>
                    <VaccinationSlider configs={configs} />
                </div>
                <div className={classes.buttonSection}>
                    <ConfirmButton updateConfigs={props.updateConfigs} configs={configs} />
                </div>
            </div>
        </div>
    );
}