import React, { useState } from "react";
import { FormLabel, Button, FormControl } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Strings } from "../constants";

interface IProps {
    title: string;
    containerClassName?: string;
    addNewTitle?: string;
    renderItem: (item: any, index: number) => JSX.Element;
    data: any[];
    onChange: (list: any[]) => void;
}

const ControlInputGroup: React.FC<IProps> = (props: IProps) => {
    const [isFocused] = useState(false);
    const { containerClassName, title, addNewTitle = Strings.Common.ADD_NEW, data, renderItem } = props;

    const handleAddNew = () => {
        const newData = [...data, {}];
        props.onChange && props.onChange(newData);
    }
    return (
        <FormControl component="fieldset"
            className={containerClassName ? `${containerClassName} default-fieldset` : " default-fieldset"}>
            <FormLabel component="legend"
                className="default-legend"
                focused={isFocused}>
                {title}
            </FormLabel>
            {
                data.map((item, index) => renderItem(item, index))
            }
            <Button variant="outlined"
                className="mt-3"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddNew}>
                {addNewTitle}
            </Button>
        </FormControl>
    )
}

export default ControlInputGroup;