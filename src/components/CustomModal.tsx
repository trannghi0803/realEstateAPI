import React, { useEffect } from "react";
import "./ComponentStyles.css";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Backdrop, Fade, Grid, Modal, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(() =>
  createStyles({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: '#fff',
		width: `100%`,
		margin: `.5rem`,
		borderRadius: `8px`,
		outline: `none`,
		
	},
	medium:{},
	large:{},
	small:{},
	'@media (min-width: 576px)': {
		small:{
			maxWidth: `400px`,
			margin: `1.75rem auto`,
		},
		medium:{
			maxWidth: `500px`,
			margin: `1.75rem auto`,
		},
		large:{
			maxWidth: `800px`,
			margin: `1.75rem auto`,
		},
		contents:{
			maxHeight: `500px`,
		},
	},
	'@media (max-width: 576px)': {
		contents:{
			maxHeight: `550px`,
		},
	},
	'@media (max-width: 500px)': {
		contents:{
			maxHeight: `400px`,
		},
	},
	'@media (min-width: 1024px)': {
		contents:{
			maxHeight: `600px`,
		},
	},
	header:{
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: '1rem',
		borderBottom: '1px solid #e9ecef'
	},
	contents: {
		padding: '1rem',
		overflow: 'auto'
	},
  }),
);
interface IProps {
	show: boolean;
	children: React.ReactNode;
	onClose: (value: any) => void;
	header?: string;
	type?: "success" | "failure";
	onHide?: () => void;
	showActionButton?: boolean;
	onClickAction?: (type: string) => void;
	title?: string;
	classHeader?: string;
	sizeModal?: string; // medium small large fluid

}

interface IStateProps {
	image?: string;
	display?: boolean;
}
export default function CustomModal(props: IProps, states: IStateProps) {
	const { children } = props;
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	// const handleOpen = () => {
	//   setOpen(true);
	// };
  
	const handleClose = () => {
	  setOpen(false);
	  props.onClose(false);
	};
	useEffect(() => {
		setOpen(props.show);
	},[props.show]);
	return (
		<div>
		<Modal 
		  aria-labelledby="transition-modal-title"
		  aria-describedby="transition-modal-description"
		  className={classes.modal}
		  open={open}
		  onClose={handleClose}
		  closeAfterTransition
		  BackdropComponent={Backdrop}
		  BackdropProps={{
			timeout: 500,
		  }}
		>
		  <Fade in={open}>
			<div className={`${classes.paper} ${props.sizeModal === 'medium' ? classes.medium : props.sizeModal === 'large' ? classes.large : props.sizeModal === 'small' ? classes.small : '' }`}>
				<div className={`${classes.header} ${props.header ? '' : 'justify-content-end'}`}>
					{props.header ?
						<Typography variant="h6" gutterBottom className={`${props.classHeader} d-flex align-items-center`}>
							{props.header}
						</Typography>
						: ""
					}
					<CloseIcon  className="cursor-pointer" onClick={handleClose}/>
				</div> 
				<Grid className={classes.contents}>
					{children}
				</Grid>
				{props.showActionButton ?
					<div></div>
					: ""
				}
			</div>
		  </Fade>
		</Modal>
	  </div>
	);
}
