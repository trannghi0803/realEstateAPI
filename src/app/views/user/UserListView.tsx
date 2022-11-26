import React from "react";
import { observer } from "mobx-react";
import BaseView from "../base/BaseView";
import { UserModel } from "../../models";
import { UserService } from "../../services";
import { UserListController } from "../../controllers/user";

@observer
export default class UserListView extends BaseView<UserListController, UserModel, UserService> {
    constructor(props: any) {
        super(props, UserListController, UserModel, UserService);
    }

    // renderFormFilter = () => {
    //     return (
    //         <CustomSearchFilter
    //             key={this.model.searchText}
    //             placeholder={Strings.Common.SEARCH}
    //             searchName={this.model.searchText || ''}
    //             onFilter={() => { this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25) }}
    //             onReset={() => { this.controller.onReset() }}
    //             onSearchText={(val) => { this.setModel({ searchText: val }); this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25) }}
    //         >
    //             <Grid container spacing={1}>
    //                 <Grid item xs={6}>
    //                     <ControlAutocomplete
    //                         containerClassName="mb-3 mt-1r"
    //                         key={this.model.zoneCodeFilter?.value}
    //                         multiple
    //                         disabled={Number(GlobalState.roleLevel) < RoleLevel.PC ? false : true}
    //                         label={Strings.Staff.WORKING_AREA}
    //                         items={this.model.workingAreaList || []}
    //                         value={this.model.zoneCodeFilter?.value}
    //                         onChangeValue={(value: string) => {
    //                             this.setModel({
    //                                 zoneCodeFilter: { value },
    //                                 staffNameList: [],
    //                                 staffIdFilter: undefined,
    //                                 renderKey: Date.now()
    //                             });
    //                             // if(!Helpers.isNullOrEmpty(this.model.roleLevelFilter) && Number(this.model.roleLevelFilter) >= RoleLevel.SPM) {
    //                             this.controller.getStaffNameList(value)
    //                             // }
    //                             //this.controller.getStaffNameList(value)
    //                         }}
    //                     />
    //                 </Grid>
    //                 {/* <Grid item xs={6}>
    //                     <ControlAutocomplete
    //                         containerClassName="mb-3 mt-1r"
    //                         multiple
    //                         label={Strings.Staff.LOCALITY}
    //                         items={this.model.provinceList || []}
    //                         value={this.model.provinceCodeFilter?.value}
    //                         onChangeValue={(value: string) => {
    //                             this.setModel({
    //                                 provinceCodeFilter: { value }
    //                             });
    //                         }}
    //                     />
    //                 </Grid> */}
    //                 {/* <Grid item xs={6} >
    //                     <ControlAutocomplete
    //                         disabled={Number(GlobalState.roleLevel) < RoleLevel.PC ? false : true}
    //                         label={Strings.Staff.ROLE_LEVEL}
    //                         placeholder={Strings.Staff.ROLE_LEVEL}
    //                         items={this.model.roleList || []}
    //                         value={this.model.roleLevelFilter}
    //                         onChangeValue={(value: any) => {
    //                             this.setModel({ roleLevelFilter: value })
    //                             this.controller.getStaffNameList(value, this.model.zoneCodeFilter?.value)
    //                         }}
    //                     />
    //                 </Grid> */}

    //                 <Grid item xs={6} >
    //                     <ControlAutocomplete
    //                         multiple
    //                         disabled={Number(GlobalState.roleLevel) < RoleLevel.PC ? false : true}
    //                         key={this.model.staffIdFilter?.value}
    //                         label={Strings.JourneyPlan.PC_NAME}
    //                         placeholder={Strings.Staff.NAME_BY_ROLE}
    //                         items={this.model.staffNameList || []}
    //                         value={this.model.staffIdFilter?.value}
    //                         onChangeValue={(value: any) => this.setModel({ staffIdFilter: { value } })}
    //                     />
    //                 </Grid>

