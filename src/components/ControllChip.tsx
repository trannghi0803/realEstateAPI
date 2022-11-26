import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { Chip } from '@material-ui/core';

interface IProps {
    label?: string;
    onDelete?: (value: any) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: '0.5rem',
        marginTop: '0.5rem',
        backgroundColor: '#dcede2',
        borderRadius: '5px',
        minWidth: '120px',
        height: '30px',
        color: 'black',
        fontSize: '13px'
    },
    cancelButton: {
        cursor: 'pointer',
        marginTop: 1,
        marginBottom: 1,
        color: 'red',
        float: 'right',
    }
}))

const ControllChip: React.FC<IProps> = (props: IProps) => {
    const { label, onDelete } = props;
    const classes = useStyles();
    return (
        <Chip
            size="small"
            className={classes.root}
            label={label}
            onDelete={onDelete}
            deleteIcon={<CancelRoundedIcon className={classes.cancelButton} />}
        />
    );
}

export default ControllChip;