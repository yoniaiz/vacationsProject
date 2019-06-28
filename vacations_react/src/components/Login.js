import React from 'react';
import {Link} from "react-router-dom";
import Input from './input';

const Login = (props) => {
  return (
    <div className="container " >
    <div className="row ">
      <div className="offset-xl-4 offset-lg-3 offset-md-2  offset-0 offset-xs-0 col-xl-4 col-lg-5 col-md-7 col-10 d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Sign In</h3>
          </div>
          <div className="card-body">
            <form>
              <Input getText={props.getName} icon="fas fa-user" type='text' placeholder="Enter name"></Input>
              <Input getText={props.getPassword} icon="fas fa-key" type='password' placeholder="Password"></Input>
              <div className="row align-items-center remember">
                <input type="checkbox" onClick={props.check}/>Remember Me
              </div>
              <div className=" d-flex form-group mt-5">
              <button type="button" onClick={props.submit} className="btn btn-info btn-block mt-5" >Login</button>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<Link className='link' to="/registration/false" >Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;