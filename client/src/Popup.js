import React from 'react';
import './Popup.css';
import Child from './Child';
class Popup extends React.Component{
    render(){
        return(
            
            <div className='popup'>
                <div className='popup_inner'>
                    {Object.keys(this.props.options).map(key => {
                        return <Child key={key} names={key} data={this.props.options[key]} options = {this.props.options} onChangeOptions = {this.props.onChangeOptions} />
                    })}
                    <button onClick={this.props.closePopup}>close me</button>
                    {/* <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>close me</button> */}
                </div>
            </div>
        )
    }
}

export default Popup;