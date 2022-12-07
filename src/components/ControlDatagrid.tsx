import React, { useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    DataGrid, DataGridProps, GridEditCellValueParams,
    GridFooter, GridFooterContainer, GridSelectionModel,
} from '@material-ui/data-grid';
import { Helpers } from '../commons/utils';
import { Delete } from '@material-ui/icons';

interface IProps extends DataGridProps {
    rowsPerPageOptions?: number[];
    isClearDataSelect?: boolean;
    isHidePagnation?: boolean;
    statusSelect?: boolean;
    totalCount?: number;
    editMode?: string;
    border?: boolean;

    filterForm?: React.ReactNode;
    childrenInRight?: React.ReactNode;
    childrenInLeft?: React.ReactNode;

    listIdSelected?: any[];
    onDeleteSelected?: () => void;
    onClickSelectBox?: (any: any) => void;
    onCellValueChange?: (any: any) => void;
}

const useStyles = makeStyles((theme) => ({
    formIcon: {
        display: "flex",
        '& .MuiInputBase-input': {
            height: "unset"
        },

    },
    export: {
        color: "#626262",
        padding: '10px 7px',
        height: '35px',
        '&:hover': {
            color: "#42a5f5",
        },
    },
    icon: {
        color: "#626262",
        '&:hover': {
            color: "#42a5f5",
        },
    },
    border: {
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderRight: '1px solid #ccc',
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom: '1px solid #ccc',
        },
    },
    footerStyle: {
        fontSize: '13px'
    }
}))

export function CustomFooterComponent(props: {
    total: number;
    isHidePagnation: boolean;
    textStyle: string;
}) {
    return (
        <div className='d-flex float-right'>
            {props.isHidePagnation === true ?
                <>
                    <span className={props.textStyle}>{props.total > 0 ? "1-" : "0-"}{props.total + " of " + props.total}</span>
                </>
                :
                <GridFooterContainer>
                    <GridFooter />
                </GridFooterContainer>
            }
        </div>
    );
}

const ControlDatagrid: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const isHidePagnation = props.isHidePagnation;
    const [renderKey, setRenderKey] = React.useState<number>(Date.now());

    const onClickSelectBox = (listItem: GridSelectionModel) => {
        setRenderKey(Date.now());
        if (props.statusSelect && Helpers.isFunction(props.onClickSelectBox)) {
            props.onClickSelectBox(listItem);
        }
    }

    const onCellEdit = (params: GridEditCellValueParams) => {
        if (props.onCellValueChange && Helpers.isFunction(props.onCellValueChange)) {
            props.onCellValueChange(params)
        }
    }

    useEffect(() => {
        if (props.isClearDataSelect) {
            setRenderKey(Date.now());
        }
    }, [props.isClearDataSelect]);

    return (
        <Grid container spacing={1} className='align-items-center'>
            <Grid item xs={12} sm={6}>
                {props.childrenInLeft}
            </Grid>
            <Grid item xs={12} sm={6} className="d-flex align-items-center justify-content-end">
                {props.childrenInRight}
                {props.filterForm}
                {
                    ((props.listIdSelected || []).length > 0) &&
                    <IconButton
                        aria-label="Search"
                        className={`float-right`}
                        onClick={() => {
                            if (Helpers.isFunction(props.onDeleteSelected)) {
                                props.onDeleteSelected()
                            }
                        }}
                    >
                        <Delete />
                    </IconButton>
                }
            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    {...props}
                    autoHeight
                    pagination
                    key={renderKey}
                    disableColumnMenu
                    paginationMode="server"
                    // style={{ color: "#80858d" }}
                    disableSelectionOnClick={true}
                    onCellValueChange={onCellEdit}
                    onSelectionModelChange={onClickSelectBox}
                    className={props.border ? classes.border : ""}
                    checkboxSelection={props.statusSelect || false}
                    rowsPerPageOptions={props.rowsPerPageOptions ? props.rowsPerPageOptions : [10, 25, 100]}
                    components={{
                        Footer: CustomFooterComponent
                    }}
                    componentsProps={{
                        footer: {
                            total: props.totalCount || 0,
                            isHidePagnation: isHidePagnation || false,
                            textStyle: classes.footerStyle
                        }
                    }}
                //export csv
                // components={{
                //     Toolbar: () => {
                // return (
                //             <div className='d-flex float-right'>
                //                 <div className='d-flex float-right align-items-end' style={{ height: '3rem' }}>
                //                     {(seletedRow.length > 0 && props.statusSelect) ?
                //                         null
                //                         :
                //                         <Grid className={classes.formIcon}>
                //                             <GridToolbarExport color="inherit" className={classes.export} />
                //                         </Grid>
                //                     }
                //                 </div>
                //             </div>
                // )
                //     },
                // }}
                />
            </Grid>
        </Grid>
    );
}


export default ControlDatagrid;