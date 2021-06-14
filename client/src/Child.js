import React from 'react';

class Child extends React.Component{
    render(){
        let inputs = <input type="checkbox" name={this.props.names} onChange={this.props.onChangeOptions} checked={this.props.data}/>;
        if(this.props.names === "tabSize" || this.props.names === "fontSize") {
            inputs = <input type="number" min={1} max={32} name={this.props.names} onChange={this.props.onChangeOptions} value={this.props.options[this.props.names]}/>
        }
        return(
            <div className="otherOptions">
                <label htmlFor={this.props.names}>{this.props.names}</label>
                {inputs}
            </div>
        )
    }
}

export default Child;