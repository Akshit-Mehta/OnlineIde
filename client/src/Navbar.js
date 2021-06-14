import React from 'react'
import Language from './Language';
import Theme from './Theme';
import Settings from './Settings';

class Navbar extends React.Component{
    render(){
        return(
            <div className="flex-container1">
                <Language 
                    language = {this.props.language}
                    onChange = {this.props.onChange}
                />
                <Theme
                    onChange = {this.props.onChange}
                />
                <Settings 
                    options = {this.props.options}
                    onChangeOptions = {this.props.onChangeOptions}
                />
            </div>
        )
    }
}

export default Navbar