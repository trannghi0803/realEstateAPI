import React from "react";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import { Helpers } from "../commons/utils";
interface IProps {
    rightContent?: () => React.ReactNode;
    containerStyle?: any;
    hideDivider?: boolean;
    placeholder?: string;
    defaultValue?: string;
    onFilterClick?: () => void;
    onKeyPress?: (event: any) => void;
    onChangeValue?: (value: string) => void;
}
const useStyles = makeStyles(() => ({
    textField:{
        width: '100%',
        '& .MuiOutlinedInput-input':{
            padding: '0.7rem 0.5rem',
        },
        '& .MuiOutlinedInput-notchedOutline':{
            borderColor: 'rgb(29, 132, 181)'
        },
        '& .MuiOutlinedInput-root':{
            borderRadius: '12px'
        }
    }
}));
const ControlSearchBar: React.FC<IProps> = (props: IProps) => {
    const { rightContent, containerStyle = {},} = props;
    const classes = useStyles();

    const onChangeValue = (event: any) => {
        if (props.onChangeValue && Helpers.isFunction(props.onChangeValue)) {
            props.onChangeValue(event.target.value);
        }
    }
    return (
        <div style={containerStyle}>
            <Grid container alignItems="center" >
                <Grid item xs={12} md={6}>
                    <TextField
                        className={classes.textField}
                        id="input-with-icon-textfield"
                        placeholder={props.placeholder ? props.placeholder : "Tìm kiếm tên khách hàng"}
                        variant="outlined"
                        // value={value}
                        defaultValue={props.defaultValue || ''}
                        onBlur={onChangeValue}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{color: '#095477'}} className="cursor-pointer" onClick={props.onFilterClick} />
                                </InputAdornment>
                            ),
                        }}
                        onKeyPress={async (event) => {
                            if (Helpers.isFunction(props.onKeyPress)) {
                                props.onKeyPress(event);
                            }
                        }}
                    />
                    <div className="d-flex align-items-center">
                        {/* <ControlSearchBox
                            onFilterClick={props.onFilterClick}
                            placeholder={props.placeholder}
                            defaultValue={props.defaultValue}
                            onKeyPress={props.onKeyPress}
                            onChangeValue={props.onChangeValue}
                        /> */}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    {rightContent && rightContent()}
                </Grid>
            </Grid>
            {/* {!hideDivider && <Divider />} */}
        </div>
    );
}

export default ControlSearchBar;