    //                 <Grid item xs={6}>
    //                     <ControlCheckbox
    //                         label={Strings.Staff.TERMINARED}
    //                         containerClassName="mr-3 w-40 d-inline-flex"
    //                         value={this.model.terminatedFilter?.value || false}
    //                         onChangeValue={(value) => {
    //                             this.setModel({
    //                                 terminatedFilter: { value: value === true ? Terminated.True : Terminated.False }
    //                             })
    //                         }}
    //                     />
    //                 </Grid>
    //                 {/* <Grid item xs={6}>
    //                     <ControlInput
    //                         label={Strings.Staff.NAME}
    //                         defaultValue={this.model.searchText || ""}
    //                         onChangeValue={(value: string) => {
    //                             this.setModel({
    //                                 searchText: value,
    //                             })
    //                         }}
    //                     />
    //                 </Grid> */}
    //             </Grid>
    //         </CustomSearchFilter>
    //     )
    // }
    // renderAction = (params: GridCellParams) => {
    //     return (
    //         <ControlPopupMenu>
    //             {params.value == Status.Inactive &&
    //                 <>
    //                     {
    //                         GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.APPROVE) &&
    //                         <Button
    //                             variant="text"
    //                             className="d-block w-100 text-left"
    //                             onClick={() => this.controller.approve(`${params.id}` || '')} >
    //                             {Strings.Staff.APPROVE}
    //                         </Button>
    //                     }
    //                     {
    //                         GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.REJECT) &&
    //                         <Button
    //                             variant="text"
    //                             className="d-block w-100 text-left"
    //                             onClick={() => this.controller.reject(`${params.id}` || '')} >
    //                             {Strings.Staff.REJECT}
    //                         </Button>
    //                     }
    //                 </>
    //             }

    //             {(GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.UPDATE) && params.row.roleCode !== RoleCode.SalesRep && params.row.roleCode !== RoleCode.SalesSupervisor) ?
    //                 ((Number(this.model.roleCheckResource) === RoleLevel.PC && Number(params.value) === Status.Reject) ||
    //                     (Number(this.model.roleCheckResource) !== RoleLevel.PC && Number(params.value) !== Status.Inactive)) ?
    //                     <Button
    //                         variant="text"
    //                         className="d-block w-100 text-left"
    //                         onClick={() => this.history.push(`${Screens.CREATE_OR_UPDATE_STAFF}?id=${params.id}`)}  >
    //                         {Strings.Common.EDIT}
    //                     </Button>
    //                     :
    //                     <Button
    //                         variant="text"
    //                         className="d-block w-100 text-left"
    //                         onClick={(e) => this.history.push(`${Screens.DETAIL_STAFF}?id=${params.id}`)}>
    //                         {Strings.Common.SEE}
    //                     </Button>
    //                 : (GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.DETAIL) && params.row.roleCode !== RoleCode.SalesRep && params.row.roleCode !== RoleCode.SalesSupervisor) ?
    //                     <Button
    //                         variant="text"
    //                         className="d-block w-100 text-left"
    //                         onClick={(e) => this.history.push(`${Screens.DETAIL_STAFF}?id=${params.id}`)}>
    //                         {Strings.Common.SEE}
    //                     </Button>
    //                     : null
    //             }
    //             {
    //                 params.value == Status.Reject &&
    //                 GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.DELETE) &&
    //                 <Button
    //                     variant="text"
    //                     className="d-block w-100 text-left"
    //                     onClick={(e) => this.controller.deleteStaff(`${params.id}`)}>
    //                     {Strings.Common.DELETE}
    //                 </Button>
    //             }
    //             {
    //                 (params.value !== Status.Reject && params.value !== Status.Inactive) &&
    //                 <>
    //                     {
    //                         GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.DETAIL_INFO_LOGIN) &&
    //                         <Button
    //                             variant="text"
    //                             className="d-block w-100 text-left"
    //                             onClick={(e) => {
    //                                 this.setModel({
    //                                     qrModal: true,
    //                                     staff: {
    //                                         name: params?.row?.name + ".pdf",
    //                                         phoneNumber: params?.row?.phoneNumber,
    //                                         qrCodeUrl: params?.row?.qrCodeUrl,
    //                                         manualEntryKey: params?.row?.manualEntryKey
    //                                     }
    //                                 });
    //                             }
    //                             }>
    //                             {Strings.Staff.INFO_ACC}
    //                         </Button>
    //                     }
    //                     {
    //                         GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.ADD_FACE) &&
    //                         <Button
    //                             variant="text"
    //                             className="d-block w-100 text-left"
    //                             onClick={(e) => { this.history.push(`${Screens.ADD_FACES_BY_STAFF}?id=${params.id}`) }}>
    //                             {Strings.Staff.ADD_FACE}
    //                         </Button>
    //                     }
    //                 </>
    //             }
    //             {
    //                 (params.value !== Status.Reject && params.value !== Status.Inactive) && (Number(this.model.roleCheckResource) <= RoleLevel.SPA) &&
    //                 GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.LOGOUT_BY_DEVICE) &&
    //                 <Button
    //                     variant="text"
    //                     className="d-block w-100 text-left"
    //                     onClick={(e) => this.controller.resetLoginInformation(`${params.row.staffId}`)}>
    //                     {Strings.Common.LOGOUT_ALL}
    //                 </Button>
    //             }
    //         </ControlPopupMenu>
    //     )
    // }
    // renderTable() {
    //     const rows: GridRowsProp = this.model.staffList?.map((el, i) => {
    //         let zoneNameList = "";
    //         if (el.zoneNames && el.zoneNames.length > 0) {
    //             let length = el.zoneNames.length > 1 ? ', ' : '';
    //             el.zoneNames?.map((el: any) => {
    //                 zoneNameList += el + length;
    //             })

