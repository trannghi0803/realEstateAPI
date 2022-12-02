import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { Add } from "@material-ui/icons";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import { GridCellParams, GridColDef, GridRowsProp } from "@material-ui/data-grid";

import BaseView from "../base/BaseView";
import { Constants, Screens, Strings } from "../../../constants";
import { ControlDatagrid, ControlPopupMenu, CustomSearchFilter } from "../../../components";
import { NewsListController } from "../../controllers/news";
import { NewsModel } from "../../models";
import { NewsService } from "../../services";


@observer
export default class NewsListView extends BaseView<NewsListController, NewsModel, NewsService> {
    constructor(props: any) {
        super(props, NewsListController, NewsModel, NewsService);
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
                        onClick={() => this.controller.deleteNews(`${params.row.id}`)} >
                        {Strings.Common.DELETE}
                    </Button>
                }
                {
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => this.history.push(`${Screens.CREATE_UPDATE_NEWS}?id=${params.row.id}`)}>
                        {Strings.Common.EDIT}
                    </Button>
                }
            </ControlPopupMenu>
        )
    }

    renderTable() {
        const rows: GridRowsProp = this.model.newsList?.map((el: any, i: number) => {
            return {
                index: (i + 1) + ((this.model.pageNumber || 1) - 1) * (this.model.pageSize || Constants.ROW_PER_PAGE),
                id: el._id,
                title: el.title,
                abstract: el.abstract,
                content: el.content,
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
            { field: 'title', headerName: Strings.News.NAME, width: 220, sortable: false },
            {
                field: 'abstract', headerName: Strings.News.ABSTRACT, width: 180, sortable: false,
                renderCell: (params: GridCellParams) => {
                    return (
                        <Tooltip title={params.row.abstract} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            <Typography className="MuiTypography-body1--custom">{params.row.abstract}</Typography>
                        </Tooltip>
                    )
                }
            },
            {
                field: 'content', headerName: Strings.News.CONTENT, width: 180, sortable: false,
                renderCell: (params: GridCellParams) => {
                    return (
                        <Tooltip title={params.row.content} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            <Typography className="MuiTypography-body1--custom">{params.row.content}</Typography>
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
                totalCount={this.model.totalCount}
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
                    {Strings.News.TITLE_LIST}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        <Button
                            color="primary"
                            variant="contained"
                            className="float-right"
                            startIcon={<Add />}
                            onClick={() => this.history.push(Screens.CREATE_UPDATE_NEWS)}
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
