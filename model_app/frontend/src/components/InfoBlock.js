import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from './StyledButton';
import Carousel from './CarouselSection';
import anytownScreenshot from "../images/anytownScreenshot.png";
import homepagecode from '../images/simulator_img.png'

const useStyles = makeStyles((theme) => ({
    carousel: {
        padding: '100px',
        marginTop: '50px',
        color: 'white',
    },
    base: {
        borderTop: '3px solid #66FCF1'
    },
    description: {
        fontSize: '20px',
        letterSpacing: '0.75px',
        padding: '20px 50px',
        color: 'white',
        maxWidth: '1500px',
        margin: 'auto',
        
        //Styling for screen size less than 550px
        [theme.breakpoints.down('550')]: {
            padding: '5px 5px 20px 5px',
            fontSize: '15px'
        },
    },
    img: {
        width: '70%',
        height: '100%',
        paddingBottom: '30px',
        borderBottom: '3px solid #66FCF1'
    },

    gallery: {
        padding: '150px 50px 100px 50px',

        [theme.breakpoints.down('550')]: {
            padding: '50px 20px 0px 20px',
        },
    },

    title: {
        color: 'white',

        [theme.breakpoints.down('550')]: {
            fontSize: '2rem',
        },
    },

    grid: {
        marginBottom: '50px'
    },

    border: {
        width: '200px',
        margin: 'auto',
        borderTop: '3px solid #66FCF1',
        marginBottom: '10px'
    },
}));

function setParams(subject) {
    var title = '';
    var description = '';
    var link = '';
    var buttontxt = '';
    var images = [];
    var captions = [];
    var alts = [];
    if (subject === 'simulation') {
        title = 'SIMULATION';
        description = "Viruses, such as the one that causes COVID-19, spread quickly through large cities because of a complex web of interactions between people taking place in a densely populated area. But how viruses move from person to person in smaller, rural communities is less well understood, resulting in public health and economic decisions that are made on the basis of scant information and overgeneralized modeling. The Delineo project is developing a distributed programming environment to run the model over large numbers of computers to scale up the areas that can be accurately modeled.";
        buttontxt = 'VIEW SIMULATION';
        link = '/simulator';
        images[0] = homepagecode;
        images[1] = anytownScreenshot;
        alts[0] = 'Screenshot of Anytown, USA with configurations.';
        alts[1] = 'Screenshot of zoomed-in buildings in Anytown, USA.';
        captions[0] = 'Anytown, USA is an illustrative tool designed to demonstrate the capabilities of the Delineo simulation. '
        captions[1] = 'The population, facilities, and layout of Anytown, USA imitate a real-life small town within the US.'
    }
    return { title, description, buttontxt, link, images, captions, alts };
}

export default function InfoBlock(props) {
    const classes = useStyles();
    const { title, description, buttontxt, link, images, captions, alts} = setParams(props.subject);

    return (
        <div className={classes.base} style={{ backgroundColor: props.background }}>
            <div className={classes.gallery}>
                <Typography variant="h3" component="h2" className={classes.title}>
                    {title}
                </Typography>
                <div className={classes.border}></div>
                <Typography variant="body1" component="h2" className={classes.description}>
                    {description}
                </Typography>

                <Button href={link} size='large' color='inherit' >
                    {buttontxt}
                </Button>

                <div style={{ marginTop: '30px' }}>
                    {Carousel(captions, alts, images)}
                </div>
            </div>
        </div>
    );
}