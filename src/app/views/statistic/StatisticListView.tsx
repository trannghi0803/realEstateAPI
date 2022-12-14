import React from "react";
import { observer } from "mobx-react";
import { Button, Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

import BaseView from "../base/BaseView";
import { Strings } from "../../../constants";
import { StatisticListController } from "../../controllers/statistic";
import { StatisticModel } from "../../models";
import { StatisticService } from "../../services";
import { Add } from "@material-ui/icons";

import { Chart } from "react-google-charts";
import { ControlAutocomplete, ControlDateTimePicker } from "../../../components";
@observer
export default class StatisticListView extends BaseView<StatisticListController, StatisticModel, StatisticService> {
    constructor(props: any) {
        super(props, StatisticListController, StatisticModel, StatisticService);
    }

    public renderPage() {

        return (
            <Grid container spacing={2}>
                <Grid container spacing={2} md={12} xl={12} className="mt-3">
                    <p className="titleChart"> {"Thống kê bất động sản theo loại"}</p>
                    <Grid container xs={12} md={12} spacing={2}>
                        <Grid item xs={12} md={3}>
                            <ControlDateTimePicker
                                size="small"
                                variant="outlined"
                                // containerClassName="w-50"
                                label={"Thời gian bắt đầu"}
                                value={this.model.realEstateByCategoryTimeStart || null}
                                onDateChange={(value) => {
                                    this.setModel({
                                        realEstateByCategoryTimeStart: value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ControlDateTimePicker
                                size="small"
                                variant="outlined"
                                // containerClassName="w-50"
                                minDate={this.model.realEstateByCategoryTimeStart}
                                label={"Thời gian kết thúc"}
                                value={this.model.realEstateByCategoryTimeEnd || null}
                                onDateChange={(value) => {
                                    this.setModel({
                                        realEstateByCategoryTimeEnd: value
                                    })
                                }}
                            />
                        </Grid>
                        {/* <Grid item xs={12} md={3}>
                            <ControlAutocomplete
                                variant={"outlined"}
                                label={Strings.Category.TYPE}
                                items={this.model.typeList || []}
                                key={`${this.model.realEstateByCategoryType?.value}`}
                                value={`${this.model.realEstateByCategoryType?.value}`}
                                onChangeValue={(value) => {
                                    this.setModel({
                                        realEstateByCategoryType: { value }
                                    })
                                }}
                            />
                        </Grid> */}
                        <Grid item xs={12} md={3}>
                            <ControlAutocomplete
                                variant="outlined"
                                label={Strings.RealEstate.CITY}
                                items={this.model.provinceList || []}
                                value={this.model.realEstateByCategoryProvince || ""}
                                onChangeValue={(value) => {
                                    this.setModel({
                                        realEstateByCategoryProvince: value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.controller.countByCategory()}
                            >
                                {"Thống kê"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={12} md={6}>
                            <Chart
                                // style={{ marginLeft: "-6%" }}
                                chartType="PieChart"
                                data={this.model?.realEstateByCategoryList}
                                width={"100%"}
                                height={"400px"}
                                options={{
                                    title: "Bất động sản cần bán",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Chart
                                // style={{ marginLeft: "-6%" }}
                                chartType="PieChart"
                                data={this.model?.realEstateByRentCategoryList}
                                width={"100%"}
                                height={"400px"}
                                options={{
                                    title: "Bất động sản cho thuê",
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2} md={12} xl={12} className="mt-3">
                    <p className="titleChart"> {"Thống kê diện tích bất động sản trong khu vực theo loại"}</p>
                    <Grid container xs={12} md={12} spacing={2}>
                        <Grid item xs={12} md={3}>
                            <ControlDateTimePicker
                                size="small"
                                variant="outlined"
                                // containerClassName="w-50"
                                label={"Thời gian bắt đầu"}
                                value={this.model.areaByCategoryTimeStart || null}
                                onDateChange={(value) => {
                                    this.setModel({
                                        areaByCategoryTimeStart: value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ControlDateTimePicker
                                size="small"
                                variant="outlined"
                                // containerClassName="w-50"
                                minDate={this.model.areaByCategoryTimeStart}
                                label={"Thời gian kết thúc"}
                                value={this.model.areaByCategoryTimeEnd || null}
                                onDateChange={(value) => {
                                    this.setModel({
                                        areaByCategoryTimeEnd: value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ControlAutocomplete
                                variant="outlined"
                                label={Strings.RealEstate.CITY}
                                items={this.model.provinceList || []}
                                value={this.model.areaByCategoryProvince || ""}
                                onChangeValue={(value) => {
                                    this.setModel({
                                        areaByCategoryProvince: value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.controller.countAreaByCategory()}
                            >
                                {"Thống kê"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={12}>
                        <Grid item xs={12} md={6}>
                            <Chart
                                // style={{ marginLeft: "-6%" }}
                                chartType="PieChart"
                                data={this.model?.areaByCategoryList}
                                width={"100%"}
                                height={"400px"}
                                options={{
                                    title: "Bất động sản mua bán",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Chart
                                // style={{ marginLeft: "-6%" }}
                                chartType="PieChart"
                                data={this.model?.areaByRentCategoryList}
                                width={"100%"}
                                height={"400px"}
                                options={{
                                    title: "Bất động sản cho thuê",
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2} md={6} className="mt-3">
                    <p className="titleChart"> {"Thống kê bất động sản khu vực (top 10)"}</p>
                    <Grid container xs={12} md={12} spacing={2}>
                        <Grid item xs={12} md={4}>
                            <ControlDateTimePicker
                                size="small"
                                variant="outlined"
                                // containerClassName="w-50"
                                label={"Thời gian bắt đầu"}
                                value={this.model.realEstateByRegionTimeStart || null}
                                onDateChange={(value) => {
                                    this.setModel({
                                        realEstateByRegionTimeStart: value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ControlDateTimePicker
                                size="small"
                                variant="outlined"
                                // containerClassName="w-50"
                                minDate={this.model.realEstateByRegionTimeStart}
                                label={"Thời gian kết thúc"}
                                value={this.model.realEstateByRegionTimeEnd || null}
                                onDateChange={(value) => {
                                    this.setModel({
                                        realEstateByRegionTimeEnd: value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.controller.countByRegion()}
                            >
                                {"Thống kê"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Chart
                            chartType="BarChart"
                            data={this.model?.realEstateByRegionList || []}
                            options={{
                                hAxis: {
                                    title: "Tổng số bài đăng",
                                    minValue: 0,
                                },
                            }}
                            width={"100%"}
                            height={"400px"}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} md={6} className="mt-3">
                    <p className="titleChart"> {"Thống kê bất động sản theo các tháng trong năm"}</p>

                    <Grid item xs={12}>
                        <Chart
                            chartType="Bar"
                            data={this.model?.realEstateByMonthList}
                            options={{
                                hAxis: {
                                    title: "Tổng số bài đăng",
                                    minValue: 0,
                                },
                            }}
                            width={"100%"}
                            height={"400px"}
                        />

                        {/* <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tháng</TableCell>
                                        <TableCell>Số tin đăng</TableCell>
                                        <TableCell>Tháng</TableCell>
                                        <TableCell>Số tin đăng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>01</TableCell>
                                    <TableCell>{count1} VNĐ</TableCell>
                                    <TableCell>07</TableCell>
                                    <TableCell>{count7} VNĐ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>02</TableCell>
                                    <TableCell>{count2} VNĐ</TableCell>
                                    <TableCell>08</TableCell>
                                    <TableCell>{count8} VNĐ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>3</TableCell>
                                    <TableCell>03</TableCell>
                                    <TableCell>{count3} VNĐ</TableCell>
                                    <TableCell>09</TableCell>
                                    <TableCell>{count9} VNĐ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>4</TableCell>
                                    <TableCell>04</TableCell>
                                    <TableCell>{count4} VNĐ</TableCell>
                                    <TableCell>10</TableCell>
                                    <TableCell>{count10} VNĐ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>5</TableCell>
                                    <TableCell>05</TableCell>
                                    <TableCell>{count5} VNĐ</TableCell>
                                    <TableCell>11</TableCell>
                                    <TableCell>{count11} VNĐ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>6</TableCell>
                                    <TableCell>06</TableCell>
                                    <TableCell>{count6} VNĐ</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>{count12} VNĐ</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer> */}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
