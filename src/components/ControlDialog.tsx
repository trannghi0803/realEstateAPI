import React from "react";
import { Close } from "@material-ui/icons";
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogTitle as MuiDialogTitle,
    DialogContent,
    Typography,
    IconButton,
    DialogActions,
    Button
} from "@material-ui/core";
import { Strings } from "../constants";


interface IProps {
    title: string;
    children: any;
    open: boolean;
    disable?: boolean;
    onClose: () => void;
    hasAction?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | undefined; //props to set width
    textOk?: string
    textCancel?: string
}

interface DialogTitleProps extends WithStyles<typeof styles> {
    children: React.ReactNode;
    onClose: () => void;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    })

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <Close />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: "12px !important",
        "& .MuiPaper-rounded": {
            borderRadius: '0 !important'
        }
    },
    cancelButton: {
        backgroundColor: "#FFB266",
        color: "#FFF"
    },
    content: {
        overflow: "auto",
    },
    cursor: {
        '&:hover': {
            cursor: "no-drop",
        }
    },
}))

const ControlDialog: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    return (
        <Dialog fullWidth maxWidth={props.maxWidth}
            classes={{
                paper: classes.root
            }}
            onClose={props.onClose}
            open={props.open}>
            <DialogTitle onClose={props.onClose}>
                {props.title}
            </DialogTitle>
            <DialogContent className={`px-3 ${classes.content} ${(props.disable ? classes.cursor : "")}`}>
                <div className={`${(props.disable ? "pe-none" : "")}`}>
                    {props.children}
                </div>
            </DialogContent>
            {
                props.hasAction && (
                    <DialogActions className="p-3">
                        <Button onClick={() => { props.onCancel && props.onCancel() }}
                            variant="contained"
                            className={"w-50 "}>
                            {/* + classes.cancelButton */}
                            {props.textCancel ? props.textCancel : Strings.Common.UNCONFIRM}
                        </Button>
                        <Button onClick={() => { props.onOk && props.onOk() }}
                            variant="contained"
                            className="w-50"
                            color="primary">
                            {props.textOk ? props.textOk : Strings.Common.COMFIRM}

                        </Button>
                    </DialogActions>
                )
            }
        </Dialog >
    );
}

export default ControlDialog;