    //         }
    //         return {
    //             index: (i + 1) + ((this.model.pageNumber || 1) - 1) * (this.model.pageSize || Constants.ROW_PER_PAGE_25),
    //             id: el.id,
    //             staffId: el.staffId,
    //             name: el.name,
    //             zoneNames: zoneNameList,
    //             workingArea: el.workingAreaName,
    //             reportingTo: el.reportingToName,
    //             uniform: el.uniformName,
    //             role: el.roleName,
    //             qrCodeUrl: el.qrCodeUrl,
    //             manualEntryKey: el.manualEntryKey,
    //             employmentDate: moment(el.employmentDate * 1000).format(Constants.DateFormat.DDMMYYYY),
    //             terminated: el.terminated,
    //             terminationtDate: el.terminationtDate !== 0 ? moment(el.terminationtDate * 1000).format(Constants.DateFormat.DDMMYYYY) : '',
    //             phoneNumber: el.phoneNumber,
    //             roleCode: el.roleCode,
    //             action: el.status
    //         }
    //     }) || [];
    //     const columns: GridColDef[] = [
    //         {
    //             field: 'action',
    //             headerAlign: 'left',
    //             align: 'left',
    //             headerName: Strings.Common.ACTION,
    //             renderCell: this.renderAction,
    //             width: 120, sortable: false
    //         },
    //         // { field: 'index', headerName: "#", width: 80 },
    //         { field: 'staffId', headerName: Strings.Staff.STAFF_CODE, width: 120 },
    //         { field: 'name', headerName: Strings.Staff.NAME, width: 200 },
    //         {
    //             field: 'zoneNames', headerName: Strings.Staff.WORKING_AREA, width: 150,
    //             renderCell: (params: GridCellParams) => {
    //                 return (
    //                     <Tooltip title={params.row.zoneNames} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
    //                         <Typography className="MuiTypography-body1--custom">{params.row.zoneNames}</Typography>
    //                     </Tooltip>
    //                 )
    //             }
    //         },
    //         {
    //             field: 'workingArea', headerName: Strings.Staff.LOCALITY, width: 150,
    //             renderCell: (params: GridCellParams) => {
    //                 return (
    //                     <Tooltip title={params.row.workingArea} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
    //                         <Typography className="MuiTypography-body1--custom">{params.row.workingArea}</Typography>
    //                     </Tooltip>
    //                 )
    //             }
    //         },
    //         { field: 'phoneNumber', headerName: Strings.Staff.PHONE, width: 150, sortable: false, },
    //         { field: 'role', headerName: Strings.Staff.ROLE_LEVEL, width: 140 },
    //         { field: 'uniform', headerName: Strings.Staff.UNIFORM, width: 140 },
    //         { field: 'employmentDate', headerName: Strings.Staff.EMPLOYMENT_DATE, width: 150 },
    //         {
    //             field: 'terminated', headerName: Strings.Staff.TERMINARED, width: 140, sortable: false,
    //             renderCell: (params: GridCellParams) => {
    //                 let color = '';
    //                 let text = '';
    //                 if (Number(params.value) === Terminated.True) {
    //                     color = 'rejectColor';
    //                     text = Strings.Staff.TERMINARED
    //                     return (
    //                         <Grid>
    //                             <button className={`${color} button-status button-table`}>{text}</button>
    //                         </Grid>
    //                     )
    //                 } else {
    //                     return <></>
    //                 }
    //             }
    //         },
    //         { field: 'terminationtDate', headerName: Strings.Staff.TERMINARED_DAY, width: 160 },
    //         { field: 'reportingTo', headerName: Strings.Staff.REPORTING_TO, width: 150 },
    //     ];
    //     return (
    //         <ControlDatagrid
    //             filterForm={this.renderFormFilter()}
    //             rows={rows}
    //             columns={columns}
    //             page={(this.model.pageNumber || 1) - 1 || 0}
    //             pageSize={this.model.pageSize || 0}
    //             rowCount={this.model.totalCount || 0}
    //             rowsPerPageOptions={Constants.ROW_PER_PAGE_OPTIONS}
    //             onPageChange={(page) => this.controller.handleChangePage(page.page + 1, (this.model.pageSize || Constants.ROW_PER_PAGE_25))}
    //             onPageSizeChange={(page) => { this.controller.handleChangePage(this.model.pageNumber || 1, page.pageSize) }}
    //             getRowClassName={(params) => {
    //                 return params.row.action === Status.Reject ? "rejectColor" : params.row.action === Status.Inactive ? "waitingColor" : "";
    //             }}
    //             onSortModelChange={async (data) => {
    //                 if (JSON.stringify(this.model.listDataSort) !== JSON.stringify(data)) {
    //                     this.setModel({
    //                         listDataSort: data,
    //                     })
    //                     await this.controller.getPaged();
    //                 }
    //             }}
    //             sortingMode='server'
    //         />
    //     );
    // }
    // // renderDialog() {
    // //     return (
    // //         <ControlDialog title=""
    // //             open={this.model.approveModal || false}
    // //             onClose={() => this.setModel({ approveModal: false })}
    // //         >
    // //             <Grid >
    // //                 <Grid className="mt-5 mb-4 text-center">
    // //                     <h4 className="text-center">
    // //                         {Strings.Staff.APPROVE_QUESTION}
    // //                     </h4>
    // //                 </Grid>
    // //                 <Grid className="mt-5">
    // //                     <Button onClick={() => this.controller.approve(this.model.idApprove || '')} size="small" variant="contained" color="secondary" className="float-right m-1">
    // //                         {Strings.Staff.APPROVE}
    // //                     </Button>
    // //                     {this.model.statusStaff !== Status.Reject.toString() ?
    // //                         <Button onClick={() => this.controller.reject(this.model.idApprove || '')} size="small" variant="contained" color="primary" className="float-right m-1">
    // //                             {Strings.Staff.REJECT}
    // //                         </Button>

