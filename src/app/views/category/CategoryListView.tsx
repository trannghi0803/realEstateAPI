import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { Add } from "@material-ui/icons";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import { GridCellParams, GridColDef, GridRowsProp } from "@material-ui/data-grid";

import BaseView from "../base/BaseView";
import { Constants, Screens, Strings } from "../../../constants";
import { ControlAutocomplete, ControlDatagrid, ControllChip, ControlPopupMenu, CustomSearchFilter } from "../../../components";
import { CategoryModel } from "../../models";
import { CategoryListController } from "../../controllers/category";
import { CategoryService } from "../../services";
import Helpers from "../../../commons/utils/Helpers";

@observer
export default class CategoryListView extends BaseView<CategoryListController, CategoryModel, CategoryService> {
    constructor(props: any) {
        super(props, CategoryListController, CategoryModel, CategoryService);
    }

    renderFormFilter = () => {
        return (
            <CustomSearchFilter
                maxWidthDialog={"xs"}
                key={this.model.searchText}
                searchName={this.model.searchText}
                placeholder={Strings.Common.SEARCH}
                onSearchText={(val) => {
                    this.setModel({
                        searchText: val.trim(),
                        pageSize: Constants.ROW_PER_PAGE_25,
                    });
                    this.controller.getPaged();
                }}
                onFilter={() => { this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25) }}
                onReset={() => { this.controller.onReset() }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <ControlAutocomplete
                            variant={"outlined"}
                            label={Strings.Category.TYPE}
                            items={this.model.typeList || []}
                            key={`${this.model.typeFilter?.value}`}
                            value={`${this.model.typeFilter?.value}`}
                            onChangeValue={(value) => {
                                this.setModel({
                                    typeFilter: { value }
                                })
                            }}
                        />
                    </Grid>
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
                        onClick={() => this.controller.deleteCategory(`${params.row.id}`)} >
                        {Strings.Common.DELETE}
                    </Button>
                }
                {
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => this.history.push(`${Screens.CREATE_UPDATE_CATEGORY}?id=${params.row.id}`)}>
                        {Strings.Common.EDIT}
                    </Button>
                }
            </ControlPopupMenu>
        )
    }

    renderTable() {
        const rows: GridRowsProp = this.model.categoryList?.map((el: any, i: number) => {
            return {
                index: (i + 1) + ((this.model.pageNumber || 1) - 1) * (this.model.pageSize || Constants.ROW_PER_PAGE),
                id: el._id,
                name: el.name,
                description: el.description,
                type: `${this.model.typeList?.find(item => Number(item.code) === el.type)?.name}`,
                // time: `${start} - ${end}`,
                action: el.id,
            }
        }) || [];
        const columns: GridColDef[] = [
            {
                field: 'action', headerAlign: 'left', align: 'left',
                headerName: Strings.Common.ACTION,
                renderCell: this.renderAction,
                width: 130, sortable: false,
            },
            { field: 'index', headerName: "#", width: 80, sortable: false },
            { field: 'name', headerName: Strings.Category.NAME, width: 220, sortable: false },
            { field: 'type', headerName: Strings.Category.TYPE, width: 180, sortable: false },
            // { field: 'time', headerName: `${Strings.Common.TIME}`, width: 300, },
            {
                field: 'description', headerName: Strings.Category.DESCRIPTION, width: 180, sortable: false,
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
                    {Strings.Category.TITLE_LIST}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        <Button
                            color="primary"
                            variant="contained"
                            className="float-right"
                            startIcon={<Add />}
                            onClick={() => this.history.push(Screens.CREATE_UPDATE_CATEGORY)}
                        >
                            {Strings.Common.ADD_NEW}
                        </Button>
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        (!Helpers.isNullOrEmpty(this.model.typeFilter?.value)) &&
                        <ControllChip
                            label={`${Strings.Category.TYPE}: ${this.model.typeList?.find(el => el.code === this.model.typeFilter?.value)?.name}`}
                            onDelete={() => {
                                this.setModel({
                                    typeFilter: undefined,
                                });
                                this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
                            }}
                        />
                    }
                    {
                        (!Helpers.isNullOrEmpty(this.model.searchText)) &&
                        <ControllChip
                            label={`${Strings.Category.NAME}: ${this.model.searchText}`}
                            onDelete={() => {
                                this.setModel({
                                    searchText: undefined,
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
