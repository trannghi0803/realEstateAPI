import React, { useState } from "react";
import { FormControl, FormHelperText, InputBase, InputBaseProps, InputLabel } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
interface IProps extends InputBaseProps {
    label?: string;
    containerClassName?: string;
    secure?: boolean;
    placeholder?: string;
    helperText?: string
}
const useStyles = makeStyles((theme) => ({
    input: {
        borderRadius: 10,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:focus": {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
    container: {
        position: "relative",
        width: '100%'
    },
    secureIcon: {
        position: "absolute",
        right: 10,
        top: 0,
        bottom: 0,
        cursor: "pointer",
        height: "100%",
        display: "flex",
        alignItems: "center"
    },
    form:{
        width: '100%',
        '& .MuiInputLabel-filled.MuiInputLabel-shrink':{
            transform: "translate(12px, -5px) scale(0.75)",
            background: "white",
            width: "fit-content",
        },
        '& .MuiInputLabel-filled':{
            transform: 'translate(12px, 12px) scale(1)',
        },
      
    }
}))
const ControlInputBase: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const { containerClassName = "", secure, placeholder } = props;
    const onShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const input = () => {
        if (secure) {
            return (
                <div className={classes.container}>
                    <InputBase
                        {...props}
                        classes={{ input: classes.input }}
                        type={showPassword ? "text" : "password"}
                        fullWidth={props.fullWidth !== undefined ? props.fullWidth : true}
                    />
                    <div
                        onClick={onShowPassword}
                        className={classes.secureIcon}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </div>
                </div>
            )
        }
        return (
            <FormControl variant="filled" className={classes.form}>
                {props.label && (
                    <InputLabel htmlFor="component-disabled">{props.label}</InputLabel>
                )}
                <InputBase
                    {...props}
                    classes={{ input: classes.input }}
                    fullWidth={props.fullWidth !== undefined ? props.fullWidth : true}
                    placeholder={placeholder}
                />
                <FormHelperText className="text-danger" id="component-error-text">{props.helperText}</FormHelperText>
            </FormControl>
           
        )
    }
    return (
        <div className={`${containerClassName} w-100`}>
            {/* {label && <Con textColor="main">{label}</Con>} */}
            {input()}
        </div>
    );
}

export default ControlInputBase;