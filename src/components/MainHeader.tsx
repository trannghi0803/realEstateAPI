import React from "react";
import "./ComponentStyles.css";
import "../commons/styles/MainHeaderStyles.css";
import {
    Toolbar,
    IconButton,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
    handleDrawerToggle: () => void;
}

const useStyles = makeStyles((theme) => ({
    toolbarRoot: {
        paddingRight: 24
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
}))

const MainHeader: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const { handleDrawerToggle } = props;
    return (
        <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}>
                <MenuIcon />
            </IconButton>
        </Toolbar>
    );
}

export default MainHeader;
