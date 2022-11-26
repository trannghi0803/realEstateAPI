import React, { useMemo } from "react";
import { Helpers } from "../commons/utils";
import "./ComponentStyles.css";
import {
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    OutlinedInputProps,
    FormHelperText,
    OutlinedInput
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
interface IProps extends OutlinedInputProps {
    errorMessage?: string;
    notification?: any;
    onChangeValue: (value: any) => void;
    secure?: boolean;
    pattern?: string;
    placeholder?: string;
    containerClassName?: string;
    type?: string;
    label?: string;
    minRows?: number;
}

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
				padding: 0,
			},
			'& .MuiInputLabel-outlined': {
				transform: 'translate(14px,13px) scale(1)'
			},
			'& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
				transform: 'translate(14px, -6px) scale(0.75)'
			}
		},
	}),
);
const ControlInput: React.FC<IProps> = (props: IProps) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const classes = useStyles();
    const onChangeValue = (event: any) => {
        if (props.onChangeValue && Helpers.isFunction(props.onChangeValue)) {
            props.onChangeValue(event.target.value);
        }
    }
    
    const onShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const inputInstance = useMemo(() => {
        if (props.secure) {
            return (
                <OutlinedInput
                    {...props}
                    draggable={true}
                    id={`outlined-input-${new Date().getTime()}`}
                    onChange={onChangeValue}
                    type={showPassword ? "text" : "password"}
                    //autoComplete="off"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibilityOff"
                                onClick={onShowPassword}
                                onMouseDown={onMouseDown}
                                edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            )
        }
        return (
            <OutlinedInput
                {...props}
                id={`outlined-input-${new Date().getTime()}`}
                onChange={onChangeValue}
                //autoComplete="off"
            />
        );
    }, [showPassword])

    return (
        <FormControl
            className={`${props.containerClassName} ${classes.root}`}
            fullWidth
            variant="outlined"            
            error={!Helpers.isNullOrEmpty(props.errorMessage)}>
            <InputLabel htmlFor={`outlined-input-${new Date().getTime()}`}>{props.required ? `${props.label} *` : props.label}</InputLabel>
            {inputInstance}
            <FormHelperText id={`outlined-input-error-${new Date().getTime()}`}>{props.errorMessage}</FormHelperText>
        </FormControl>
    )
}

export default ControlInput;
