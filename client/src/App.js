// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/theme/monokai.css'
// import 'codemirror/keymap/sublime';
// import 'codemirror/theme/monokai.css';


class App extends React.Component{
  constructor(){
    super();
    this.state = {output: "Output", inputs: "Enter inputs", cmdLineInputs: "", language: "cpp", code: "Enter your code here"}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event)=>{
    // console.log(event.target)
    this.setState({[event.target.name]: event.target.value});
  }

  submit = () => {
    let config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };
    axios.post(`http://172.18.18.92:3002/compiler/cpp`,this.state, config)
    .then(res => {
      console.log(res['data']);
      let data = res['data'];
      console.log(data);
      this.setState({"output": data['output']});
    })
    .catch(err => this.setState({"output": "Some error occured client"}));

  }

  render(){
  //   var options = {
  //     lineNumbers: true,
  //     mode: 'c',
  //     value: "Enter code here"
  // };
    return(
    <div>
      {/* <CodeMirror name="code" value={this.state.code} onChange={this.updateCode} options={options} /> */}
      {/* <textarea name="code" rows="40" cols="50" value={this.state.code} onChange={this.handleChange} >
        
      </textarea> */}
      {/* //https://codemirror.net/mode/ */}
      {/* https://stackoverflow.com/questions/53469681/how-to-configure-codemirror-for-c-like-language */}
      {/* https://uiwjs.github.io/react-codemirror/ */}
      {/* https://stackoverflow.com/questions/57024486/react-get-codemirror-value-onclick */}
      {/* https://www.microsoft.com/en-us/download/details.aspx?id=52367 */}
      {/* https://www.kaggle.com/c/indoor-location-navigation/discussion/215223 */}
      <CodeMirror
          value={this.state.code}
          style={{"height": "800px", "width": "20px"}}
          options={{
            // mode: 'javascript',
            // mode: 'clike',
            // mode: 'text/x-csrc',
            lineWrapping: true, 
            styleActiveLine: {nonEmpty: true},
            styleActiveSelected: true,
            mode: 'text/x-c++src',
            matchBrackets: true,
            theme: "monokai",
            lineNumbers: true,
          }}
          onChange={(editor, data, value) => {
            // console.log(editor);
            this.setState({
              code: editor
            })           
          }}
        />
      <textarea name="inputs" rows ="20" cols="40" value={this.state.inputs} onChange={this.handleChange}>
        
        </textarea>
        <textarea name="output" rows="20" cols="40" value={this.state.output} onChange={this.handleChange}>
          
        </textarea>
      <button onClick={this.submit}> Submit Code</button>
    </div>
    )
  }
}



export default App;
