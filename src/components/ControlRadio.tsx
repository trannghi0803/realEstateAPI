import { FormControl, FormLabel, RadioGroup } from '@material-ui/core';
import * as React from 'react';
import { Helpers } from '../commons/utils';

interface IProps {
    value?: number;
    onChangeValue?: (event: any) => void;
    children?: React.ReactNode;
    label?: string;
}

const ControlRadio: React.FC<IProps> = (props: IProps) => {
  const {value, onChangeValue} = props;

  const handleChange = (event: any) => {
    if (onChangeValue && Helpers.isFunction(onChangeValue)) {
        onChangeValue(event.target.value);
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{props.label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {props.children}
      </RadioGroup>
    </FormControl>
  );
}

export default ControlRadio;
