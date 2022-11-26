import React from "react";
import { StepConnector, Paper, Step, StepLabel, Stepper, Box, StepButton } from "@material-ui/core";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
interface IProps {
    stepLabels: string[];
    children?: any;
    activeStep: number;
    canChangeStep?: boolean;
    onStepChange?: (index: number) => void;
}

const ControlStepper: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Stepper activeStep={props.activeStep}
                alternativeLabel
                nonLinear={props.canChangeStep}
                connector={<ColorConnector />}>
                {props.stepLabels.map((label, index) => (
                    <Step key={index}>
                        {

                            props.canChangeStep ?
                                <StepButton
                                    onClick={() => { props.onStepChange && props.onStepChange(index) }}>
                                    {label}
                                </StepButton>
                                : <StepLabel>{label}</StepLabel>
                        }
                    </Step>

                ))}
            </Stepper>
            <Paper square className="mt-3" style={{ padding: 24 }}>
                <Box>
                    {props.children}
                </Box>
            </Paper>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

const ColorConnector = withStyles(({ palette }) => ({
    alternativeLabel: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    active: {
        "& $line": {
            borderColor: palette.primary.main,
        },
    },
    completed: {
        "& $line": {
            borderColor: palette.primary.main,
        },
    },
    line: {
        borderColor: "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}))(StepConnector);

export default ControlStepper;