import React from "react";
import "./ComponentStyles.css";
import {
    LastPage,
    KeyboardArrowRight,
    KeyboardArrowLeft,
    FirstPage
} from "@material-ui/icons";
import {
    IconButton
} from "@material-ui/core";
import { useTheme, makeStyles, createStyles, Theme } from "@material-ui/core/styles";
interface IProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export default function ControlPagination(props: IProps) {
    const classes = useStyle();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
    const range = (page: number) => {
        const from = 0;
        const to = Math.ceil(count / rowsPerPage);
        let range = [];
        if (to < 8) {
            for (let i = from; i < to; i++) {
                range.push(i + 1);
            }
            return range;
        }
        const currentPage = page + 1;
        if (currentPage < 5) {
            range = [1, 2, 3, 4, 5, "...", to];
            return range;
        }
        let middle = currentPage < to - 3
            ? [currentPage - 1, currentPage, currentPage + 1, "..."]
            : [to - 4, to - 3, to - 2, to - 1];
        range = [
            ...[1, "..."],
            ...middle,
            ...[to]
        ];
        return range;
    }

    const [pagePanel, setPagePanel] = React.useState(range(page + 1));

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPagePanel(range(0));
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPagePanel(range(page - 1));
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPagePanel(range(page + 1));
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPagePanel(range(Math.max(0, Math.ceil(count / rowsPerPage) - 1)));
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    const handlePageClick = (event: React.MouseEvent<HTMLButtonElement>, pageIndex: number) => {
        setPagePanel(range(pageIndex));
        onChangePage(event, pageIndex);
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page">
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            {
                pagePanel.map((item, index) => {
                    const style = item === (page + 1) ? { background: "#007bff", color: "#fff" } : {}
                    if (item === "...") {
                        return (
                            <IconButton disabled key={`disabled_${index}`}>
                                {item}
                            </IconButton>
                        );
                    }
                    return (
                        <IconButton
                            key={index}
                            className={classes.item}
                            style={style}
                            onClick={(e) => handlePageClick(e, +item - 1)}>
                            {item}
                        </IconButton>
                    );
                })
            }
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page">
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
            </IconButton>
        </div>
    );
}

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
        item: {
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.23)",
            fontSize: "1rem",
            color: "#333333",
            width: 24,
            height: 24
        }
    }),
);