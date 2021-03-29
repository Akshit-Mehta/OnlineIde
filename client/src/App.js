// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/python/python.js';
// import 'codemirror/keymap/sublime';
// import 'codemirror/theme/monokai.css';


class App extends React.Component{
  constructor(  ){
    super();
    this.state = {output: "Output", inputs: "Enter inputs", cmdLineInputs: "", language: "cpp", code: "Enter your code here"}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event)=>{
    // console.log(event.target)
    this.setState({[event.target.name]: event.target.value});
  }

  handleChangeDropdown = (event) => {
    this.setState({"language": event.target.value});
  }
  submit = () => {
    let config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };
    const path = "http://172.18.18.92:3002/compiler/" + this.state.language;
    axios.post(path,this.state, config)
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
      <h1 style={{"marginLeft": "500px"}}>Title of the site</h1>
      <CodeMirror
          value={this.state.code}
          style={{"height": "800px", "width": "200px", "marginRight": "2000px", "padding": "40px"}}
          options={{
            // mode: 'javascript',
            // mode: 'clike',
            // mode: 'text/x-csrc',
            lineWrapping: true, 
            styleActiveLine: {nonEmpty: true},
            styleActiveSelected: true,
            // mode: 'text/x-c++src',
            // mode: 'text/x-python',
            mode: 'text/x-java',
            version: '3',
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
        <select 
        defaultValue={this.state.language} 
        onChange={this.handleChangeDropdown} 
      >
       <option value="cpp" >C++</option>
        <option value="c" >C</option>
        <option value="java" >Java</option>
        <option value="python" >Python</option>
      </select>
      <button onClick={this.submit} > Submit Code</button>
    </div>
    )
  }
}



export default App;
