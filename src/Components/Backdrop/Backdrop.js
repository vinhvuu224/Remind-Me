import React from 'react';
import './Backdrop.css';

// const backdrop = props => (
//     <div onClick={this.props.toggle} className="backdrop"/>
// );

class backdrop extends React.Component{
    render(){
        return(
            <div onClick={this.props.toggle} className="backdrop"/>
        )
    }
}

export default backdrop