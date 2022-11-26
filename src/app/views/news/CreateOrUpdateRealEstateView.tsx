import React from "react";
import { observer } from "mobx-react";
import { Button, Grid, Typography } from "@material-ui/core";
import { ArrowBack, Save } from "@material-ui/icons";

import BaseView from "../base/BaseView";
import { Helpers } from "../../../commons/utils";
import { Strings } from "../../../constants";
import { GlobalState } from "../../../stores/GlobalState";
import {
    ControlAutocomplete, ControlHtmlInput, ControlImageGridList, ControlInput
} from "../../../components";
import moment from "moment";
import { NewsModel } from "../../models";
import { NewsService } from "../../services";
import { CreateOrUpdateNewsController } from "../../controllers/news";

@observer
export default class CreateOrUpdateNewsView extends BaseView<CreateOrUpdateNewsController, NewsModel, NewsService> {
    constructor(props: any) {
        super(props, CreateOrUpdateNewsController, NewsModel, NewsService);
    }

    
    public renderPage() {
        return (
            <Grid container spacing={3} key={this.model.renderKey}>
                <Grid item xs={12} sm={6} className="title-screen">
                    {"Thêm tin tức bất động sản"}
                </Grid>
                
                <Grid item xs={12} sm={7}>
                    <ControlInput
                        required
                        label={Strings.News.NAME}
                        errorMessage={this.model.title?.error}
                        defaultValue={this.model.title?.value || ""}
                        onChangeValue={(value) => {
                            this.setModel({
                                title: { value }
                            })
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Typography variant="subtitle1" gutterBottom>
                        {Strings.News.ABSTRACT}
                    </Typography>
                    <ControlHtmlInput
                        content={this.model.abstract?.value || ""}
                        onBlur={(value: string) => {
                            this.setModel({
                                abstract: { value }
                            })
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={7}>
                    <Typography variant="subtitle1" gutterBottom>
                        {Strings.News.CONTENT}
                    </Typography>
                    <ControlHtmlInput
                        content={this.model.content?.value || ""}
                        onBlur={(value: string) => {
                            this.setModel({
                                content: { value}
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
                        onClick={() => this.controller.onCreateOrUpdateNews()}
                    >
                        {Strings.Common.SAVE}
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
