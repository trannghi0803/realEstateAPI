import React, { useRef, useState } from "react";
import { ArrowDropDown } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ClickAwayListener, Grow, MenuList, Paper, Popper, } from "@material-ui/core";
import "./ComponentStyles.css";
interface IProps {
    children: React.ReactNode;
    active?: boolean;
    title: string;
}
const useStyles = makeStyles(() => ({
    dropdownToggleActive: {
        color: `#1b93f3`,
    },
    menu: {
        zIndex: 10
    },
    dropdownToggle: {
        fontSize: "1.3rem",
        fontWeight: 500,
        textTransform: "initial",
        margin: `0rem 0.5rem`,
        "&:hover": {
            backgroundColor: "transparent"
        },
    }
}));
const DropdownMenu: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const { children } = props;
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    }

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={`${props.active ? classes.dropdownToggleActive : ""} ${classes.dropdownToggle}`}>
                {props.title}
                <ArrowDropDown />
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                className={`${classes.menu} menu-dropdown`}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                        }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}>
                                    {children}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export default DropdownMenu;
