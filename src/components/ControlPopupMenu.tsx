import React from "react";
import { MoreHoriz } from "@material-ui/icons";
import { Grid, IconButton, Menu } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import "./ComponentStyles.css";

interface IProps {
	children?: React.ReactNode
}

const useStyles = makeStyles(() =>
	createStyles({
		formFilter: {
			padding: '0.5rem',
			background: 'white',
			boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',

		},

		popper: {
			zIndex: 99,
			['@media (max-width:450px)']: {
				width: "98% !important"
			}
		},

		icon: {
			color: "#626262",
			'&:hover': {
				color: "#42a5f5",
			},
		}
	}),
);

export default function ControlPopupMenu(props: IProps) {
	const classes = useStyles();
	const anchorEl = React.useRef<HTMLButtonElement>(null);
	const [open, setOpen] = React.useState(false);


	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorEl.current && anchorEl.current.contains(event.target as HTMLElement)) {
			return;
		}
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	function handleListKeyDown(event: any) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// // return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false && anchorEl.current) {
			anchorEl.current?.focus();
		}

		prevOpen.current = open;
	}, [open]);


	return (
		<Grid className="d-flex justify-content-sm-end">
			<IconButton
				ref={anchorEl}
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-label="FilterList"
				onClick={handleToggle}
				className={classes.icon}
			>
				<MoreHoriz />
			</IconButton>
			{/* <Popper
				placement="right-start"
				open={open} anchorEl={anchorEl.current}	 transition disablePortal
				className={classes.popper}>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
									<Grid className={classes.formFilter} onClick={handleClose}>
										{props.children}
									</Grid>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper> */}
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl.current}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={open}
				onClose={handleClose}
			>
				<Grid className={classes.formFilter} onClick={handleClose}>
					{props.children}
				</Grid>
			</Menu>
		</Grid>
	);
}
