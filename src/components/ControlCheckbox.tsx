import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { Radio, Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Helpers } from '../commons/utils';


interface IProps {
	children?: React.ReactNode;
	onChangeValue?: (event: any) => void;
	value?: boolean;
	label?: string;
	containerClassName?: string;
	disabled?: boolean;
	isRadio?: boolean;
}
export default function ControlCheckbox(props: IProps) {
	const { onChangeValue, containerClassName } = props;
	const onChange = (event: any) => {
		if (props.onChangeValue && Helpers.isFunction(props.onChangeValue)) {
			props.onChangeValue(event.target.checked);
		}
	}
	return (
		<FormGroup className={`${containerClassName}`}>
			<FormControlLabel
				control={
					(props.isRadio)
						? <Radio color="primary" onChange={onChange} checked={props.value} />
						: <Checkbox color="primary" onChange={onChange} checked={props.value} />
				}
				label={props.label}
				disabled={props.disabled}
			/>
		</FormGroup>
	);
}
