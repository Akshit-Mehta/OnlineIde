import React from 'react';
import Popup from './Popup';

class Settings extends React.Component{
    constructor(props){
        super()
        this.state = {showModal: false}
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
        this.setState({showModal: !this.state.showModal});
    }

    render(){
        return(
            <div>
        <button onClick={this.handleChange}>settings</button>
        {this.state.showModal ? 
        <Popup 
            text='click me' 
            closePopup = {this.handleChange }
            options = {this.props.options}
            onChangeOptions = {this.props.onChangeOptions}
        />:null
        }
        </div>
        )
    }
}

export default Settings;