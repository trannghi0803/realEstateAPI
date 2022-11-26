import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface IProps {
    visible: boolean;
}

export default function ControlLoading(props: IProps) {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={props.visible}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 500,
            color: "#fff",
        },
    }),
);