    // //                         : null}

    // //                     <Button onClick={() => this.setModel({ approveModal: false })} size="small" variant="contained" className="float-right m-1">
    // //                         {Strings.Common.CANCEL}
    // //                     </Button>
    // //                 </Grid>
    // //             </Grid>
    // //         </ControlDialog>
    // //     )
    // // }
    // renderDialogQR() {
    //     return (
    //         <ControlDialog title={Strings.Staff.INFO_ACC}
    //             maxWidth="md"
    //             open={this.model.qrModal || false}
    //             onClose={() => this.setModel({ qrModal: false })}
    //         >
    //             <Grid className="">
    //                 {this.model.staff ?
    //                     <Grid>
    //                         <Grid>
    //                             <b>{Strings.Staff.PHONE} : </b> {this.model.staff.phoneNumber}
    //                         </Grid>
    //                         <Grid >
    //                             <b>{Strings.Staff.PASSWORD_DEFAULT}: </b> {Constants.PASSWORD_DEFAULT}
    //                         </Grid>
    //                         <Grid >
    //                             <b>{Strings.Staff.MANUAL_ENTRY_KEY} : </b> {this.model.staff.manualEntryKey}
    //                         </Grid>
    //                         <Grid >
    //                             <b>QR : </b>
    //                             <Grid><img src={this.model.staff.qrCodeUrl} /></Grid>

