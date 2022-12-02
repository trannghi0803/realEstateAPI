import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { Add } from "@material-ui/icons";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import { GridCellParams, GridColDef, GridRowsProp } from "@material-ui/data-grid";

import BaseView from "../base/BaseView";
import { Constants, Screens, Strings } from "../../../constants";
import { ControlAutocomplete, ControlCheckbox, ControlDatagrid, ControllChip, ControlPopupMenu, CustomSearchFilter } from "../../../components";
import { RealEstateListController } from "../../controllers/realEstate";
import { RealEstateModel } from "../../models";
import { RealEstateService } from "../../services";
import { Status } from "../../../constants/Enums";
import { GlobalState } from "../../../stores/GlobalState";
import { Helpers } from "../../../commons/utils";


@observer
export default class RealEstateListView extends BaseView<RealEstateListController, RealEstateModel, RealEstateService> {
    constructor(props: any) {
        super(props, RealEstateListController, RealEstateModel, RealEstateService);
    }

    renderFormFilter = () => {
        return (
            <CustomSearchFilter
                key={this.model.searchText}
                searchName={this.model.searchText || ''}
                onFilter={() => { this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25) }}
                // onReset={() => { this.controller.onReset() }}
                onSearchText={(val) => {
                    this.setModel({ searchText: val });
                    this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
                }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <ControlAutocomplete
                            containerClassName="mb-3 mt-1r"
                            key={this.model.categoryFilter}
                            label={"Loại bất động sản"}
                            items={this.model.categoryList || []}
                            value={this.model.categoryFilter}
                            onChangeValue={(value) => {
                                this.setModel({
                                    categoryFilter: value,
                                    renderKey: Date.now()
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ControlAutocomplete
                            variant="outlined"
                            label={Strings.RealEstate.CITY}
                            items={this.model.provinceList || []}
                            value={this.model.provinceFilter || ""}
                            onChangeValue={(value) => {
                                this.setModel({
                                    provinceFilter: value,
                                    renderKey: Date.now()
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ControlAutocomplete
                            containerClassName="mb-3 mt-1r"
                            key={this.model.statusFilter}
                            label={"Loại bất động sản"}
                            items={this.model.statusList || []}
                            value={this.model.statusFilter || ""}
                            onChangeValue={(value) => {
                                this.setModel({
                                    statusFilter: value,
                                    renderKey: Date.now()
                                });
                            }}
                        />
                    </Grid>


                    {/* <Grid item xs={6}>
                        <ControlCheckbox
                            label={"Trạng thái"}
                            containerClassName="mr-3 w-40 d-inline-flex"
                            value={this.model.terminatedFilter?.value || false}
                            onChangeValue={(value) => {
                                this.setModel({
                                    terminatedFilter: { value: value === true ? Terminated.True : Terminated.False }
                                })
                            }}
                        />
                    </Grid> */}
                </Grid>
            </CustomSearchFilter>
        )
    }

    renderAction = (params: GridCellParams) => {
        return (
            <ControlPopupMenu>
                {
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => this.controller.deleteRealEstate(`${params.row.id}`)} >
                        {Strings.Common.DELETE}
                    </Button>
                }
                {
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => this.history.push(`${Screens.CREATE_UPDATE_REAL_ESTATE}?id=${params.row.id}`)}>
                        {Strings.Common.EDIT}
                    </Button>
                }
                {
                    Number(params.row.status) === Status.Inactive || Number(params.row.status) === Status.Reject &&
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => this.controller.approve(`${params.value}`)}>
                        {Strings.Common.APPROVE}
                    </Button>
                }
                {
                    Number(params.row.status) === Status.Inactive &&
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => this.controller.reject(`${params.value}`)}>
                        {Strings.Common.REJECT}
                    </Button>
                }
            </ControlPopupMenu>
        )
    }

    renderTable() {
        const rows: GridRowsProp = this.model.realEstateList?.map((el: any, i: number) => {
            return {
                index: (i + 1) + ((this.model.pageNumber || 1) - 1) * (this.model.pageSize || Constants.ROW_PER_PAGE),
                id: el._id,
                title: el.title,
                price: el.price,
                area: el.area,
                attributes: el.attributes,
                images: el.images[0],
                category: this.model.categoryList?.find(e => e.id === el.category)?.name,
                description: el.description,
                //type: `${this.model.typeList?.find(item => Number(item.code) === el.type)?.name}`,
                // time: `${start} - ${end}`,
                status: el.status,
                provinceName: el.address?.provinceName,
                action: el._id,
            }
        }) || [];
        const columns: GridColDef[] = [
            {
                field: 'action', headerAlign: 'left', align: 'left',
                headerName: Strings.Common.ACTION,
                renderCell: this.renderAction,
                width: 90, sortable: false,
            },
            { field: 'index', headerName: "#", width: 50, sortable: false },
            {
                field: 'status', headerName: Strings.User.STATUS, width: 180, sortable: false,
                renderCell: (params: GridCellParams) => {
                    let color = '';
                    let text = '';
                    switch (params.value) {
                        // case Status.Active: color = 'approveColor'; text = Strings.Absent.APPROVED_LOG; break;
                        case Status.Active:
                            color = 'approveColor';
                            text = "Đã đăng";
                            break;
                        case Status.Inactive: color = 'waitingColor'; text = "Chờ duyệt"; break;
                        case Status.Reject: color = 'rejectColor'; text = "Từ chối"; break;
                    }
                    return (
                        <Grid>
                            <button className={`${color} button-status button-table`}>{text}</button>
                        </Grid>
                    )
                }
            },
            {
                field: 'images', headerName: Strings.RealEstate.IMAGE, width: 100, sortable: false,
                renderCell: (params: GridCellParams) => {
                    return (
                        params.row.images ? <img className="imgItem" src={params.row.images} /> : <></>
                    )
                }
            },
            {
                field: 'title', headerName: Strings.RealEstate.NAME, width: 220, sortable: false,
                renderCell: (params: GridCellParams) => {
                    return (
                        <Tooltip title={params.row.title} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            <Typography className="MuiTypography-body1--custom">{params.row.title}</Typography>
                        </Tooltip>
                    )
                }
            },
            { field: 'category', headerName: Strings.RealEstate.CATEGORY, width: 180, sortable: false },
            { field: 'provinceName', headerName: Strings.RealEstate.CITY, width: 180, sortable: false },
            { field: 'price', headerName: Strings.RealEstate.PRICE, width: 180, sortable: false },
            { field: 'area', headerName: Strings.RealEstate.AREA, width: 180, sortable: false },
            { field: 'attributes', headerName: Strings.RealEstate.ATTRIBUTE, width: 180, sortable: false },
            // { field: 'time', headerName: `${Strings.Common.TIME}`, width: 300, },
            {
                field: 'description', headerName: Strings.RealEstate.DESCRIPTION, width: 180, sortable: false,
                renderCell: (params: GridCellParams) => {
                    return (
                        <Tooltip title={params.row.description} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            <Typography className="MuiTypography-body1--custom">{params.row.description}</Typography>
                        </Tooltip>
                    )
                }
            },
        ];
        return (
            <ControlDatagrid
                filterForm={this.renderFormFilter()}
                rows={rows}
                columns={columns}
                page={(this.model.pageNumber || 1) - 1 || 0}
                pageSize={this.model.pageSize || 0}
                rowCount={this.model.totalCount || 0}
                onPageChange={(page) => this.controller.handleChangePage(page.page + 1, (this.model.pageSize || Constants.ROW_PER_PAGE))}
                onPageSizeChange={(page) => { this.controller.handleChangePage(this.model.pageNumber || 1, page.pageSize) }}
            />
        );
    }
    public renderPage() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} className="title-screen">
                    {Strings.RealEstate.TITLE_LIST}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        <Button
                            color="primary"
                            variant="contained"
                            className="float-right"
                            startIcon={<Add />}
                            onClick={() => this.history.push(Screens.CREATE_UPDATE_REAL_ESTATE)}
                        >
                            {Strings.Common.ADD_NEW}
                        </Button>
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        (!Helpers.isNullOrEmpty(this.model.categoryFilter)) &&
                        <ControllChip
                            label={`${Strings.RealEstate.CATEGORY}: ${this.model.categoryList?.find(el => el.code === this.model.categoryFilter)?.name}`}
                            onDelete={() => {
                                this.setModel({
                                    categoryFilter: undefined,
                                });
                                this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
                            }}
                        />
                    }

                    {
                        (!Helpers.isNullOrEmpty(this.model.provinceFilter)) &&
                        <ControllChip
                            label={`${Strings.RealEstate.CITY}: ${this.model.provinceList?.find(el => el.code === this.model.provinceFilter)?.name}`}
                            onDelete={() => {
                                this.setModel({
                                    provinceFilter: undefined,
                                });
                                this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
                            }}
                        />
                    }
                    
                    {
                        (!Helpers.isNullOrEmpty(this.model.statusFilter)) &&
                        <ControllChip
                            label={`Trạng thái: ${this.model.statusList?.find(el => el.code === this.model.statusFilter)?.name}`}
                            onDelete={() => {
                                this.setModel({
                                    statusFilter: undefined,
                                });
                                this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
                            }}
                        />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        this.renderTable()
                    }
                </Grid>
            </Grid>
        )
    }
}
