import React from "react";
import "../../../commons/styles/AuthStyles.css";
import BaseView from "../base/BaseView";
import { AuthModel } from "../../models";
import { observer } from "mobx-react";
import { AuthService } from "../../services";
import { SignUpController } from "../../controllers/auth";
import { Container} from "@material-ui/core";

@observer
export default class SignUpView extends BaseView<SignUpController, AuthModel, AuthService> {
    constructor(props: any) {
        super(props, SignUpController, AuthModel, AuthService);
    }

    public renderPage() {
        return (
            <Container component="main" maxWidth="xs" className="background">
                {/* <div className={"paper sign-form"}>
                    <img src={Resources.Images.APP_LOGO} className="logo-img" alt="logo"/>
                    <Typography component="h1" variant="h5">
                        {Strings.Header.REGISTER}
                    </Typography>
                    <form className={"form"} noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label={Strings.ProfileInfo.FULL_NAME}
                                    autoFocus
                                    value={this.model.fullName?.value}
                                    helperText={this.model.fullName?.error}
                                    error={!Helpers.isNullOrEmpty(this.model.fullName?.error)}
                                    onChange={event => this.setModel({ fullName: { value: event.target.value } })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="uname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label={Strings.ProfileInfo.USER_NAME}
                                    value={this.model.userName?.value}
                                    helperText={this.model.userName?.error}
                                    error={!Helpers.isNullOrEmpty(this.model.userName?.error)}
                                    onChange={event => this.setModel({ userName: { value: event.target.value } })}
                                    inputProps={{ pattern: "[a-z]{1,15}" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    label={Strings.ProfileInfo.EMAIL}
                                    id="email"
                                    autoComplete="email"
                                    type="email"
                                    value={this.model.email?.value}
                                    helperText={this.model.email?.error}
                                    error={!Helpers.isNullOrEmpty(this.model.email?.error)}
                                    onChange={event => this.setModel({ email: { value: event.target.value } })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label={Strings.ProfileInfo.PHONE}
                                    id="phone"
                                    autoComplete="phone"
                                    type="tel"
                                    value={this.model.phone?.value}
                                    error={!Helpers.isNullOrEmpty(this.model.phone?.error)}
                                    helperText={this.model.phone?.error}
                                    onChange={event => this.setModel({ phone: { value: event.target.value } })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ControlInput
                                    required
                                    secure
                                    fullWidth
                                    id="password"
                                    label={Strings.ProfileInfo.PASSWORD}
                                    type="password"
                                    autoComplete="password"
                                    value={this.model.password?.value}
                                    error={!Helpers.isNullOrEmpty(this.model.password?.error)}
                                    errorMessage={this.model.password?.error}
                                    onChangeValue={value => this.setModel({ password: { value } })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ControlInput
                                    required
                                    secure
                                    fullWidth
                                    id="confirmPassword"
                                    label={Strings.SignUp.CONFIRM_PASSWORD}
                                    type="password"
                                    autoComplete="confirmPassword"
                                    value={this.model.confirmPassword?.value}
                                    error={!Helpers.isNullOrEmpty(this.model.confirmPassword?.error)}
                                    errorMessage={this.model.confirmPassword?.error}
                                    onChangeValue={value => this.setModel({ confirmPassword: { value } })}
                                />
                            </Grid>
                        
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={"submit mt-3"}
                            onClick={() => this.controller.handleSubmit()}
                        >
                            {Strings.Header.REGISTER}
                        </Button>
                        <Grid className="link" container justify="flex-end">
                            <Grid item>
                                Đã có tài khoản ? &nbsp;
                                <Link onClick={() => this.history.push(Screens.LOGIN_REDIRECT)} variant="body1">
                                    {"Đăng nhập"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div> */}
            </Container>
        );
    }
}