    //                         </Grid>
    //                         <Grid>
    //                             <InvoicePDF data={this.model.staff} />
    //                         </Grid>
    //                     </Grid>
    //                     :
    //                     <Grid className="text-center"> Không có mã QR </Grid>
    //                 }
    //             </Grid>
    //         </ControlDialog>
    //     )
    // }
    // public renderPage() {
    //     return (
    //         (GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.LIST)) &&
    //         <Grid container spacing={1} alignItems={"center"}>
    //             <Grid className="title-screen" item xs={12} sm={6}>
    //                 {Strings.Staff.TITLE_LIST}
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //                 {GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.CREATE) ?
    //                     <Button style={{ width: "fit-content" }}
    //                         variant="contained"
    //                         color="primary"
    //                         className="float-right"
    //                         startIcon={<Add />}
    //                         onClick={() => { this.history.push(Screens.CREATE_OR_UPDATE_STAFF) }}>
    //                         {Strings.Staff.ADD_STAFF}
    //                     </Button>
    //                     : undefined
    //                 }
    //                 {Number(GlobalState.roleLevel) === RoleLevel.SysAdmin ?
    //                     <Button style={{ width: "fit-content" }}
    //                         variant="contained"
    //                         color="primary"
    //                         className="float-right mr-3"
    //                         startIcon={<Add />}
    //                         onClick={() => { this.history.push(Screens.CREATE_OR_UPDATE_AGENCY) }}>
    //                         {Strings.Staff.ADD_AGENCY}
    //                     </Button>
    //                     : undefined
    //                 }
    //                 {Number(GlobalState.roleLevel) === RoleLevel.SysAdmin ?
    //                     <Button style={{ width: "fit-content" }}
    //                         variant="contained"
    //                         color="primary"
    //                         className="float-right mr-3"
    //                         startIcon={<Add />}
    //                         onClick={() => {
    //                             this.history.push(`${Screens.CREATE_OR_UPDATE_AGENCY}?id=09e5bfad5b5f4fe184900f53ff71c1b4`)
    //                         }}>
    //                         {"nút detaol tạm"}
    //                     </Button>
    //                     : undefined
    //                 }
    //             </Grid>
    //             <Grid item xs={12}>
    //                 {

