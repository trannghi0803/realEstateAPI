import React, { useState, useEffect } from "react";
import "./ComponentStyles.css";
import {
    TableContainer,
    Table,
    TableHead,
    TableCell,
    Paper,
    TableRow,
    TableBody,
    TablePagination,
    Tooltip,
    TableSortLabel
} from "@material-ui/core";
import { ArrowDropUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ControlPagination } from ".";
import { Constants, Strings } from "../constants";
import { Helpers } from "../commons/utils";
import { Sort } from "./ControlSvgIcon";



const useStyles = makeStyles(() => ({
    table: {
        minWidth: 750,
        width: "100%"
    },
    row: {
        "&:hover": {
            background: "rgba(0,0,0,.075)"
        },
    },
    pagecolor: {
        background: "#000080",
    }
}))

interface IHeader {
    key: string;
    value: string;
}

interface IProps {
    iKey?: string;
    dataKey?: string[];
    page: number;
    header: IHeader[];
    data: { [key: string]: string | number }[];
    totalRecord: number;
    hasAction?: boolean;
    renderAction?: (id?: string) => React.ReactNode;
    renderRow?: (row: any, index: number, page?: number) => React.ReactNode;
    onChangePage: (e: any, page: number) => void;
}


const ControlTable: React.FC<IProps> = (props: IProps) => {
    const [data, setData] = useState(props.data);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const { iKey, header, dataKey, hasAction, page, totalRecord, onChangePage, renderRow, renderAction } = props;
    const classes = useStyles();

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator<Key extends keyof any>(
        order: "asc" | "desc",
        orderBy: Key,
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleSort = (key: string) => {
        if (key === sortKey && sortDirection === "desc") {
            setSortKey(null)
            setSortDirection("asc")
        } else if (key !== sortKey) {
            setSortKey(key)
            setSortDirection("asc")
        } else {
            setSortKey(key)
            setSortDirection(prev => prev === "asc" ? "desc" : "asc")
        }
    }

    useEffect(() => {
        let newData = props.data;
        if (sortKey !== null) {
            newData = stableSort(data, getComparator(sortDirection, sortKey))
        }
        setData(newData)
    }, [sortKey, sortDirection, props.data])

    const renderEmptyRow = () => {
        const totalCol = header.length + 1 + (hasAction ? 1 : 0);
        return (
            <TableRow className={classes.row}>
                <TableCell align="center" colSpan={totalCol}>
                    {Strings.Common.EMPTY_DATA}
                </TableCell>
            </TableRow>
        )
    }

    return (       
        <>
            <TableContainer component={Paper} className="w-100">
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                header.map((item, index) => (
                                    <TableCell
                                        key={index}
                                        style={{ fontWeight: "bold" }}
                                        sortDirection={sortDirection}>
                                        <Tooltip title={item.value} arrow>
                                            <TableSortLabel
                                                active={item.key === sortKey}
                                                direction={sortDirection}
                                                IconComponent={item.key === sortKey ? ArrowDropUp : Sort}
                                                onClick={() => handleSort(item.key)}>
                                                {item.value}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                ))
                            }
                            {
                                hasAction && (
                                    <TableCell />
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {                            
                            data.length > 0 ? data.map((row, index) => {
                                if (renderRow) {
                                    return renderRow(row, index, page);
                                }
                                const item = dataKey && dataKey.length > 0 ? dataKey :  Object.keys(row);
                                return (
                                    <TableRow key={index} className={classes.row}>
                                        {
                                            item.map((key, i) => (
                                                <TableCell key={`${index}_${i}`}
                                                   >
                                                    {row[key]}
                                                </TableCell>
                                            ))
                                        }
                                        {
                                            hasAction && (
                                                <TableCell key={`${index}_action`}>
                                                    {
                                                        renderAction &&
                                                        renderAction(iKey && row.hasOwnProperty(iKey) ? Helpers.ensureString(row[iKey]) : "")
                                                    }
                                                </TableCell>
                                            )
                                        }
                                    </TableRow>
                                );
                            }) : renderEmptyRow()
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {              
                totalRecord > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={totalRecord}
                        rowsPerPage={Constants.ROW_PER_PAGE}
                        page={page - 1}
                        colSpan={5}
                        onChangePage={onChangePage}
                        labelDisplayedRows={({ from, to, count }) =>
                            Strings.formatString(Strings.Common.LABEL_DISPLAY_ROWS, `${from}`, `${to}`, `${count}`).toString()
                        }
                        ActionsComponent={ControlPagination}
                    />
                )
            }
        </>
    );
}

export default ControlTable;