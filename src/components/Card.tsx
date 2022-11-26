import React from "react";
import { ControlText } from ".";
interface IProps {
    headerTitle?: string;
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<IProps> = (props: IProps) => {
    const { headerTitle, children } = props;
    return (
        <div className={props.className}>
            {headerTitle && <ControlText type="header" className="mb-3">{headerTitle}</ControlText>}
            {children}
        </div>
    );
}

export default Card;
