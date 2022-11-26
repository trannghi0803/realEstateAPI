import React, { useEffect} from "react";
import "./ComponentStyles.css";
import Helpers from "../commons/utils/Helpers";
import { Strings } from "../constants";
import { ICodename } from "../commons/utils";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
    items: ICodename[];
    value?: string | number | string[] | number[];
    onChangeValue: (value: any) => void;
    disabled?: boolean;
    placeholder?: string;
    label: string;
    containerClassName?: string;
    errorMessage?: string;
    style?: any;
    required?: boolean;
    multiple?: boolean;
    variant?: string
}

interface IStateProps {
    selectedOption: any;
}
const useStyles = makeStyles(() => ({
    root: {
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            padding: 0,
        },
        '& .MuiInputLabel-outlined': {
            transform: 'translate(14px,13px) scale(1)'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)'
        },
        '& .MuiAutocomplete-endAdornment': {
            top: "unset",
        }
    },
}));

export default function ControlAutocomplete(props: IProps) {
    const [selectedOption, setSelectedOption] = React.useState<any>();
    const classes = useStyles();
    useEffect(() => {
        if(Array.isArray(props.value)) {
            if (props.value && props.items) {
                const selectedOption: ICodename[] = []
                props.value?.forEach((item: any) => {
                    const temp = props.items?.find(el => el.code == item)
                    temp && selectedOption.push(temp)
                })
                setSelectedOption(selectedOption);
            }
        } else {
            if (props.value !== selectedOption?.code) {
                if (props.items) {
                    const selectedOption = props.items?.find(el => el.code == props.value)
                    setSelectedOption(selectedOption)
                }
            }
        }
    }, [props.items, props.value]);
    
    const handleChange = (event: any, selectedOption: any, reason: string) => {
        if (Helpers.isFunction(props.onChangeValue)) {
            if (Array.isArray(selectedOption)) {
                let value: string[] = [];
                for (let items of selectedOption) {
                    value.push(items.code);
                }
                props.onChangeValue(value);
            } else {
                const value = selectedOption ? selectedOption.code : "";
                props.onChangeValue(value);
            }
        }
        setSelectedOption(selectedOption)

    }
    return (
        <Autocomplete
            key={selectedOption + ""}
            className={classes.root}
            multiple={props.multiple}
            style={props.style}
            disabled={props.disabled}
            autoHighlight
            id={`autocomplete-${new Date().getTime()}`}
            options={props.items}
            value={selectedOption}
            getOptionLabel={(option) => option.name}
            noOptionsText={Strings.Message.NO_DATA}
            onChange={handleChange}
            renderInput={
                (params) =>
                    <TextField
                        {...params}
                        label={props.required ? `${props.label} *` : props.label}
                        variant="outlined"
                        placeholder={props.placeholder}
                        error={!Helpers.isNullOrEmpty(props.errorMessage)}
                        helperText={props.errorMessage}

                    />
            }
        />
    )


}