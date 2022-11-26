import React from "react";

const Sort: React.FC = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            className="MuiSvgIcon-root MuiTableSortLabel-icon"
            focusable="false" aria-hidden="true"
            style={{
                fontSize: "1.5rem"
            }}>
            <path x="12" y="12" d="M7 10l5 5 5-5z" width="10" height="5" transform="rotate(180, 12, 12)" />
            <path x="12" y="12" d="M7 10l5 5 5-5z" width="10" height="5" transform="translate(0 6)" />
        </svg>
    )
}

export default Sort;