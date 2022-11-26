import React from "react";

interface IProps {
    isActive?: boolean;
}

const List: React.FC<IProps> = (props: IProps) => {
    const { isActive } = props;
    return (
        <svg viewBox="0 0 36 36"
            style={{ width: "1.5rem", height: "1.5rem" }}
            className="MuiSvgIcon-root"
            focusable="false" aria-hidden="true">
            <g id="view_list" transform="translate(-134 -550)">
                <rect id="Path" width="36" height="36" transform="translate(134 550)" fill="rgba(0,0,0,0)" opacity="0.871" />
                <path id="Icon"
                    d="M25.5,21H0V0H25.5V21ZM9,15v3H22.5V15H9ZM3,15v3H6V15ZM9,9v3H22.5V9H9ZM3,9v3H6V9ZM9,3V6H22.5V3H9ZM3,3V6H6V3Z"
                    transform="translate(138.5 557.5)"
                    fill={isActive ? "#007F2E" : "#979a9b"} />
            </g>
        </svg>
    )
}

export default List;