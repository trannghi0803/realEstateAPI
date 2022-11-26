import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { Menu as MenuIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import {
    MenuItem,
    Toolbar,
    IconButton,
    Typography,
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    Grow
} from "@material-ui/core";

import "./ComponentStyles.css";
import "../commons/styles/MainHeaderStyles.css";
import { clearGlobalState, GlobalState } from "../stores/GlobalState";
import { Screens, Strings, Resources, Constants } from "../constants";
import { AuthService } from "../app/services";
import { Helpers } from "../commons/utils";

interface IProps {
    onLogout?: () => void;
    handleDrawerToggle: () => void;
    classes?: any;
    title?: string;
    history?: any;
}

interface IState {
    loggedOut?: boolean;
    menuOpen: boolean;
    anchorEl: HTMLElement | null;
    avatarUri: any;
}

class AdminHeader extends PureComponent<IProps, IState> {
    history: any;
    constructor(props: any) {
        super(props);
        this.history = props.history;
        this.state = {
            menuOpen: false,
            anchorEl: null,
            avatarUri: Resources.Images.DEFAULT_AVATAR_URL
        };
    }

    public render() {
        const { classes, title } = this.props;
        if (this.state.loggedOut) {
            return <Redirect to={Screens.AUTH_LOGIN} push={true} />
        }
        return (
            <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.props.handleDrawerToggle}
                    className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography
                    //variant="h6"
                    color="textPrimary"
                    noWrap
                    className={classes.title}>
                    {title || ""}
                </Typography>

                <div className="info-user">
                    <div className="info" style={{ color: "#333333", marginRight: 8 }}>
                        <span>Chào {GlobalState.userInfo?.userName}</span>
                    </div>
                    <img
                        alt="avata"
                        className="avatar-img"
                        src={GlobalState.userInfo?.avatarUrl ? GlobalState.userInfo?.avatarUrl : this.state.avatarUri}
                        onClick={this.handleClick}
                        onError={this.onAvatarLoadError}
                    />
                    <Popper open={this.state.menuOpen}
                        anchorEl={this.state.anchorEl}
                        role={undefined}
                        transition
                        disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === "bottom" ? "center top" : "center bottom"
                                }}>
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList
                                            id="menu-list-grow"
                                            onKeyDown={this.handleListKeyDown}>
                                            <MenuItem onClick={() => {
                                                this.setState({
                                                    menuOpen: false
                                                });
                                                this.history.push(Screens.PROFILE)
                                            }}>{Strings.Header.USER_INFO}</MenuItem>
                                            <MenuItem key={Date.now()} onClick={this.onLogout}>{Strings.Header.LOGOUT}</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Toolbar>
        );
    }

    public handleClose = () => {
        this.setState({
            anchorEl: null,
            menuOpen: false
        })
    }

    public handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            anchorEl: event.currentTarget,
            menuOpen: true
        });
    }

    public handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab") {
            event.preventDefault();
            this.setState({
                menuOpen: false
            });
        }
    }

    public onLogout = () => {
        Helpers.showConfirmAlert("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?",
            async () => {
                this.handleClose();
                try {
                    GlobalState.showPageLoading();
                    const result = await new AuthService().logout();
                    //if (result?.statusCode === Constants.ApiCode.SUCCESS) {
                        sessionStorage.clear();
                        clearGlobalState();
                        this.history.push(Screens.AUTH_LOGIN);
                    // }
                    GlobalState.hidePageLoading();
                } catch (error) {
                    GlobalState.hidePageLoading();
                    return { status: false };
                }
            }
        )
    }

    public onAvatarLoadError = () => {
        this.setState({
            avatarUri: Resources.Images.DEFAULT_AVATAR_URL
        })
    }

}

const styles = () => ({
    toolbarRoot: {
        paddingRight: 24
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
        fontSize: "20px",
    },

    "@media (max-width: 768px)": {
        menuButton: {
            marginRight: 20,
        },
        title: {
            fontSize: "15px"
        }
    },
});

export default withStyles(styles)(AdminHeader);
