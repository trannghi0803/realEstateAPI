import React from "react";
import { observer } from "mobx-react";
import { Button, Grid, Paper } from "@material-ui/core";

import BaseView from "../base/BaseView";
import { UserModel } from "../../models";
import { UserService } from "../../services";
import { Strings } from "../../../constants";
import { ProfileController } from "../../controllers/user";
import { ControlDialog, ControlInput } from "../../../components";

@observer
export default class ProflieView extends BaseView<ProfileController, UserModel, UserService> {
    constructor(props: any) {
        super(props, ProfileController, UserModel, UserService);
    }

    public renderPage() {
        return (
            <Grid className="mt-3">
                <Paper square className="p-3" key={this.model.renderKey}>
                    <h2 className="title-screen">{Strings.ProfileInfo.TITLE}</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8} md={6}>
                            <b>{"Tên tài khoản"}: </b>
                            <span>{this.model.staff?.userName}</span>
                        </Grid>
                       
                        <Grid item xs={12} sm={8} md={6}>
                            <b>{Strings.ProfileInfo.EMAIL}: </b>
                            <span>{this.model.staff?.email}</span>
                        </Grid>

                        <Grid item xs={12} sm={8} md={6}>
                            <b>{Strings.ProfileInfo.PHONE}: </b>
                            <span>{this.model.staff?.phoneNumber} </span>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    this.setModel({
                                        isShowModal: true,
                                        dataChangePW: { phoneNumber: { value: this.model.staff?.phoneNumber } }
                                    })
                                }}>
                                {Strings.ProfileInfo.CHANGE_PASSWORD}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                {
                    this.showModalChangePassword()
                }
            </Grid>
        );
    }

    showModalChangePassword() {
        return (
            <ControlDialog
                hasAction
                maxWidth="sm"
                key={`${this.model.isShowModal}`}
                open={this.model.isShowModal || false}
                title={Strings.ProfileInfo.CHANGE_PASSWORD}
                onClose={() => { this.setModel({ isShowModal: false, dataChangePW: undefined }) }}
                onCancel={() => { this.setModel({ isShowModal: false, dataChangePW: undefined }) }}
                onOk={() => { this.controller.onChangePassword() }}
                children={
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <b>{Strings.ProfileInfo.PHONE}: </b>
                            <ControlInput
                                containerClassName="mt-2"
                                value={this.model.dataChangePW?.phoneNumber?.value}
                                errorMessage={this.model.dataChangePW?.phoneNumber?.error}
                                onChangeValue={(value) => {
                                    this.controller.setValueBydataChangePW("phoneNumber", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <b>{Strings.ProfileInfo.OLD_PASSWORD}: </b>
                            <ControlInput
                                type="password"
                                containerClassName="mt-2"
                                value={this.model.dataChangePW?.oldPassword?.value}
                                errorMessage={this.model.dataChangePW?.oldPassword?.error}
                                onChangeValue={(value) => {
                                    this.controller.setValueBydataChangePW("oldPassword", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <b>{Strings.ProfileInfo.NEW_PASSWORD}: </b>
                            <ControlInput
                                type="password"
                                containerClassName="mt-2"
                                value={this.model.dataChangePW?.newPassword?.value}
                                errorMessage={this.model.dataChangePW?.newPassword?.error}
                                onChangeValue={(value) => {
                                    this.controller.setValueBydataChangePW("newPassword", value)
                                }}
                            />
                        </Grid>
                    </Grid>
                }
            />
        )
    }
}
