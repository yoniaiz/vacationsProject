import React from 'react';
import '../styles/alert.css'
const Alert = (props) => {
    return (
        <div className="alert alert-secondary" role="alert">
            {props.str}
        </div>
        ) 
}
 
export default Alert;