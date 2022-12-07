import React from "react";
import { observer } from "mobx-react";
import { Button, Grid } from "@material-ui/core";
import { ArrowBack, Save } from "@material-ui/icons";

import BaseView from "../base/BaseView";
import { Helpers } from "../../../commons/utils";
import { Strings } from "../../../constants";
import { GlobalState } from "../../../stores/GlobalState";
import {
    ControlAutocomplete, ControlCheckbox, ControlDateTimePicker, ControlImageGridList, ControlInput
} from "../../../components";
import moment from "moment";
import { UserModel } from "../../models";
import { UserService } from "../../services";
import { CreateOrUpdateUserController } from "../../controllers/user";
import { UserType } from "../../../constants/Enums";

@observer
export default class CreateOrUpdateUserView extends BaseView<CreateOrUpdateUserController, UserModel, UserService> {
    constructor(props: any) {
        super(props, CreateOrUpdateUserController, UserModel, UserService);
    }

    renderPhotos() {
        var photos: Array<any> = [];
        let isLoading;

        photos = this.model.imageDisplay || [];

        return (
            <div>
                <input
                    multiple
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    style={{ display: 'none' }}
                    id={`contained-button-file`}
                    onChange={(e) => this.controller.handlePhotoChange(e)}
                />
                <label htmlFor={`contained-button-file`}>
                    <Button variant="outlined" color="primary" component="span" className="mb-3">
                        {"Chọn ảnh đại diện"}
                    </Button>
                </label>
                <Grid>
                    {photos && (
                        <ControlImageGridList
                            photos={photos}
                            onDelete={(e, i, id) => { this.controller.handleDeletePhoto(i, id) }}
                        />
                    )}
                </Grid>
            </div>
        )
    }

    public renderPage() {
        return (
            <Grid container spacing={3} key={this.model.renderKey}>
                <Grid item xs={12} sm={6} className="title-screen">
                    {"Thêm tài khoản"}
                </Grid>
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        required
                        label={Strings.User.USER_NAME}
                        errorMessage={this.model.userName?.error}
                        defaultValue={this.model.userName?.value || ""}
                        onChangeValue={(value) => {
                            this.setModel({
                                userName: { value }
                            })
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        required
                        label={Strings.User.EMAIL}
                        defaultValue={this.model.email?.value}
                        errorMessage={this.model.email?.error}
                        onChangeValue={(value) => {
                            this.setModel({
                                email: { value } 
                            })
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        required
                        label={Strings.User.PHONE_NUMBER}
                        defaultValue={this.model.phoneNumber?.value}
                        errorMessage={this.model.phoneNumber?.error}
                        onChangeValue={(value) => {
                            this.setModel({
                                phoneNumber: { value }
                            })
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={7}>
                    <ControlCheckbox
                        label={"Tài khoản quản trị"}
                        containerClassName="mr-3 w-40 d-inline-flex"
                        value={this.model.role === UserType.Admin ? true : false}
                        onChangeValue={(value) => {
                            console.log(value)
                            this.setModel({
                                role: value === true ? UserType.Admin : UserType.User,
                            })
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                    <p>{"Ảnh đại diện"}</p>
                    {this.renderPhotos()}
                </Grid>

                <Grid item xs={12} sm={7} className="d-flex justify-content-center">
                    <Button
                        variant="contained"
                        className="mt-3"
                        startIcon={<ArrowBack />}
                        onClick={() => this.history.goBack()}
                    >
                        {Strings.Common.GO_BACK}
                    </Button>
                    {/* Save button */}
                    <Button
                        color="primary"
                        variant="contained"
                        className="mt-3 ml-3"
                        startIcon={<Save />}
                        onClick={() => this.controller.onCreateOrUpdateUser()}
                    >
                        {Strings.Common.SAVE}
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
