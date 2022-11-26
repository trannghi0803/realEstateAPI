import React from "react";
import { Button, Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ControlText } from ".";
import { clearGlobalState } from "../stores/GlobalState";
import { ExitToApp } from "@material-ui/icons";
import { Screens } from "../constants";
import { useHistory } from "react-router";
const useStyles = makeStyles(() => ({
    icon: {
        width: "1.5rem",
        height: "1.5rem"
    }
}))

interface IProps {
    title: string;
    iconSvg: any;
    rightContent?: () => React.ReactNode;
}

const ControlHeader: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const history = useHistory();
    const { title, iconSvg, rightContent } = props;

    return (
        <Grid>
            <Grid container className="d-flex p-3 align-items-start">
                <Grid item xs={12} md={3} className="d-flex align-items-center">
                    <img alt="icon"src={iconSvg} className={classes.icon} />
                    <ControlText type="header" className={"ml-3"}>
                        {title}
                    </ControlText>
                </Grid>
                <Grid item xs={12} md={9} >
                    <Button
                        className="float-right"
                        style={{ textTransform: "unset", fontSize: "1rem" }}
                        startIcon={<ExitToApp />}
                        onClick={() => {
                            try {
                                clearGlobalState();
                                history.push(Screens.AUTH_LOGIN);
                            } catch (error) {
                                if (error) {
                                    console.error(error);
                                }
                            }
                        }}
                    >
                        Đăng xuất
                    </Button>

                </Grid>
            </Grid>
            <Divider />
            {rightContent ?
                <Grid className="mt-2">
                    {rightContent && rightContent()}
                </Grid>
                :
                undefined}
        </Grid>
    );
}

export default ControlHeader;