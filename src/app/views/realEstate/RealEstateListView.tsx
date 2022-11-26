import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { Add } from "@material-ui/icons";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import { GridCellParams, GridColDef, GridRowsProp } from "@material-ui/data-grid";

import BaseView from "../base/BaseView";
import { Constants, Screens, Strings } from "../../../constants";
import { ControlDatagrid, ControlPopupMenu, CustomSearchFilter } from "../../../components";
import { RealEstateListController } from "../../controllers/realEstate";
import { RealEstateModel } from "../../models";
import { RealEstateService } from "../../services";


@observer
export default class RealEstateListView extends BaseView<RealEstateListController, RealEstateModel, RealEstateService> {
    constructor(props: any) {
        super(props, RealEstateListController, RealEstateModel, RealEstateService);
    }

    renderFormFilter = () => {
        return (
            <CustomSearchFilter
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
            >
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
            </ControlPopupMenu>
        )
    }

    renderTable() {
        const rows: GridRowsProp = this.model.realEstateList?.map((el: any, i: number) => {
            return {
                index: (i + 1),
                id: el.id,
                title: el.title,
                price: el.price,
                area: el.area,
                attributes: el.attributes,
                images: el.images[0],
                category: this.model.categoryList?.find(e => e.id = el.category)?.name,
                description: el.description,
                //type: `${this.model.typeList?.find(item => Number(item.code) === el.type)?.name}`,
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
            {
                field: 'images', headerName: Strings.RealEstate.IMAGE, width: 100, sortable: false,
                renderCell: (params: GridCellParams) => {
                    return (
                        params.row.images ? <img className="imgItem" src={params.row.images} /> : <></>
                    )
                }
            },
            { field: 'title', headerName: Strings.RealEstate.NAME, width: 220, sortable: false },
            { field: 'category', headerName: Strings.RealEstate.CATEGORY, width: 180, sortable: false },
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
                pageSize={this.model.pageSize}
                onPageSizeChange={(newPageSize) => {
                    console.log("newPageSize", newPageSize);
                    this.setModel({
                        ...this.model,
                        pageSize: Number(newPageSize.pageSize)
                    })
                }}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
            // totalCount={this.model.totalCount}
            // isHidePagnation={true}
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
                            onClick={() => this.history.push(Screens.CREATE_UPDATE_REAL_ESTATE)}
                        >
                            {Strings.Common.ADD_NEW}
                        </Button>
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
