import React, { useEffect } from "react";
import {
    Checkbox, Chip, Dialog, RadioGroup,
    DialogContent, DialogTitle, FormControl,
    FormControlLabel, FormGroup, Grid, IconButton, Radio, DialogActions, Button, TextField, InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowDropDown, Close } from "@material-ui/icons";

import "./ComponentStyles.css";
import { Helpers, ICodename } from "../commons/utils";
import { Strings } from "../constants";

interface IProps {
    title?: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    multiple: boolean;
    disabled?: boolean;
    data: ICodename[];
    submit: (value: any) => void;
    selected: string | number | string[] | number[];
    maxWidth?: "xs" | "sm" | "md" | "lg" | undefined;
}

export default function ControlSelectModal(props: IProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedOption, setSelectedOption] = React.useState<any>();

    const [valueSearch, setValueSearch] = React.useState("");
    const [isSearch, setIsSearch] = React.useState<boolean>(false);
    const [listDataSearch, setListDataSearch] = React.useState<ICodename[]>([]);

    const isCheckAll = props.multiple && ([...selectedOption || []]).length === listDataSearch.length;
    const isAnyOptionSelected = props.multiple
        ? ((Array.isArray(props.selected) ? props.selected : []).length !== 0)
        : !Helpers.isNullOrEmpty(props.selected);

    useEffect(() => {
        setListDataSearch(props.data);
        if (props.multiple && Array.isArray(props.selected)) {
            setSelectedOption([...props.selected || []]);
        } else {
            setSelectedOption(props.selected || undefined);
        }
    }, [props.multiple, props.data, props.selected, isSearch]);

    const handleChange = (event: any, checked: boolean) => {
        const value = event.target.value;
        if (props.multiple) {
            if (checked) {
                if (value === SELECT_ALL_VALUE) {
                    setSelectedOption(props.data.map(option => option.code));
                } else {
                    setSelectedOption([...selectedOption || [], value]);
                }
            } else {
                if (value === SELECT_ALL_VALUE) {
                    setSelectedOption([]);
                } else {
                    setSelectedOption(selectedOption.filter((el: any) => el.toString() !== value));
                }
            }
        } else {
            if (checked && selectedOption === value) {
                setSelectedOption(undefined);
            } else {
                setSelectedOption(value);
            }
        }
    }

    const handleChecked = (value: number | string) => {
        if (Array.isArray(selectedOption)) {
            const index = selectedOption.findIndex((code: any) => code.toString() == value.toString());
            return (index !== NOT_FOUND_INDEX);
        } else {
            if (selectedOption) {
                return value.toString() == selectedOption.toString();
            } else { return false }
        }
    }

    const handleSearchValue = (value: any) => {
        if (Helpers.isNullOrEmpty(value)) {
            setValueSearch("");
            setIsSearch(false);
            setListDataSearch(props.data);
        } else {
            const dataSearch = props.data.filter(item => item.name.toLocaleLowerCase().includes(`${value}`.toLocaleLowerCase()));
            setIsSearch(true);
            setValueSearch(value);
            setListDataSearch(dataSearch);
        }
    }

    const renderContent = () => {
        if (!isAnyOptionSelected && props.placeholder) {
            return <span style={{ color: "#c0c0c0" }}>{props.placeholder}</span>;
        }
        return props.multiple ? renderMultipleContent() : renderSingleContent();
    }

    const renderSingleContent = () => <span> {props.data.find(item => `${item.code}` === `${selectedOption}`)?.name} </span>;

    const renderMultipleContent = () => {
        if (isAnyOptionSelected) {
            if (isCheckAll) {
                return <span> {SELECT_ALL_LABEL} </span>;
            }
            return (Array.isArray(props.selected) ? props.selected : [props.selected]).map(renderChipOption)
        } else {
            return undefined;
        }
    }

    const renderChipOption = (code: any) => {
        return (
            <Chip
                key={code}
                size="small"
                className={classes.chip}
                disabled={props.disabled}
                label={props.data.find(item => `${item.code}` === `${code}`)?.name}
                onDelete={(e) => {
                    e.stopPropagation();
                    const newOption = selectedOption.filter((selectedCode: string) => code !== selectedCode);
                    props.submit(newOption);
                    setSelectedOption(newOption);
                }}
            />
        )
    }

    const renderDialog = () => {
        return (
            <Dialog
                open={open}
                fullWidth
                maxWidth={props.maxWidth || "xs"}
                classes={{ paper: classes.root }}
                onClose={() => {
                    setOpen(false);
                    setIsSearch(false);
                    setValueSearch("");
                    setSelectedOption(props.selected);
                }}
            >
                <DialogTitle>
                    <Grid>
                        <TextField
                            label=""
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder={Strings.Common.SEARCH}
                            value={valueSearch}
                            onChange={(e) => { handleSearchValue(e.target.value) }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton disabled={Helpers.isNullOrEmpty(valueSearch)}
                                            onClick={() => { handleSearchValue(undefined) }}>
                                            {!Helpers.isNullOrEmpty(valueSearch) && <Close />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid>
                        <FormControl component="fieldset" key={selectedOption + ""}>
                            {props.multiple ? renderMultipleDialogContent() : renderSingleDialogContent()}
                        </FormControl>
                        {
                            (listDataSearch.length === 0) &&
                            <p style={{ color: "#c0c0c0", fontStyle: "italic", textAlign: "center" }}>{Strings.Common.NO_DATA_SEARCH}</p>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions className="p-3">
                    <Button
                        variant="contained"
                        className={"w-50 "}
                        onClick={() => {
                            setOpen(false);
                            setIsSearch(false);
                            setValueSearch("");
                            setSelectedOption(props.selected);
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        className="w-50"
                        color="primary"
                        onClick={() => {
                            setOpen(false);
                            setIsSearch(false);
                            setValueSearch("");
                            props.submit(selectedOption);
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const renderMultipleDialogContent = () => {
        return (
            <FormGroup className="d-flex">
                {
                    !isSearch && props.multiple &&
                    <FormControlLabel
                        label={SELECT_ALL_LABEL}
                        value={SELECT_ALL_VALUE}
                        onChange={handleChange}
                        checked={isCheckAll}
                        control={<Checkbox name={SELECT_ALL_LABEL} color="primary" indeterminate={!isCheckAll && isAnyOptionSelected} />}
                    />
                }
                {
                    listDataSearch.map((el: ICodename) => {
                        return (
                            <FormControlLabel
                                key={el.code}
                                label={el.name}
                                value={el.code}
                                onChange={handleChange}
                                checked={handleChecked(el.code)}
                                control={<Checkbox name={el.name} color="primary" />}
                            />
                        )
                    })
                }
            </FormGroup>
        );
    }

    const renderSingleDialogContent = () => {
        return <RadioGroup className="d-flex">
            {
                listDataSearch.map((el: ICodename) => {
                    return (
                        <FormControlLabel
                            key={el.code}
                            label={el.name}
                            value={el.code}
                            onChange={handleChange}
                            checked={handleChecked(el.code)}
                            control={<Radio name={el.name} color="primary" />}
                        />
                    )
                })
            }
        </RadioGroup>
    }

    const renderAction = () => {
        return <div>
            {/* Clear selected options */}
            {isAnyOptionSelected && (!props.disabled) &&
                <IconButton onClick={(e: any) => {
                    e.stopPropagation();
                    setSelectedOption(props.multiple ? [] : undefined)
                    props.submit(props.multiple ? [] : undefined);
                }}>
                    <Close />
                </IconButton>}
            {/* Open dialog placeholder */}
            <IconButton>
                <ArrowDropDown color={props.disabled ? "disabled" : "action"} />
            </IconButton>
        </div>
    }

    return (
        <>
            <div
                className={`${classes.selectModalContainer} ${props.disabled ? classes.selectModalContainerDisabled : ""}`}
                onClick={() => setOpen(true)}>
                <div className={classes.content}>
                    {renderContent()}
                </div>
                {renderAction()}
            </div>
            {!Helpers.isNullOrEmpty(props.errorMessage) &&
                <div className="text-danger mt-1">{props.errorMessage}</div>
            }
            {renderDialog()}
        </>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            padding: 0,
        },
        '& .MuiInputLabel-outlined': {
            transform: 'translate(14px,13px) scale(1)'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)'
        },

        minHeight: '70vh',
        maxHeight: '70vh',
    },
    chip: {
        marginRight: '0.5rem',
        marginTop: '0.2rem',
        padding: '0.3rem',
        height: '35px',
        color: 'black',
        fontSize: '13px'
    },
    content: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        width: "86%"
    },
    selectModalContainer: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        border: "1px solid #c0c0c0",
        borderRadius: ".25rem",
        padding: ".25rem .5rem",
        minHeight: "3rem",
        width: "100%",
        cursor: "text",
        justifyContent: "space-between",
        transition: ".1s border-color",
        '&:hover': {
            borderColor: "#000000de",
        }
    },
    selectModalContainerDisabled: {
        pointerEvents: "none",
        color: "#c0c0c0"
    },
    componentGap2: {
        display: "flex",
        gap: "0.5rem",
    }

}));

/* Constant */
const NOT_FOUND_INDEX = -1;
const SELECT_ALL_VALUE = "all";
const SELECT_ALL_LABEL = "Chọn tất cả";