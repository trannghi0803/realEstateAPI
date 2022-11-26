import clsx from "clsx";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    AppBar, Drawer, Hidden, List, ListItem,
    ListItemIcon, ListItemText, IconButton,
} from "@material-ui/core";

import { MainHeader } from "../components";
import { IMenuItem } from "../commons/utils";
import { Constants, Resources } from "../constants";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            flexShrink: 0,
        },
    },
    mobileAppBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: `calc(100% - ${theme.spacing(9) + 1}px)`,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    toolbarSpacer: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: "#fff",
        whiteSpace: "nowrap",
        borderRightColor: theme.palette.primary.main,
    },
    content: {
        [theme.breakpoints.down("sm")]: {
            width: "100% !important"
        },
    },
    container: {
        overflow: "hidden"
    },
    list: {
        overflowY: "auto",
        overflowX: "hidden",
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        padding: "0 1rem",
    },
    contentOpen: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    contentClose: {
        width: `calc(100% - ${theme.spacing(9) + 1}px)`,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100vw - ${theme.spacing(11) + 1}px)`,
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(9) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(11) + 1,
        },
    },
    menuItem: {
        borderRadius: 12,
        border: "1px solid #176E98",
        marginBottom: ".5rem",
        backgroundColor: "#fff",
        "&.active": {
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
                backgroundColor: "rgb(23, 110, 152, 0.7)"
            }
        },
    }
}));

interface IProps {
    renderKey?: number;
    menu: IMenuItem[];
    children?: JSX.Element;
}

const MainLayout: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [open, setOpen] = useState(true);

    const handleMobileDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleClickMenuItem = (item: IMenuItem) => {
        if (item.callback) {
            item.callback();
            return;
        }
        sessionStorage.setItem(Constants.StorageKeys.MENU_INDEX, item.id);
    }

    const drawer = () => {
        const menuIndex = sessionStorage.getItem(Constants.StorageKeys.MENU_INDEX) || "";
        return (
            <div className={classes.container}>
                <div className={classes.toolbar}>
                    <Hidden xsDown implementation="css">
                        <img alt="icon" src={open ? Resources.Images.APP_LOGO : Resources.Images.APP_LOGO_MINI} style={{ width: open ? 100 : 20 }} />
                        <IconButton onClick={handleDrawerToggle}>
                            {
                                open ? <ArrowBack style={{ color: "#176E98" }} /> : <ArrowForward style={{ color: "#176E98" }} />
                            }
                        </IconButton>
                    </Hidden>
                </div>
                <List className={classes.list}>
                    {props.menu.map((item, index) => (
                        <NavLink key={index}
                            to={item.controller || "#"}
                            onClick={() => handleClickMenuItem(item)}>
                            <ListItem button
                                className={item.id === menuIndex ? classes.menuItem + " active" : classes.menuItem}>
                                <ListItemIcon>
                                    <img alt="icon" src={item.id === menuIndex ? item.iconSvgActive : item.iconSvg}
                                        style={{
                                            width: "1.5rem",
                                            height: "1.5rem"
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.tilte}
                                    style={{ color: item.id === menuIndex ? "#fff" : "#176E98" }}
                                />

                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </div>
        )
    };

    const container = (document as any).body || undefined;
    return (
        <div className={classes.root}>
            <Hidden smUp implementation="css">
                <AppBar position="fixed"
                    className={classes.mobileAppBar}
                    color="inherit">
                    <MainHeader
                        handleDrawerToggle={handleMobileDrawerToggle}
                    />

                </AppBar>
            </Hidden>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleMobileDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {drawer()}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        open={open}
                        onClose={handleDrawerToggle}
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx(classes.drawerPaper, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                        variant="permanent">
                        {drawer()}
                    </Drawer>
                </Hidden>
            </nav>
            <main
                className={classes.content + " " + (open ? classes.contentOpen : classes.contentClose)}>
                <Hidden smUp implementation="css">
                    <div className={classes.toolbarSpacer} />
                </Hidden>
                {props.children}
            </main>
        </div>
    );
}

export default MainLayout;
