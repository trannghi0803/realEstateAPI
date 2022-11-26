import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
    containerClassName?: string;
    onClick?: () => void;
    startIcon?: any;
    buttonName?: string;
    variant?: any;
    color?: any;
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      minWidth: 32,
      paddingLeft: 8,
      paddingRight: 8,
      "& .MuiButton-startIcon": {
        margin: 0
      }
    }
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function ControlButton(props: Props) {
  const classes = useStyles();
  // const theme = useTheme();
  // const {variant, color, containerClassName, onClick, startIcon, buttonName} = props;

  return (
    <div>
      <Button
        variant = {props.variant ? props.variant : "contained"}
        color= {props.color ? props.color : "primary"}
        className={classes.button}
        onClick={props.onClick}
        startIcon={props.startIcon}
      >
        <span className={classes.buttonText}>{props.buttonName}</span>
      </Button>
    </div>
  );
}