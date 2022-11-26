import React from "react";
import { observer } from "mobx-react";
import { Button, Grid } from "@material-ui/core";
import { ArrowBack, Save } from "@material-ui/icons";

import BaseView from "../base/BaseView";
import { Helpers } from "../../../commons/utils";
import { Strings } from "../../../constants";
import { GlobalState } from "../../../stores/GlobalState";
import {
    ControlAutocomplete, ControlDateTimePicker, ControlInput
} from "../../../components";
import moment from "moment";
import { CreateOrUpdateController } from "../../controllers/category";
import { CategoryModel } from "../../models";
import { CategoryService } from "../../services";

@observer
export default class CreateOrUpdateCategoryView extends BaseView<CreateOrUpdateController, CategoryModel, CategoryService> {
    constructor(props: any) {
        super(props, CreateOrUpdateController, CategoryModel, CategoryService);
    }

    public renderPage() {
        return (
            <Grid container spacing={3} key={this.model.renderKey}>
                <Grid item xs={12} sm={6} className="title-screen">
                    {"Thêm loại bất động sản"}
                </Grid>
                <Grid item xs={12} sm={7}>
                    <ControlAutocomplete
                        variant={"outlined"}
                        label={Strings.Category.TYPE}
                        items={this.model.typeList || []}
                        key={this.model.type?.value}
                        value={this.model.type?.value || ""}
                        onChangeValue={(value) => {
                            this.setModel({
                                type: { value }
                            })
                        }}
                        errorMessage={this.model.type?.error}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        required
                        label={Strings.Category.NAME}
                        errorMessage={this.model.name?.error}
                        defaultValue={this.model.name?.value || ""}
                        onChangeValue={(value) => {
                            this.setModel({
                                name: {value}
                            })
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        required
                        label={Strings.Category.DESCRIPTION}
                        defaultValue={this.model.description}
                        onChangeValue={(value) => {
                            this.setModel({
                                description: value 
                            })
                        }}
                    />
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
                        onClick={() => this.controller.onCreateOrUpdateCategory()}
                    >
                        {Strings.Common.SAVE}
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
