import React from "react";
import { ICodename } from "../commons/utils";
import {
    InputLabel,
    Select,
    MenuItem,
    SelectProps,
    FormHelperText
} from "@material-ui/core";
import { useState } from "react";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

interface IProps extends SelectProps {
    errorMessage?: string;
    data: ICodename[];
    onChangeValue: (value: any) => void;
    containerClassName?: string;
}

const useStyles = makeStyles((theme) => ({
    label: {
        width: "fit-content",
        margin: "0 1rem 0",
        fontWeight: "bold",
    },
    paper: {
        // DEFINE LATER
    },
    select: {
        color: theme.palette.primary.main,
        fontWeight: "bold",
        "&:focus": {
            backgroundColor: "unset"
        }
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        background: "#fff",
        "& li.Mui-selected": {
            color: "#ffffff",
            background: theme.palette.primary.main
        },
    }
}))

const ControlHoriSelect: React.FC<IProps> = (props: IProps) => {
    const [value, setValue] = useState();
    const classes = useStyles();
    const { errorMessage, data, onChangeValue, containerClassName, ...rest } = props;

    const onChange = (event: any) => {
        const value = event.target.value
        setValue(value)
        onChangeValue && onChangeValue(value);
    }

    return (
        <div className="d-inline-flex align-items-center w-100">
            <InputLabel className={classes.label}>{props.label}:</InputLabel>
            <Select
                {...rest}
                style={{ flex: 1 }}
                classes={{ root: classes.select }}
                IconComponent={(props) => <ExpandMore {...props} style={{color: "#176E98"}} />}
                MenuProps={{
                    classes: {
                        paper: classes.paper,
                        list: classes.list
                    },
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                }}
                value={value}
                disableUnderline
                onChange={onChange}>
                {
                    data.map((item, index) => (
                        <MenuItem key={index}
                            value={item.code}>
                            {item.name}
                        </MenuItem>
                    ))
                }
            </Select>
            <FormHelperText>{errorMessage}</FormHelperText>
        </div>
    );


}

export default ControlHoriSelect;
