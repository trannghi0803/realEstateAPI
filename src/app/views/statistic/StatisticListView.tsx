import React from "react";
import { observer } from "mobx-react";
import { Grid } from "@material-ui/core";

import BaseView from "../base/BaseView";
import { Strings } from "../../../constants";
import { StatisticListController } from "../../controllers/statistic";
import { StatisticModel } from "../../models";
import { StatisticService } from "../../services";

@observer
export default class StatisticListView extends BaseView<StatisticListController, StatisticModel, StatisticService> {
    constructor(props: any) {
        super(props, StatisticListController, StatisticModel, StatisticService);
    }

    public renderPage() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} className="title-screen">
            
                </Grid>
            </Grid>
        )
    }
}
