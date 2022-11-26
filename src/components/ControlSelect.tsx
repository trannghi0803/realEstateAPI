import React, {
    PureComponent
} from "react";
import { ICodename } from "../commons/utils";
import "./ComponentStyles.css";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectProps,
    FormHelperText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

interface IProps extends SelectProps {
    errorMessage?: string;
    data: ICodename[];
    onChangeValue: (value: any) => void;
    multiple?: boolean;
    defaultValue?: any;
    classes: any
    // delete?: boolean;
    onDelete?: (value: any) => void;
    disabled?: boolean;
}

interface IState {
    value?: string[] | string | null;
}

const styles = () => ({
    root: {
        width: '100%',
        '& .MuiInputLabel-outlined': {
            transform: 'translate(14px,13px) scale(1)'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)'
        }
    },
});
class ControlSelect extends PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            value: null,
        };
    }

    public componentWillMount() {
        this.setState({
            value: this.props.defaultValue
        })
    }

    public render() {
        const { onDelete, errorMessage, data, onChangeValue, ...rest } = this.props;
        const { classes } = this.props;
        return (
            <FormControl variant={this.props.variant} className={classes.root} error={(this.props.errorMessage || errorMessage) ? true : false} disabled={this.props.disabled}>
                <InputLabel id="select-outlined-label">{this.props.label}
                    <span className="text-danger">
                        {this.props.required ? ' * ' : ''}
                    </span>
                </InputLabel>
                <Select
                    {...rest}
                    labelId="select-outlined-labell"
                    id="select-outlined"
                    value={this.state.value}
                    onChange={this.onChangeValue}>
                    {
                        data.map((item, index) => (
                            <MenuItem key={index}
                                value={item.code}>
                                {item.name}
                            </MenuItem>
                        ))
                    }
                </Select>
                {/* {!Helpers.isNullOrEmpty(this.state.value) && !this.props.multiple && !this.props.disabled ? 
                    <CloseIcon  onClick={()=>{this.setState({value: undefined}); this.props.onChangeValue('')}} style={{position: 'absolute', right: '3rem', top: '30%'}}/>
                : null} */}

                {
                    this.props.onDelete ?
                        <Close onClick={this.props.onDelete} style={{ position: 'absolute', right: '3rem', top: '20%' }} />
                        : undefined
                }
                <FormHelperText id={`outlined-input-error-${new Date().getTime()}`}>
                    {this.props.errorMessage}
                </FormHelperText>
            </FormControl>
        );
    }

    private onChangeValue = (event: any) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({
            value: value
        });
        this.props.onChangeValue(value);
    }


}
export default withStyles(styles, { withTheme: true })(ControlSelect);
