import React from 'react';

class Theme extends React.Component{
    render(){
        return(
            <select name="theme" onChange = {this.props.onChange}>
                <option value="tomorrow">Light</option>
                <option value="monokai">Dark</option>
            </select>
        )
    }
}

export default Theme