import React from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Button from '../components/StyledButton';
import faqData from '../const/faqData';
import bgImg from '../images/Delineo-About.gif';
import InfoBlock from '../components/InfoBlock';
import './About.css'

const styles = {
	cardBackground: {
		backgroundColor: '#222629',
		height: '100%',
		
		minHeight: '100%',
		minWidth: '100%',
		margin: '0',
		alignContent: 'center',
		paddingBottom: '100px'
	},
	underline: {
		width: '200px',
		margin: 'auto',
		borderTop: '3px solid #66FCF1',
		marginBottom: '30px'
	},
	heading: {
		background: `no-repeat center/100% url(${bgImg})` ,
		backgroundColor: '#222629',
		padding: '70px 25% 70px 70px',
	},
	title: {
		fontSize: '1rem',
		fontWeight: '700',
		lineHeight: '2',
		paddingBottom: '10px',
		textAlign: 'left',
	},
	subtitle: {
		textAlign: 'left',
		fontWeight: '400',
		fontSize: '50px',
		lineHeight: '1.25'
	},
	border: {
		position: 'absolute',
		top: '300px',
		left: '20%',
		width: '100px',
		margin: 'auto',
		borderTop: '3px solid #66FCF1',
		marginBottom: '50px'
	},
	faq: {
		background: '#222629',
		padding: '50px 10% 100px 10%',
		maxWidth: '2000px',
		margin: 'auto'
	},
	faqSlots: {
		textAlign: 'left',
	},
	input: {
		padding: '10px',
		minWidth: '300px',
		margin: '10px 30px'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	button: {
		marginTop: '30px'
	},
	description: {
		fontSize: '16px',
		letterSpacing: '0.75px',
		color: 'black',
		paddingBottom: '50px',
		paddingTop: '50px',
	},
	contactCard: {
		paddingBottom: '30px',
		backgroundColor: 'rgba(125, 125, 125, 0.50)',
		width: '500px',
		margin:'auto',
	}
}

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);

const ColAccordion = withStyles({
	root: {
		backgroundColor: 'white',
		fontSize: '20px',
		color: 'black',
		border: '0px solid rgba(0, 0, 0, .125)',
		boxShadow: '0px 5px 5px black',
		borderRadius: '20px',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiAccordion);

const ColAccordionSummary = withStyles({
	root: {
		backgroundColor: '#66FCF1',
		borderBottom: '0px solid rgba(0, 0, 0, .125)',
		marginBottom: 0,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {
	},
})(MuiAccordionSummary);

class About extends React.Component {
	constructor() {
		super();
		this.MapDescription = "The Johns Hopkins Coronavirus Resource Center (CRC) is a continuously updated source of COVID-19 data and expert guidance. We aggregate and analyze the best data available on COVID-19 - including cases, as well as testing, contact tracing and vaccine efforts - to help the public, policymakers and healthcare professionals worldwide respond to the pandemic.";
		this.SimulationDescription = "Viruses, such as the one that causes COVID-19, spread quickly through large cities because of a complex web of interactions between people taking place in a densely populated area. But how viruses move from person to person in smaller, rural communities is less well understood, resulting in public health and economic decisions that are made on the basis of scant information and overgeneralized modeling. The Delineo project is developing a distributed programming environment to run the model over large numbers of computers to scale up the areas that can be accurately modeled.";
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.cardBackground}>
				<div className={classes.heading} id="heading-id">

					<Typography className={classes.title}>
						About Delineo
					</Typography>
					<Typography className={classes.subtitle} id="subtitle-id">
						Disease Modeling Simulation at Johns Hopkins University
					</Typography>
					</div>
				<InfoBlock subject={'simulation'} background='#222629'/>

				<div className={classes.faq}>
					<Typography variant="h3" component="h2" style={{ marginBottom: '-10px', marginTop: '50px' }}>
						FAQ
					</Typography>
					<div className={classes.underline}></div>
					<div className={classes.faqSlots}>

						{faqData.map((faq, i) => {
							return (
								<div style={{ padding: '10px' }} key={i + 'faq'}>
									<ColAccordion>
										<ColAccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="Model Param-content"
											id="Model Param-header"
											style={{ padding: '0 50px', fontWeight: '600' }}
										>
											{faq.question}
										</ColAccordionSummary>
										<AccordionDetails style={{ padding: '0 50px', backgroundColor: '#222629' }}>
											<Typography className={classes.description} style={{ color: '#ffffff' }}>
												{faq.answer}
											</Typography>
										</AccordionDetails>

									</ColAccordion>
								</div>)
						})}
					</div>
				</div>
				<div id="contact" style={{ backgroundColor: '#222629', padding: '50px 0' }}>
				<Paper className={classes.contactCard} id="contact-card-id">
					<Typography variant="h3" component="h2" style={{ marginBottom: '-10px', color: 'white', paddingTop: '50px' }}>
						Contact Us!
					</Typography>
					<div className={classes.underline}></div>
					<Typography varient='h3' component="h2" style={{color: 'white'}}>
						Let's get in touch!
					</Typography>
					<Typography varient='h1' component="h2" style={{ color: '#222629' }}>

						<form style={{ padding: '0 50px' }} className={classes.form} noValidate autoComplete="off">
							<input className={classes.input} id="input-id" type="text" placeholder="Name" required name="Name" />
							<input className={classes.input} id="input-id" type="text" placeholder="Email" required name="Email" />
							<input className={classes.input} id="input-id" type="text" placeholder="Subject" required name="Subject" />
							<input className={classes.input} id="input-id" type="text" placeholder="Comment" required name="Comment" />

							<Button endIcon={<SendIcon />} className={classes.button} type="submit" size="large" varient='contained'>
								SEND MESSAGE
							</Button>
						</form>
					</Typography>
					</Paper>
				</div>
			</div >
		);
	}
}
export default withStyles(styles)(About);
