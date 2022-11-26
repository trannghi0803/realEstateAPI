import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { FilterList, Search } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button,  Fade, Grid, IconButton, TextField } from "@material-ui/core";
import "./ComponentStyles.css";
import Helpers from "../commons/utils/Helpers";
import { Strings } from "../constants";
import ControlDialog from "./ControlDialog";
interface IProps {
	placeholder?: string
	searchName?: string
	placeholderSearchSecond?: string
	isSearchSecond?: boolean
	searchSecond?: string
	dataSearch?: string[]
	widthInputSearch?: number;
	children?: React.ReactNode;
	maxWidthDialog?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
	onSearchText?: (value: string) => void
	onSearchSecond?: (value: string) => void
	onFilter?: (value: string) => void
	onReset?: (value: string) => void
	onClose?: () => void
}

const useStyles = makeStyles(() =>
	createStyles({
		formFilter: {
			padding: '2rem',
			background: 'white',
			boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
		},

		popper: {
			zIndex: 5,
			maxWidth: '50rem',
			'@media (max-width:450px)': {
				width: "98% !important"
			},
			'@media (min-width:450px) and (max-width: 1024px)': {
				maxWidth: '35rem',
			}
		},

		root: {
			'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
				padding: 0,
			},
			'& .MuiInputLabel-outlined': {
				transform: 'translate(14px,13px) scale(1)'
			},
			'& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
				transform: 'translate(14px, -6px) scale(0.75)'
			},
			'& .MuiAutocomplete-endAdornment': {
				top: "unset",
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

export default function CustomSearchFilter(props: IProps) {
	const classes = useStyles();
	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const [open, setOpen] = React.useState(false);
	const [openSearch, setOpenSearch] = React.useState(false);
	const [searchName, setSearch] = React.useState(props.searchName);
	const [searchSecond, setSearchSecond] = React.useState(props.searchSecond);

	const id = open ? 'menu-list-grow' : undefined;

	const handChangeSearchName = (val: any) => {
		const value = (val === 'null' || Helpers.isNullOrEmpty(val)) ? '' : val;
		setSearch(value)
		// if (!openSearch) {
		if (value === '' && Helpers.isFunction(props.onSearchText)) {
			props.onSearchText(value)
		}
		// }
	}

	const handChangeSearchSecond = (val: any) => {
		const value = (val === 'null' || Helpers.isNullOrEmpty(val)) ? '' : val;
		setSearchSecond(value)
		if (value === '' && Helpers.isFunction(props.onSearchSecond)) {
			props.onSearchSecond(value)
		}
	}

	const handSeachText = () => {
		if (Helpers.isFunction(props.onSearchText) && searchName) {
			props.onSearchText(searchName)
			if (Helpers.isFunction(props.isSearchSecond) && searchSecond) {
				props.onSearchText({ searchName, searchSecond })
			}
		}
	}
	const handSeachSecond = () => {
		if (Helpers.isFunction(props.onSearchSecond) && searchSecond) {
			props.onSearchSecond(searchSecond)
		}
	}

	const handleSearch = () => {
		if (openSearch) {
			Helpers.isNullOrEmpty(searchName) ? setOpenSearch(false) : setOpenSearch(true)
		}
		else {
			setOpenSearch(true)
		}
	}

	const handleFilter = () => {
		if (Helpers.isFunction(props.onFilter)) {
			props.onFilter()
			setOpen(false)
		}
	}

	const handleReset = () => {
		if (Helpers.isFunction(props.onReset)) {
			props.onReset();
			setOpen(false)
		}
	}

	const handleToggle = () => {
		setOpen(!open);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}
		setOpen(false);
	};

	return (
		<Grid className="d-flex justify-content-sm-end float-right">
			{
				Helpers.isFunction(props.onSearchText) &&
				<Grid className="d-flex justify-content-sm-end">
					<Fade in={openSearch || !Helpers.isNullOrEmpty(searchName)}>
						<Autocomplete
							freeSolo
							size="small"
							className={classes.root}
							style={{ minWidth: props.widthInputSearch || '180px' }}
							value={searchName || ''}
							options={props.dataSearch || []}
							getOptionLabel={(option) => option}
							onChange={(event, val) => {
								handChangeSearchName(val);
							}}
							onInputChange={(event, val) => {
								handChangeSearchName(val);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									size="small"
									variant="outlined"
									label={props.placeholder || ''}
									placeholder={props.placeholder || ''}
									onKeyPress={(e: any) => {
										if (e.key === "Enter") {
											handSeachText()
										}
									}}
								/>
							)}
						/>
					</Fade>
					{props.isSearchSecond &&
						<Fade in={openSearch || !Helpers.isNullOrEmpty(searchSecond)}>
							<Autocomplete
								freeSolo
								size="small"
								className={`${classes.root} ml-3`}
								style={{ minWidth: props.widthInputSearch || '180px' }}
								value={searchSecond || ''}
								options={props.dataSearch || []}
								getOptionLabel={(option) => option}
								onChange={(event, val) => {
									handChangeSearchSecond(val);
								}}
								onInputChange={(event, val) => {
									handChangeSearchSecond(val);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										size="small"
										variant="outlined"
										label={props.placeholderSearchSecond || ''}
										placeholder={props.placeholderSearchSecond || ''}
										onKeyPress={(e: any) => {
											if (e.key === "Enter") {
												handSeachSecond()
											}
										}}
									/>
								)}
							/>
						</Fade>
					}
					<Grid>
						{
							Helpers.isFunction(props.onSearchText) &&
							<IconButton
								ref={anchorRef}
								aria-controls={id}
								aria-haspopup="true"
								aria-label="Search"
								className={`${classes.icon} float-right p-2`}
								onClick={() => {
									handleSearch();
									handSeachText();
									handSeachSecond();
								}}
							>
								<Search />
							</IconButton>
						}
					</Grid>
				</Grid>
			}
			<Grid>
				{(Helpers.isFunction(props.onFilter)) &&
					<IconButton
						ref={anchorRef}
						aria-controls={id}
						aria-haspopup="true"
						aria-label="FilterList"
						onClick={handleToggle}
						className={`${classes.icon} float-right p-2`}
					>
						<FilterList />
					</IconButton>
				}
			</Grid>
			<ControlDialog maxWidth={props.maxWidthDialog || "md"} open={open} title={Strings.Common.FILTER} onClose={() => { setOpen(false); (Helpers.isFunction(props.onClose)) && props.onClose() }}>
				<Grid >
					<Grid >
						{props.children}
						<Grid className="d-flex justify-content-center m-3">
							<Button style={{ width: "fit-content" }}
								variant="contained"
								className=" mr-3"
								onClick={handleReset} >
								{Strings.Common.RESET}
							</Button>
							<Button style={{ width: "fit-content" }}
								variant="contained"
								color="primary"
								onClick={handleFilter} >
								{Strings.Common.FILTER}
							</Button>
						</Grid>
						{/* <span onClick={handleFilter} className="font-18 mr-3 cursor-pointer">{Strings.Common.FILTER}</span> */}
						{/* <span onClick={handleReset} className="font-18 text-primary cursor-pointer">{Strings.Common.RESET}</span> */}
					</Grid>
				</Grid>
			</ControlDialog>

			{/* <Popper
				placement="bottom-end"
				id={id}
				transition
				disablePortal
				open={open}
				anchorEl={anchorRef.current}
				className={classes.popper}>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: 'right top' }}
					>
						<Paper>
							<ClickAwayListener onClickAway={() => { }}>
								<Grid className={classes.formFilter}>
									<Close className="float-right cursor-pointer" onClick={handleClose} />
									<Grid >
										<span onClick={handleFilter} className="font-18 mr-3 cursor-pointer">{Strings.Common.FILTER}</span>
										<span onClick={handleReset} className="font-18 text-primary cursor-pointer">{Strings.Common.RESET}</span>
									</Grid>
									{props.children}
								</Grid>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper> */}
		</Grid>
	);
}
