import clsx from "clsx";
import React from "react";
import { InputBase } from "@material-ui/core";
import { CloseOutlined, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Strings } from "../constants";
import { Helpers } from "../commons/utils";

const useStyles = makeStyles((theme) => ({
    search: {
        // flex: 1,
        display: "flex",
        alignItems: "center",
        padding: ".2rem 0.5rem",
        borderRadius: "10px",
        width: "340px",
        backgroundColor: theme.palette.common.white,
        // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",        
        border: "1px solid #000",
        /*   backgroundColor: theme.palette.primary.main, */
        "&:hover": {
            /* backgroundColor: fade(theme.palette.primary.main, 0.8), */
            // borderColor: fade("#000164", 0.8),
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
        [theme.breakpoints.down("sm")]: {
            padding: ".05rem .2rem"
        }
    },
    searchIcon: {
        pointerEvents: "auto",
        color: "#00013c",
        "&:hover": {
            color: "#730101"
        },
    },
    inputRoot: {
        color: "#585858",
        flex: 1,
        // fontSize: "20px",
        marginLeft: "10px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "5px",
            // fontSize: "15px"
        }
    },
}));

interface IProps {
    containerClassName?: string;
    placeholder?: string;
    defaultValue?: string;
    onKeyPress?: (event: string) => void;
    onChangeValue?: (value: string) => void;
    onSearchClick?: () => void;
    onResetClick?: () => void;
}

const ControlSearchBox: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const { containerClassName } = props;
    return (
        <div className={clsx(classes.search, containerClassName)}>
            <div className={classes.searchIcon} >
                <Search onClick={props.onSearchClick} />
            </div>
            <InputBase
                classes={{
                    root: classes.inputRoot
                }}
                placeholder={props.placeholder || Strings.Common.SEARCH}
                defaultValue={props.defaultValue || ""}
                onKeyPress={(event) => {
                    if (event.key === 'Enter' && Helpers.isFunction(props.onKeyPress)) {
                        props.onKeyPress(event);
                    }
                }}
                onChange={(event: any) => {
                    if (Helpers.isFunction(props.onChangeValue)) {
                        const value = event.currentTarget ? event.currentTarget.value : "";
                        props.onChangeValue(value);
                    }
                }}
            />
            <div className={classes.searchIcon} >
                <CloseOutlined onClick={props.onResetClick} />
            </div>
        </div>
    )
}

export default ControlSearchBox;
