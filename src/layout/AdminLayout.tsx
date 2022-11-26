import clsx from "clsx";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    AppBar, Drawer, Hidden, Icon, List,
    ListItem, ListItemIcon, ListItemText,
    Collapse, Container, Grid,
} from "@material-ui/core";

import { AdminHeader } from "../components";
import { GlobalState } from "../stores/GlobalState";
import { Helpers, IMenuItem } from "../commons/utils";
import { Constants, Resources, Screens, Strings } from "../constants";

const drawerWidth = 240;

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
        justifyContent: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    toolbarSpacer: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: `#dcede2`,
        whiteSpace: "nowrap",
    },
    content: {
        [theme.breakpoints.down("sm")]: {
            width: "100% !important"
        },
    },
    contentOpen: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    contentClose: {
        width: `calc(100% - ${theme.spacing(9) + 1}px)`,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100vw - ${theme.spacing(11) + 1}px)`,
        },
        [theme.breakpoints.up("lg")]: {
            width: "100% !important",
        },
    },
    contentCloseMaxWidthLg: {
        [theme.breakpoints.up("lg")]: {
            maxWidth: "100% !important",
        },
    },
    brandName: {
        fontSize: "1.5rem",
        background: "rgb(40, 53, 147)",
        color: "#ffffff"
    },
    container: {
        overflow: "hidden"
    },
    list: {
        overflowY: "auto",
        overflowX: "hidden",
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        paddingBottom: `50px !important`
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
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    active: {
        backgroundColor: "#007F2E",
        '& .MuiTypography-body1': {
            color: 'white'
        },
        '& .MuiIcon-root': {
            color: "white !important",
        },
        '&:hover': {
            backgroundColor: '#007F2E',
        }
    },
}));

interface IProps {
    renderKey?: number;
    // menu: IMenuItem[];
    children?: JSX.Element;
}

export default function AdminLayout(props: IProps) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [menu, setMenu] = React.useState<IMenuItem[]>();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [subMenuOpen, setSubMenuOpen] = React.useState(false);

    const history = useHistory();

    const handleMobileDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleClickMenuItem = (item: IMenuItem) => {
        if (item.subMenu && item.subMenu.length > 0) {
            setSubMenuOpen(!subMenuOpen);
            return;
        }
        sessionStorage.setItem(Constants.StorageKeys.MENU_INDEX, item.id);
    }


    const menuItem = (item: IMenuItem, index: number) => {
        const menuIndex = sessionStorage.getItem(Constants.StorageKeys.MENU_INDEX) || "";
        return (
            <NavLink key={index} to={item.controller || "#"} onClick={() => handleClickMenuItem(item)}>
                <ListItem button
                    className={item.id === menuIndex ? classes.active : ""}>
                    <ListItemIcon>
                        <Icon style={{ color: "#007F2E" }}>{item.iconName}</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary={item.tilte}
                        style={{ color: "#007F2E" }}
                    />
                </ListItem>
            </NavLink>
        );
    }

    const urlCurrent = window.location.pathname;
    useEffect(() => {
        // const profile =  new BaseService().UserInfo();
        // let menu: Array<any> =[];
        // Promise.all([profile]).then((data: any) => {
        //     data[0]?.menus?.map((item: any) =>{
        //        return menu.push(JSON.parse(item.targetParameter));
        //     })
        //     setMenu(menu);
        // })

        const menu = [

            //Quản lý nhân viên
            {
                id: "1",
                tilte: Strings.User.TITLE,
                iconName: "person",
                controller: Screens.ADMIN_USER
            },
            {
                id: "2",
                tilte: Strings.Category.TITLE,
                iconName: "category",
                controller: Screens.ADMIN_CATEGORY
            },
            {
                id: "3",
                tilte: Strings.RealEstate.TITLE,
                iconName: "home_work",
                controller: Screens.ADMIN_REAL_ESTATE
            },
            {
                id: "4",
                tilte: Strings.News.TITLE,
                iconName: "feed",
                controller: Screens.ADMIN_NEWS
            },

        ]
        setMenu(menu);

        const itemMenu = (menu || []).find(item => item.controller === urlCurrent);
        if (itemMenu) {
            sessionStorage.setItem(Constants.StorageKeys.MENU_INDEX, itemMenu.id);
        }
    }, [urlCurrent]);

    const drawer = (
        <div className={classes.container}>
            <ListItem className="justify-content-center">
                <img alt="icon" src={open ? Resources.Images.REAl_ESTATE_LOGO : Resources.Images.REAl_ESTATE_LOGO} style={{ width: open ? 100 : 60 }} />
            </ListItem>
            <List className={classes.list}>
                {menu?.map((item, index) => {
                    if (item.subMenu && item.subMenu.length > 0) {
                        return (
                            <div key={index}>
                                <ListItem button onClick={() => handleClickMenuItem(item)}>
                                    <ListItemIcon>
                                        <Icon style={{ color: "#007F2E" }}>{item.iconName}</Icon>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.tilte}
                                        style={{ color: "#ffffff" }} />
                                    {
                                        subMenuOpen ? <ExpandLess htmlColor="rgb(238, 238, 238)" />
                                            : <ExpandMore htmlColor="rgb(238, 238, 238)" />
                                    }
                                </ListItem>
                                <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            item.subMenu.map((subItem, subIndex) => menuItem(subItem, subIndex))
                                        }
                                    </List>
                                </Collapse>
                            </div>
                        );
                    }
                    return menuItem(item, index);
                })}
            </List>
        </div>
    );

    const container = (document as any).body || undefined;

    return (
        <div className={classes.root}>
            <Hidden xsDown implementation="css">
                <AppBar position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                    color="inherit">
                    <AdminHeader
                        title={Helpers.getTitle()}
                        handleDrawerToggle={handleDrawerToggle}
                        history={history}
                    />
                </AppBar>
            </Hidden>
            <Hidden smUp implementation="css">
                <AppBar position="fixed"
                    className={classes.mobileAppBar}
                    color="inherit">
                    <AdminHeader
                        title={Helpers.getTitle()}
                        handleDrawerToggle={handleMobileDrawerToggle}
                        history={history}
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
                        {drawer}
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
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content + " " + (open ? classes.contentOpen : classes.contentClose)}>
                <div className={classes.toolbarSpacer} />
                <Container className={open ? "" : classes.contentCloseMaxWidthLg}>
                    <Grid className="mt-4 mb-4">
                        {props.children}
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
