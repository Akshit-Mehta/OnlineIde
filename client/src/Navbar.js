import React from 'react'
import Language from './Language';
import Theme from './Theme';

class Navbar extends React.Component{
    render(){
        return(
            <div>
                <Language 
                    language = {this.props.language}
                    onChange = {this.props.onChange}
                />
                <Theme
                    onChange = {this.props.onChange}
                />
            </div>
        )
    }
}

export default Navbar