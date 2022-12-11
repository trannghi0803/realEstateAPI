import React from "react";
import { observer } from "mobx-react";
import { Button, Grid, Typography } from "@material-ui/core";
import { ArrowBack, Save } from "@material-ui/icons";

import BaseView from "../base/BaseView";
import { Helpers } from "../../../commons/utils";
import { Strings } from "../../../constants";
import { GlobalState } from "../../../stores/GlobalState";
import {
    ControlAutocomplete, ControlCheckbox, ControlDateTimePicker, ControlHtmlInput, ControlImageGridList, ControlInput
} from "../../../components";
import moment from "moment";
import { CreateOrUpdateRealEstateController } from "../../controllers/realEstate";
import { RealEstateModel } from "../../models";
import { RealEstateService } from "../../services";
import { IsHighLight, RealEstateType, Status } from "../../../constants/Enums";

@observer
export default class CreateOrUpdateRealEstateView extends BaseView<CreateOrUpdateRealEstateController, RealEstateModel, RealEstateService> {
    constructor(props: any) {
        super(props, CreateOrUpdateRealEstateController, RealEstateModel, RealEstateService);
    }

    renderPhotos() {
        var photos: Array<any> = [];
        let isLoading;

        photos = this.model.images || [];
        isLoading = this.model.isLoadingImages;

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
                        {"Chọn hình ảnh"}
                    </Button>
                </label>
                <Grid>
                    {photos && (
                        <ControlImageGridList
                            isLoading={isLoading}
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
                    {"Thêm bài đăng bất động sản"}
                </Grid>
                <Grid item xs={12} sm={7}>
                    <ControlAutocomplete
                        variant={"outlined"}
                        label={Strings.RealEstate.CATEGORY}
                        items={this.model.categoryList || []}
                        key={this.model.category?.value}
                        value={this.model.category?.value || ""}
                        onChangeValue={(value) => {
                            this.setModel({
                                category: { value }
                            })
                        }}
                        errorMessage={this.model.category?.error}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        required
                        label={Strings.RealEstate.NAME}
                        errorMessage={this.model.title?.error}
                        defaultValue={this.model.title?.value || ""}
                        onChangeValue={(value) => {
                            this.setModel({
                                title: { value }
                            })
                        }}
                    />
                </Grid>
                {
                    !this.model.id &&
                    <Grid item xs={12} sm={7}>
                        <ControlInput
                            required
                            type="number"
                            label={Strings.RealEstate.PRICE}
                            defaultValue={this.model.price?.value || ""}
                            onChangeValue={(value) => {
                                this.setModel({
                                    price: { value }
                                })
                            }}
                            errorMessage={this.model.price?.error}
                        />
                    </Grid>
                }
                {
                    (this.model.id && Number(this.model.price?.value) === 0) &&
                    <Grid item xs={12} sm={7}>
                        <ControlInput
                            disabled
                            label={Strings.RealEstate.PRICE}
                            defaultValue={"Thỏa thuận"}
                            onChangeValue={(value) => {
                                
                            }}
                            errorMessage={this.model.price?.error}
                        />
                    </Grid>
                }
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        type="number"
                        label={Strings.RealEstate.AREA}
                        defaultValue={this.model.area?.value || ""}
                        onChangeValue={(value) => {
                            this.setModel({
                                area: { value }
                            })
                        }}
                    />
                </Grid>
                {
                    (Number(this.model.type) === RealEstateType.Crawl && this.model.id) ?
                        <>
                            <Grid item xs={12} sm={7}>
                                <ControlInput
                                    disabled
                                    label={Strings.RealEstate.CITY}
                                    defaultValue={this.model.address?.provinceName || ""}
                                    onChangeValue={(value) => {

                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <ControlInput
                                    disabled
                                    label={Strings.RealEstate.DISTRICT}
                                    defaultValue={this.model.address?.districtName || ""}
                                    onChangeValue={(value) => {

                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <ControlInput
                                    disabled
                                    label={Strings.RealEstate.WARD}
                                    defaultValue={this.model.address?.wardName || ""}
                                    onChangeValue={(value) => {

                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <ControlInput
                                    disabled
                                    label={Strings.RealEstate.ADDRESS_LINE}
                                    defaultValue={this.model.address?.addressLine || ""}
                                    onChangeValue={(addressFull) => {
                                    }}
                                />
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={12} sm={7}>
                                <ControlAutocomplete
                                    variant="outlined"
                                    label={Strings.RealEstate.CITY}
                                    items={this.model.provinceList || []}
                                    value={this.model.address?.provinceCode || ""}
                                    onChangeValue={(value) => {
                                        this.controller.getDistrictsByCityCode(value);
                                        this.setModel({
                                            address: {
                                                provinceCode: value,
                                                districtCode: undefined,
                                                wardCode: undefined,
                                            },
                                            districtList: [],
                                            wardList: [],
                                            renderKey: Date.now()
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <ControlAutocomplete
                                    variant="outlined"
                                    label={Strings.RealEstate.DISTRICT}
                                    items={this.model.districtList || []}
                                    value={this.model.address?.districtCode || ""}
                                    onChangeValue={(value) => {
                                        this.controller.getWardByDistrictCode(value);
                                        this.setModel({
                                            address: {
                                                ...this.model.address,
                                                districtCode: value,
                                                wardCode: undefined,
                                            },
                                            wardList: [],
                                            renderKey: Date.now()
                                        })

                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <ControlAutocomplete
                                    variant="outlined"
                                    label={Strings.RealEstate.WARD}
                                    items={this.model.wardList || []}
                                    value={this.model.address?.wardCode || ""}
                                    onChangeValue={(value) => {
                                        this.setModel({
                                            address: {
                                                ...this.model.address,
                                                wardCode: value,
                                            },
                                            renderKey: Date.now()
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <ControlInput
                                    label={Strings.RealEstate.ADDRESS_LINE}
                                    defaultValue={this.model.address?.addressLine || ""}
                                    onChangeValue={(addressFull) => {
                                        this.setModel({
                                            address: {
                                                ...this.model.address,
                                                addressLine: addressFull,
                                            }
                                        })
                                    }}
                                />
                            </Grid>
                        </>
                }

                <Grid item xs={12} sm={7}>
                    <ControlCheckbox
                        label={Strings.RealEstate.IS_HIGHLIGHT}
                        containerClassName="mr-3 w-40 d-inline-flex"
                        value={this.model.isHighLight === IsHighLight.True ? true : false}
                        onChangeValue={(value) => {
                            console.log(value)
                            this.setModel({
                                isHighLight: value === true ? IsHighLight.True : IsHighLight.False,
                            })
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Typography variant="subtitle1" gutterBottom>
                        {Strings.RealEstate.ATTRIBUTE}
                    </Typography>
                    <ControlHtmlInput
                        content={this.model.attributes?.value || ""}
                        onBlur={(value: string) => {
                            // console.log("attributes", value)
                            this.setModel({
                                attributes: { value }
                            })
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Typography variant="subtitle1" gutterBottom>
                        {Strings.RealEstate.DESCRIPTION}
                    </Typography>
                    <ControlHtmlInput
                        content={this.model.description || ""}
                        onBlur={(value: string) => {
                            // console.log("description", value)
                            this.setModel({
                                description: value
                            })
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                    <p>{Strings.RealEstate.IMAGE}</p>
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
                        onClick={() => this.controller.onCreateOrUpdateRealEstate()}
                    >
                        {Strings.Common.SAVE}
                    </Button>
                    {/* {
                        this.model.id && this.model.status === Status.Inactive &&
                        <>
                            <Button
                                color="primary"
                                variant="contained"
                                className="mt-3 ml-3"
                                startIcon={<Save />}
                                onClick={() => this.controller.approve()}
                            >
                                {Strings.Common.APPROVE}
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                className="mt-3 ml-3"
                                startIcon={<Save />}
                                onClick={() => this.controller.reject()}
                            >
                                {Strings.Common.REJECT}
                            </Button>
                        </>
                    } */}
                </Grid>
            </Grid>
        )
    }
}
