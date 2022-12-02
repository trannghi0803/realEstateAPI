import React from "react";
import { observer } from "mobx-react";
import {
    Grid, Container, Typography, TextField, Button
} from "@material-ui/core";

import BaseView from "../base/BaseView";
import { AuthModel } from "../../models";
import { AuthService } from "../../services";
import { LoginController } from "../../controllers/auth";
import { Helpers } from "../../../commons/utils";
import { Resources, Strings } from "../../../constants";
import "../../../commons/styles/AuthStyles.css";
import { ControlInput } from "../../../components";
@observer
export default class LoginView extends BaseView<LoginController, AuthModel, AuthService> {
    constructor(props: any) {
        super(props, LoginController, AuthModel, AuthService);
    }

    public renderPage() {
        return (
            <Container component="main" maxWidth="xs" className="background form-login">
                <div className={"paper sign-form"}>
                    <img src={Resources.Images.REAl_ESTATE_LOGO} className="logo-img" alt="logo" />
                    {/* <Typography component="h3" variant="h5" className="mt-3">
                        {Strings.Header.LOGIN_HEINEKEN}
                    </Typography> */}
                    <Grid className="form p-4" onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            this.controller.login()
                        }
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size='small'
                                    label={Strings.ProfileInfo.EMAIL}
                                    id="email"
                                    type="email"
                                    // value={'tranvannghi1998@gmail.com'}
                                    value={this.model.email?.value}
                                    error={!Helpers.isNullOrEmpty(this.model.email?.error)}
                                    helperText={this.model.email?.error}
                                    onChange={(event) => {
                                        this.setModel({ email: { value: event.target.value } })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ControlInput
                                    required
                                    fullWidth
                                    secure
                                    label={Strings.ProfileInfo.PASSWORD}
                                    // defaultValue={'nghi1234'}
                                    defaultValue={this.model.password?.value}
                                    error={!Helpers.isNullOrEmpty(this.model.password?.error)}
                                    errorMessage={this.model.password?.error}
                                    onChangeValue={(value) => {
                                        this.setModel({ password: { value } })
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            className="submit mt-3 text-white bg-heineken"
                            onClick={() => { this.controller.login() }}
                        >
                            {Strings.Header.LOGIN}
                        </Button>
                    </Grid>
                </div>
            </Container>
        );
    }
}
