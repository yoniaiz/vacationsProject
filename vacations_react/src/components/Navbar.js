import React  from 'react';
import Clock from './clock'
import {Link} from "react-router-dom";
import '../styles/navbar.scss'
const navbar = (props) => {
    var admin = {display:(props.admin)?'block':'none'}
    return (
        <header className="header p-0">
            <h1 className="logo"><a href="#"><Clock></Clock></a></h1>
            <h1 className="logo" style={admin}><a href="#"><Link className='p-0 m-0' to="/chart">Chart </Link></a></h1>
        <ul className="main-nav">
               <li style={admin}>
                    <a href="#" className='name'> Admin </a> 
                </li>
                <li>
                    <a href="#" className='name'> Hello {props.name} </a> 
                </li>
                <li>
                <a href="#" className='name' onClick={props.logout}><Link className='p-0 m-0' to="/registration/true">disconect</Link> </a> 
                </li>
        </ul>
        </header> 
    )
}
export default navbar;