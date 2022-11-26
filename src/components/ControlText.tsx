import React from "react";
import { Typography, TypographyProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
interface IProps extends TypographyProps {
    type?: "header" | "item";
    textColor?: "main" | string;
    children: React.ReactNode;
}
const useStyles = makeStyles(() => ({
    header: {
        fontWeight: "bold",
        fontSize: "1.2rem",
        color: "#0F0E0E",
    },
    item: {
        color: "#0F0E0E",
    },
}))
const ControlText: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const { type, className, children } = props;
    const textStyle = type === "header" ? classes.header : classes.item;
    const textColor = props.textColor === "main" ? "#176E98" :  props.textColor ;
    return (
        <Typography
            style={{...props.style, color: textColor}}
            className={className ? `${textStyle} ${className}` : textStyle}
        >
            {children}
        </Typography>
    );
}

export default ControlText;