    //                     (!Helpers.isNullOrEmpty(this.model.terminatedFilter?.value) && Number(this.model.terminatedFilter?.value) !== Terminated.False) &&
    //                     <ControllChip
    //                         label={Strings.Staff.TERMINARED}
    //                         onDelete={() => {
    //                             this.setModel({
    //                                 terminatedFilter: { value: undefined },
    //                             });
    //                             this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
    //                         }}
    //                     />
    //                 }
    //                 {/* {
    //                     !Helpers.isNullOrEmpty(this.model.searchText) &&
    //                     <ControllChip
    //                         label={`${Strings.Common.SEARCH}: ${this.model.searchText}`}
    //                         onDelete={() => {
    //                             this.setModel({
    //                                 searchText: undefined,
    //                             });
    //                             this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
    //                         }}
    //                     />
    //                 } */}
    //                 {
    //                     (!Helpers.isNullOrEmpty(this.model.zoneCodeFilter?.value) && Number(GlobalState.roleLevel < RoleLevel.PC)) ?
    //                         this.model.zoneCodeFilter?.value.map((item: string, index: number) => (
    //                             <ControllChip
    //                                 label={`${Strings.Staff.WORKING_AREA}: ${this.model.workingAreaList?.find(el => el.code === item)?.name}`}
    //                                 onDelete={() => {
    //                                     let temp = this.model.zoneCodeFilter?.value?.filter((el: any) => el !== item)
    //                                     this.setModel({
    //                                         zoneCodeFilter: { value: temp }
    //                                     });
    //                                     this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
    //                                 }}
    //                             />
    //                         )) : null
    //                 }
    //                 {/* {
    //                     !Helpers.isNullOrEmpty(this.model.roleLevelFilter) &&
    //                     <ControllChip
    //                         label={`${Strings.Staff.ROLE_LEVEL}: ${this.model.roleList?.find(el => Number(el.code) === this.model.roleLevelFilter)?.name}`}
    //                         onDelete={() => {
    //                             this.setModel({
    //                                 roleLevelFilter: undefined,
    //                             });
    //                             this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
    //                         }}
    //                     />
    //                 } */}
    //                 {
    //                     !Helpers.isNullOrEmpty(this.model.provinceCodeFilter?.value) &&
    //                     this.model.provinceCodeFilter?.value?.map((item: string, index: number) => (
    //                         <ControllChip
    //                             label={`${Strings.Staff.LOCALITY}: ${this.model.provinceList?.find(el => el.code === item)?.name}`}
    //                             onDelete={() => {
    //                                 let temp = this.model.provinceCodeFilter?.value?.filter((el: any) => el !== item)

    //                                 this.setModel({
    //                                     provinceCodeFilter: { value: temp }
    //                                 });
    //                                 this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
    //                             }}
    //                         />
    //                     ))
    //                 }
    //                 {
    //                     (!Helpers.isNullOrEmpty(this.model.staffIdFilter?.value) && Number(GlobalState.roleLevel < RoleLevel.PC)) ?
    //                         this.model.staffIdFilter?.value.map((item: string, index: number) => (
    //                             <ControllChip
    //                                 label={`${Strings.Staff.NAME}: ${this.model.staffNameList?.find(el => el.code == item)?.name}`}
    //                                 onDelete={() => {
    //                                     let temp = this.model.staffIdFilter?.value?.filter((el: any) => el !== item)
    //                                     this.setModel({
    //                                         staffIdFilter: { value: temp }
    //                                     });
    //                                     this.controller.handleChangePage(1, this.model.pageSize || Constants.ROW_PER_PAGE_25)
    //                                 }}
    //                             />
    //                         ))
    //                         : null
    //                 }
    //             </Grid>
    //             {
    //                 Number(GlobalState.roleLevel < RoleLevel.PC) ?
    //                     <Grid item xs={12}>
    //                         <p>{this.model.countByRegion ? `${Strings.RegionStaffAmount.LIMIT_ZONE}: ${this.model.countByRegion}` : null} </p>
    //                     </Grid>
    //                     : null
    //             }
    //             <Grid item xs={12}>
    //                 {
    //                     // GlobalState.resources?.find((el: string) => el === Constants.ResourceCode.Staff.LIST) &&
    //                     this.renderTable()
    //                 }


    //             </Grid>
    //             {/* {this.renderDialog()} */}
    //             {this.renderDialogQR()}
    //         </Grid>
    //     );
    // }
}
