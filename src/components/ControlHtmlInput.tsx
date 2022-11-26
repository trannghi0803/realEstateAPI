import React, { useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import 'jodit';

interface IProps {
    onBlur: (content: string) => void;
    content: string;
    disabled?: boolean;
}

export default function ControlHtmlInput(props: IProps) {
    const [content, setContent] = useState(props.content || "");
    const editor = useRef(null)

    const config: any = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        askBeforePasteFromWord: false,
        askBeforePasteHTML: false,
        defaultActionOnPaste: "insert_as_html",
        cleanHTML: {
            fillEmptyParagraph: false
        },
        controls: {
            font: {
                list: {
                    'Qahiri, sans-serif': 'Qahiri',
                    'SVN-Gotham Book': 'SVN-Gotham Book'
                }
            }
        }
    }

    const onBlur = (newContent: string) => {
        if (props.onBlur) {
            // if(newContent.replace(/<[^>]+>/g, '')){
            //     props.onBlur(newContent.replace(/<[^>]+>/g, ''));
            // }else{
            // }
            props.onBlur(newContent);

        }
    }
    const renderContent = React.useMemo(() => (
        <JoditEditor
            value={content}
            config={config}
            onBlur={newContent => {
                setContent(newContent);
                onBlur(newContent);
            }}
            ref={editor}
        />
    ), []);

    return (
        <div id={`editor-${new Date().getTime()}`} className={`${props.disabled ? 'pointer-events-none opacity-1' : ''} mb-3`}>
            {renderContent}
        </div>
    );
}