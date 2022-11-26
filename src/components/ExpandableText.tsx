import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./ComponentStyles.css";
const useStyles = makeStyles(() =>
    createStyles({
        expandable:{
            position: 'relative',
            cursor: 'pointer'
        },
        expandableContent:{
            height: '100px',
            overflow: 'hidden'
        }
    })
);
interface IProps {
    text?: string;
}
export default function ExpandableContent(props: IProps) {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div className={` ${ open ? 'expandable-open' : ''} expandable expandable-indicator-white expandable-trigger`}>
            <div className="expandable-content">
                <p>
                    {props.text}
                </p>
                <div className="expandable-indicator"> 
                    <i onClick={()=>setOpen(!open)}>

                    </i>
                </div>
            </div>
        </div>
    );
}
