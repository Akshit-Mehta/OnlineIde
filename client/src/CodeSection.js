import React from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow"
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import 'ace-builds/src-min-noconflict/ext-searchbox';



function CodeSection(props) {
    let langToMode = {
        "c": "c_cpp",
        "c++": "c_cpp",
        "python": "python",
        "java": "java"
    }
    return (
        <div className="AceEditor">
            <AceEditor
                mode={langToMode[props.language]}
                theme={props.theme}
                fontSize={props.options.fontSize}
                height="inherit"
                width="inherit"
                onChange={props.onChange}
                value={props.code}
                name="code"
                className="AceEditor"
                showPrintMargin={false}
                setOptions={props.options}
            />
        </div>
    )
    
}

export default CodeSection;