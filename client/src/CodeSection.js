import React from 'react'
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/wrap/hardwrap';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/anyword-hint'
// import 'codemirror/theme/3024-day.css'
// import 'codemirror/theme/3024-night.css'
// import 'codemirror/theme/abcdef.css'
// import 'codemirror/theme/ambiance.css'
// import 'codemirror/theme/ambiance-mobile.css'
// import 'codemirror/theme/ayu-dark.css'
// import 'codemirror/theme/ayu-mirage.css'
// import 'codemirror/theme/base16-dark.css'
// import 'codemirror/theme/base16-light.css'
// import 'codemirror/theme/bespin.css'
// import 'codemirror/theme/blackboard.css'
// import 'codemirror/theme/cobalt.css'
// import 'codemirror/theme/colorforth.css'
// import 'codemirror/theme/darcula.css'
// import 'codemirror/theme/dracula.css'
// import 'codemirror/theme/duotone-dark.css'
// import 'codemirror/theme/duotone-light.css'
// import 'codemirror/theme/eclipse.css'
// import 'codemirror/theme/elegant.css'
// import 'codemirror/theme/erlang-dark.css'
// import 'codemirror/theme/gruvbox-dark.css'
// import 'codemirror/theme/hopscotch.css'
// import 'codemirror/theme/icecoder.css'
// import 'codemirror/theme/idea.css'
// import 'codemirror/theme/isotope.css'
// import 'codemirror/theme/lesser-dark.css'
// import 'codemirror/theme/liquibyte.css'
// import 'codemirror/theme/lucario.css'
import 'codemirror/theme/material.css'
// import 'codemirror/theme/material-darker.css'
// import 'codemirror/theme/material-ocean.css'
// import 'codemirror/theme/material-palenight.css'
// import 'codemirror/theme/mbo.css'
// import 'codemirror/theme/mdn-like.css'
// import 'codemirror/theme/midnight.css'
import 'codemirror/theme/monokai.css'
// import 'codemirror/theme/moxer.css'
// import 'codemirror/theme/neat.css'
// import 'codemirror/theme/neo.css'
// import 'codemirror/theme/night.css'
// import 'codemirror/theme/nord.css'
// import 'codemirror/theme/oceanic-next.css'
// import 'codemirror/theme/panda-syntax.css'
// import 'codemirror/theme/paraiso-dark.css'
// import 'codemirror/theme/paraiso-light.css'
// import 'codemirror/theme/pastel-on-dark.css'
// import 'codemirror/theme/railscasts.css'
// import 'codemirror/theme/rubyblue.css'
// import 'codemirror/theme/seti.css'
// import 'codemirror/theme/shadowfox.css'
// import 'codemirror/theme/solarized.css'
// import 'codemirror/theme/ssms.css'
// import 'codemirror/theme/the-matrix.css'
// import 'codemirror/theme/tomorrow-night-bright.css'
// import 'codemirror/theme/tomorrow-night-eighties.css'
// import 'codemirror/theme/ttcn.css'
// import 'codemirror/theme/twilight.css'
// import 'codemirror/theme/vibrant-ink.css'
// import 'codemirror/theme/xq-dark.css'
// import 'codemirror/theme/xq-light.css'
// import 'codemirror/theme/yeti.css'
// import 'codemirror/theme/yonce.css'
// import 'codemirror/theme/zenburn.css'


class CodeSection extends React.Component{
    constructor(props){
        super(props);
        this.codemirrorRef = React.createRef();
    }
    render(){
        let langToMode = {
            "c": 'text/x-csrc',
            "cpp": 'text/x-c++src',
            "java": 'text/x-java',
            "python": 'text/x-python'
        }

        let options = {...this.props.options}
        options['mode'] = langToMode[this.props.language]
        options['theme'] = this.props.theme;
        console.log(options)
        console.log(this.codemirrorRef.current);
        // this.codemirrorRef.current.codemirror.doc.style.fontSize = this.props.options.fontSize;
        // this.codemirrorRef.current.codeMirror.doc.cm.options()
        return(
            <CodeMirror
                    value={this.props.code}
                    // style={{"height": "800px", "width": "200px", "marginRight": "2000px", "padding": "40px","fontSize": options['fontSize']}}
                    // options={{
                    //     lineWrapping: true, 
                    //     styleActiveLine: {nonEmpty: true},
                    //     styleActiveSelected: true,
                    //     tabSize: this.props.options.tabSize,
                    //     mode: langToMode[this.props.language],
                    //     matchTags: true,
                    //     autoCloseBrackets: true,
                    //     matchBrackets: true,
                    //     theme: this.props.theme,
                    //     lineNumbers: true,
                    // }}
                    className={"font"+this.props.options.fontSize}
                    ref={this.codemirrorRef}
                    options = {options}
                    onChange={(editor, data, value) => {
                        // console.log(editor);
                        // this.setState({
                        //     code: editor
                        // })  
                        this.props.onChange(editor);         
                    }}
            />
        )
    }
}

export default CodeSection;