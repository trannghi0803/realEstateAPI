import React from "react";
import { Switch, SwitchProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
interface IProps extends SwitchProps {
}
const AntSwitch = withStyles((theme) => ({
    root: {
        width: 40,
        height: 20,
        padding: 0,
        display: "flex",
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        "&$checked": {
            transform: "translateX(20px)",
            color: theme.palette.common.white,
            "& + $track": {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 16,
        height: 16,
        boxShadow: "none",
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 20 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const ControlSwitch: React.FC<IProps> = (props: IProps) => {
    return (
        <AntSwitch {...props} />
    );
}

export default ControlSwitch;