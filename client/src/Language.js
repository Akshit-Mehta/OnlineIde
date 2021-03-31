import React from 'react';

class Language extends React.Component{
    render(){
        return(
            <select 
                defaultValue={this.props.language} 
                // onChange={this.handleChangeDropdown} 
                onChange = {this.props.onChange}
                name="language"
            >
                <option value="cpp" >C++</option>
                <option value="c" >C</option>
                <option value="java" >Java</option>
                <option value="python" >Python</option>
            </select>
        )
    }
}

export default Language;