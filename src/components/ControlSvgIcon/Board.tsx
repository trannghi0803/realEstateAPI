import React from "react";

interface IProps {
    isActive?: boolean;
}

const Board: React.FC<IProps> = (props: IProps) => {
    const { isActive } = props;
    return (
        <svg className="MuiSvgIcon-root"
            focusable="false" aria-hidden="true"
            viewBox="0 0 24 25">
            <g id="view_agenda" transform="translate(-338 -550)">
                <rect id="Path" width="24" height="25" transform="translate(338 550)" fill="rgba(0,0,0,0)" />
                <path id="Icon"
                    d="M19.483,20.625H1.082A1.117,1.117,0,0,1,0,19.479V12.6a1.117,1.117,0,0,1,1.082-1.146h18.4A1.117,1.117,0,0,1,20.566,12.6v6.875A1.117,1.117,0,0,1,19.483,20.625ZM2.165,13.751v4.583H18.4V13.751ZM19.483,9.167H1.082A1.117,1.117,0,0,1,0,8.021V1.146A1.117,1.117,0,0,1,1.082,0h18.4a1.117,1.117,0,0,1,1.082,1.146V8.021A1.117,1.117,0,0,1,19.483,9.167ZM2.165,2.292V6.875H18.4V2.292Z"
                    transform="translate(339.327 552.062)"
                    fill={isActive ? "#176e98" : "#979a9b"} />
            </g>
        </svg>
    )
}

export default Board;