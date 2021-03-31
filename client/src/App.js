import React from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import CodeSection from './CodeSection';


class App extends React.Component{
  constructor( ){
    super();
    this.state = {
      output: "Output", 
      inputs: "Enter inputs",
       cmdLineInputs: "", 
       language: "cpp", 
       code: "Enter your code here",
       theme:"monokai",
       options:{
         "tabSize": 2
       }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeTabSize = this.handleChangeTabSize.bind(this);
  }

  handleChangeTabSize = (event) => {
      let options = {
        "tabSize": event.target.value
      }
      this.setState({"options": options})
  }
  handleChange = (event)=>{
    // console.log(event.target)
    this.setState({[event.target.name]: event.target.value});
  }
  
  //Separate HandleChange for code because of Codemirror onChange method.
  //Either I put Codemirror component in this component( and get rid of this method)
  //Or
  //Create a new child component which has Codemirror component (Works with this method)
  handleChangeCode = (value) => {
    // console.log(value)
    this.setState({"code": value});
  }

  submit = () => {
    let config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };
    const path = "http://localhost:3002/compiler/" + this.state.language;
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
    let langToMode = {

    }
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
      <Navbar 
          language = {this.state.language}
          theme = {this.state.theme}
          onChange = {this.handleChange}
      />
      <CodeSection 
        code = {this.state.code}
        onChange = {this.handleChangeCode}
        language = {this.state.language}
        theme = {this.state.theme}
        options = {this.state.options}
      />
      {/* Only for reference <input type="number" value = {this.state.options.tabSize} onChange = {this.handleChangeTabSize} /> */}
      <textarea name="inputs" rows ="5" cols="40" value={this.state.inputs} onChange={this.handleChange}>
                
      </textarea>
      <textarea name="output" rows="20" cols="40" value={this.state.output} onChange={this.handleChange}>
          
      </textarea>
      <button onClick={this.submit} > Submit Code</button>
    </div>
    )
  }
}



export default App;
