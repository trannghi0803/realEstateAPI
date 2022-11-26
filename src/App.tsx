import { EventEmitter } from "events";
import React, { Component } from "react";
import { Constants, Strings } from "./constants";
import "bootstrap/dist/css/bootstrap.css";
import "./commons/styles/Styles.css";
import Routes from "./routes/routes";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import moment from "moment";

interface IProps {
}

interface IStateProps {
    renderKey?: number;
}

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            "@global": {
                html: {
                    fontSize: "1rem"
                }
            },
        },
    },
    palette: {
        primary: {
            main: "#176E98"
        }
    },
    typography: {
        // fontFamily: "Arial",
    },
});

class App extends Component<IProps, IStateProps> {

    constructor(props: any) {
        super(props);
        this.state = {
            renderKey: Date.now(),
        };

        // config log
        const mw = window as any;
        mw.__EventEmitter = new EventEmitter();
        mw.__DEV__ = false;  // true: dev_enviroment
        // mw.__DEV__ = process.env.NODE_ENV !== "production";
        moment.locale(Strings.getLanguage());

        if (__DEV__) {
            console.log(`%c *** App#constructor: READY *** `, Constants.Styles.CONSOLE_LOG_NOTICE);
        }
    }
    public componentWillUnmount() {
        if (__DEV__) {
            console.log(`%c *** App#componentWillUnmount: DESTROYED *** `, Constants.Styles.CONSOLE_LOG_NOTICE);
        }
    }

    public render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes />
            </ThemeProvider>
        );
    }
}

export default App;
