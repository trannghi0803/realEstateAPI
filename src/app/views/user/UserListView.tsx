import React from "react";
import { observer } from "mobx-react";
import BaseView from "../base/BaseView";
import { UserModel } from "../../models";
import { UserService } from "../../services";
import { Button, Tooltip, Typography, Grid } from "@material-ui/core";
import { GridCellParams, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import { ControlPopupMenu, ControlDatagrid } from "../../../components";
import { Strings, Screens } from "../../../constants";
import { Add } from "@material-ui/icons";
import { Status, UserType } from "../../../constants/Enums";
import { UserListController } from "../../controllers/user";

@observer
export default class UserListView extends BaseView<UserListController, UserModel, UserService> {
    constructor(props: any) {
        super(props, UserListController, UserModel, UserService);
    }

    renderAction = (params: GridCellParams) => {
        return (
            <ControlPopupMenu>
                {
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => { }} >
                        {Strings.Common.DELETE}
                    </Button>
                }
                {
                    <Button
                        variant="text"
                        className="d-block w-100 text-left"
                        onClick={() => this.history.push(`${Screens.CREATE_UPDATE_USER}?id=${params.row.id}`)}>
                        {Strings.Common.EDIT}
                    </Button>
                }
            </ControlPopupMenu>
        )
    }

    renderTable() {
        const rows: GridRowsProp = this.model.userList?.map((el: any, i: number) => {
            return {
                index: (i + 1),
                id: el.id,
                userName: el.userName,
                email: el.email,
                phoneNumber: el.phoneNumber,
                role: el.role === UserType.Admin ? "Admin" : "User",
                status: el.status,
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
                field: 'status', headerName: Strings.User.STATUS, width: 200, sortable: false,
                renderCell: (params: GridCellParams) => {
                    let color = '';
                    let text = '';
                    switch (params.value) {
                        // case Status.Active: color = 'approveColor'; text = Strings.Absent.APPROVED_LOG; break;
                        case Status.Active:
                            color = 'approveColor';
                            text = "Đang hoạt động";
                            break;
                        case Status.Inactive: color = 'waitingColor'; text = "Chờ duyệt"; break;
                        case Status.Locked: color = 'rejectColor'; text = "Đang khóa"; break;
                    }
                    return (
                        <Grid>
                            <button className={`${color} button-status button-table`}>{text}</button>
                        </Grid>
                    )
                }
            },
            { field: 'userName', headerName: Strings.User.USER_NAME, width: 220, sortable: false },
            { field: 'email', headerName: Strings.User.EMAIL, width: 180, sortable: false },
            { field: 'phoneNumber', headerName: Strings.User.PHONE_NUMBER, width: 180, sortable: false },
            { field: 'role', headerName: `${Strings.User.ROLE}`, width: 150, },
        ];
        return (
            <ControlDatagrid
                // filterForm={this.renderFormFilter()}
                rows={rows}
                columns={columns}
                totalCount={this.model.totalCount}
                isHidePagnation={true}
            />
        );
    }
    public renderPage() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} className="title-screen">
                    {Strings.User.TITLE_LIST}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        <Button
                            color="primary"
                            variant="contained"
                            className="float-right"
                            startIcon={<Add />}
                            onClick={() => this.history.push(Screens.CREATE_UPDATE_USER)}
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
