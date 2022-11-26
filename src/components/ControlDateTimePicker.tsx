import "moment/locale/vi";
import moment from "moment";
import isValid from "date-fns/isValid";
import format from "date-fns/esm/format";
import MomentUtils from "@date-io/moment";
import isSameDay from "date-fns/fp/isSameDay/index";
import isWithinInterval from "date-fns/esm/isWithinInterval";

import React, { PureComponent } from "react";
import { createStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import { FormHelperText, Grid, IconButton } from "@material-ui/core";
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import "./ComponentStyles.css";
import { Helpers } from "../commons/utils";
import { Constants, Strings } from "../constants";

interface IProps {
    value?: any;
    label?: string;
    format?: string;
    classes?: any;
    maxDate?: any;
    minDate?: any;
    disabled?: boolean;
    required?: boolean;
    isShowWeek?: boolean;
    allowTimePicker?: boolean;
    errorMessage?: string;
    containerClassName?: string;
    onDateChange: (date: any) => void;
    size?: "small" | "medium" | undefined;
    views?: Array<"year" | "date" | "month">;
    variant?: "standard" | "filled" | "outlined" | undefined;
}

interface IState {
}

class ControlDateTimePicker extends PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    formatWeekSelectLabel = (date: any, invalidLabel: any) => {
        let dateClone = new Date(date);
        return dateClone && isValid(dateClone)
            ? `${moment(dateClone).startOf('week').format(Constants.DateFormat.DDMMYYYY)} - ${moment(dateClone).endOf('week').format(Constants.DateFormat.DDMMYYYY)}`
            : invalidLabel;
    };

    renderWrappedWeekDay = (date: any, selectedDate: any, dayInCurrentMonth: any) => {
        const { classes } = this.props;
        let dateClone = new Date(date);
        let selectedDateClone = new Date(selectedDate);

        const start = moment(selectedDateClone).startOf('week').toDate();
        const end = moment(selectedDateClone).endOf('week').toDate();

        const dayIsBetween = isWithinInterval(dateClone, { start, end });
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        let wrapperClassName = "";
        wrapperClassName += dayIsBetween ? ` ${classes.highlight}` : "";
        wrapperClassName += isFirstDay ? ` ${classes.firstHighlight}` : "";
        wrapperClassName += isLastDay ? ` ${classes.endHighlight}` : "";

        let dayClassName = classes.day;
        dayClassName += !dayInCurrentMonth ? ` ${classes.nonCurrentMonthDay}` : "";
        dayClassName += !dayInCurrentMonth && dayIsBetween ? ` ${classes.highlightNonCurrentMonthDay}` : "";

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(new Date(date), "d")} </span>
                </IconButton>
            </div>
        );
    };

    public render() {
        const { classes } = this.props;
        return (
            <Grid container direction="column" className={this.props.disabled ? "pe-none" : ""}>
                <MuiPickersUtilsProvider utils={MomentUtils} locale={Strings.getLanguage()}>
                    {
                        this.props.allowTimePicker ?
                            <KeyboardDateTimePicker
                                label={this.props.label}
                                className={this.props.containerClassName}
                                ampm={false}
                                inputVariant={this.props.variant}
                                size={this.props.size}
                                value={this.props.value}
                                onChange={this.onChangeValue}
                                invalidDateMessage={Strings.Common.INVALID_DATE}
                                cancelLabel={Strings.Common.CANCEL}
                                okLabel={Strings.Common.OK}
                                format={this.props.format || Constants.DateFormat.DDMMYYYY_HHMM}
                                maxDate={this.props.maxDate ? this.props.maxDate : new Date("2100-01-01")}
                                minDate={this.props.minDate ? this.props.minDate : new Date("1900-01-01")}
                                disabled={this.props.disabled}
                                required={this.props.required}
                                // error={!Helpers.isNullOrEmpty(this.props.errorMessage)}
                                // helperText={this.props.errorMessage}
                                // display the week of the day is selected
                                renderDay={this.props.isShowWeek ? this.renderWrappedWeekDay : undefined}
                                InputAdornmentProps={{ position: "start" }}
                            // InputProps={this.props.value ? {
                            //     endAdornment: (
                            //         <IconButton onClick={() => { this.props.onDateChange(null); }}>
                            //             <Close className={classes.iconClose} />
                            //         </IconButton>
                            //     ),
                            // } : undefined}

                            />
                            :
                            <KeyboardDatePicker
                                label={this.props.label}
                                className={this.props.containerClassName}
                                inputVariant={this.props.variant}
                                size={this.props.size}
                                value={this.props.value}
                                onChange={this.onChangeValue}
                                invalidDateMessage={Strings.Common.INVALID_DATE}
                                cancelLabel={Strings.Common.CANCEL}
                                okLabel={Strings.Common.OK}
                                format={this.props.format || Constants.DateFormat.DDMMYYYY}
                                maxDate={this.props.maxDate}
                                minDate={this.props.minDate}
                                disabled={this.props.disabled}
                                required={this.props.required}
                                error={!Helpers.isNullOrEmpty(this.props.errorMessage)}
                                // helperText={this.props.errorMessage}
                                views={this.props.views}
                                // display the week of the day is selected
                                renderDay={this.props.isShowWeek ? this.renderWrappedWeekDay : undefined}
                                labelFunc={this.props.isShowWeek ? this.formatWeekSelectLabel : undefined}
                                InputAdornmentProps={{ position: "start" }}
                            // InputProps={this.props.value ? {
                            //     endAdornment: (
                            //         <IconButton onClick={() => { this.props.onDateChange(null); }}>
                            //             <Close className={classes.iconClose} />
                            //         </IconButton>
                            //     ),
                            // } : undefined}
                            />
                    }
                    <Grid xs={12} sm={12}>
                        <FormHelperText className={classes.textErr}>{this.props.errorMessage}</FormHelperText>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
        );
    }

    onChangeValue = (date: any, value?: string | null) => {
        this.props.onDateChange(date);
    }
}

const styles = createStyles((theme: any) => ({
    dayWrapper: {
        position: "relative",
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    customDayHighlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "2px",
        right: "2px",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "50%",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    firstHighlight: {
        extend: "highlight",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    },
    endHighlight: {
        extend: "highlight",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },
    textErr: {
        display: "contents",
        width: "50%",
        color: "#f44336"
    },
    iconClose: {
        cursor: 'pointer',
    },
}));

export default withStyles(styles)(ControlDateTimePicker);