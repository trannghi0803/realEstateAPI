import "moment/locale/vi";
import MomentUtils from "@date-io/moment";
import React, { PureComponent } from "react";
import { createStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import "./ComponentStyles.css";
import { Helpers } from "../commons/utils";
import { Constants, Strings } from "../constants";

interface IProps {
    value?: any;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    errorMessage?: string;
    onDateChange: (date: any) => void;
    size?: "small" | "medium" | undefined;
    variant?: "standard" | "filled" | "outlined" | undefined;
}

interface IState {
}

class ControlTimePicker extends PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils} locale={Strings.getLanguage()}>
                {
                    <KeyboardTimePicker
                        ampm={false}
                        size={this.props.size}
                        label={this.props.label}
                        okLabel={Strings.Common.OK}
                        cancelLabel={Strings.Common.CANCEL}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        className={this.props.className}
                        inputVariant={this.props.variant}
                        format={Constants.DateFormat.HHMM}
                        invalidDateMessage={Strings.Common.INVALID_DATE}
                        value={this.props.value}
                        onChange={this.onChangeValue}
                        helperText={this.props.errorMessage}
                        error={!Helpers.isNullOrEmpty(this.props.errorMessage)}
                    />
                }
            </MuiPickersUtilsProvider>
        );
    }

    onChangeValue = (date: any, value?: string | null) => {
        this.props.onDateChange(date);
    }
}

const styles = createStyles((theme: any) => ({

}));

export default withStyles(styles)(ControlTimePicker);