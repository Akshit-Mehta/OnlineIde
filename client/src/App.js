import React from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import CodeSection from './CodeSection';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  

class App extends React.Component{
  constructor( ){
    super();
    this.state = {
      output: "", 
      inputs: "",
      submitButtonText: "Submit",
      submitButtonDisabled: false,
      cmdLineInputs: "", 
      language: "python", 
      code: "print(\"Sunil\")",
      theme:"monokai",
      options:{
        "tabSize": 2,
        "lineWrapping": true, 
        "styleActiveLine": {nonEmpty: true},
        "styleActiveSelected": true,
        "matchTags": true,
        "autoCloseBrackets": true,
        "matchBrackets": true,
        "lineNumbers": true,
        "fontSize": 20
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeTabSize = this.handleChangeTabSize.bind(this);
    this.handleChangeOptions = this.handleChangeOptions.bind(this);
  }

  handleChangeTabSize = (event) => {
      let options = {
        "tabSize": event.target.value
      }
      this.setState({"options": options})
  }

  handleChangeOptions = (event) => {
    let optionCopy = {...this.state.options};
    if(event.target.type === "number") optionCopy[event.target.name] = event.target.value;
    else optionCopy[event.target.name] = event.target.checked;
    this.setState({"options": optionCopy});
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
    // const path = "http://localhost:3002/compiler/" + this.state.language;
    const path = "https://online-ide-main.herokuapp.com/compiler/" + this.state.language;
    // Only send the required things.
    const obj = {
      language: this.state.language,
      code: this.state.code,
      cmdLineInputs: this.state.cmdLineInputs,
      inputs: this.state.inputs
    }
    console.log(this.state.submitButtonText)
    this.setState({submitButtonText:"Running",submitButtonDisabled:true})
    console.log(this.state.submitButtonText)
    axios.post(path,obj, config)
    .then(res => {

      console.log(res['data']);
      let data = res['data'];
      console.log(data);
      this.setState({"output": data['output'],submitButtonText:"Submit",submitButtonDisabled:false});
    })
    .catch(err => this.setState({"output": "Some error occured client",submitButtonText:"Submit",submitButtonDisabled:false}));

  }

  render(){
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
      <h1>Title of the site</h1>
      <Navbar 
          language = {this.state.language}
          theme = {this.state.theme}
          onChange = {this.handleChange}
          options = {this.state.options}
          onChangeOptions = {this.handleChangeOptions}
      />
      <div className="flex-container1" >
      <CodeSection 
        code = {this.state.code}
        onChange = {this.handleChangeCode}
        language = {this.state.language}
        theme = {this.state.theme}
        options = {this.state.options}
        className="item1"
      />
      {/* Only for reference <input type="number" value = {this.state.options.tabSize} onChange = {this.handleChangeTabSize} /> */}
      <div className="flex-container2 item2">
      <textarea name="inputs" rows ="5" cols="40" value={this.state.inputs} placeholder={"Enter inputs"} onChange={this.handleChange} className="item21">
                
      </textarea>
      <textarea name="cmdLineInputs" rows="5" cols="40" value={this.state.cmdLineInputs} placeholder={"Enter cmdLine inputs"}onChange={this.handleChange} className="item22">

      </textarea>
      <textarea name="output" rows="20" cols="40" value={this.state.output} placeholder={"Outputs"} onChange={this.handleChange} className="item23">
          
      </textarea>
      </div>
      </div>
      <button  onClick={ () => { this.submit() }  } disabled={this.state.submitButtonDisabled}> {this.state.submitButtonText}</button>
      {/* <div className="row">
        <div className="col-md-6">Div1</div>
          <div className="col-md-3">Div2</div>
          <div className="col-md-3">Div3</div>
          
      </div>
      <div className="row">
            <div className="col-md-6 offset-md-6">Div 4</div>
          </div> */}
    </div>
    )
  }
}



export default App;
