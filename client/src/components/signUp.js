import React from 'react';
import {Link} from "react-router-dom";
import {FormInputs} from '../Jsons/ModelInputs'

import Input from './input'

const SignUp = (props) => {
  var func = [props.getName,props.getLastName,props.getMail,props.getPassword]
  var forms = FormInputs.map((form,index) => {
    return <Input getText={func[index]} icon={form.icon} type={form.type} placeholder={form.placeholder}></Input>
  })
  return (
    <div className="container">
      <div className="row">
          <div className="offset-xl-4 offset-lg-3 offset-md-2  offset-0 offset-xs-0 col-xl-4 col-lg-5 col-md-7 col-10 d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                  <form>
                    {forms}
                    <div className="form-group " style={{position:'absolute',top:'68%',left:'18px'}}>
                      <button type="button" onClick={props.submit} className="signup btn btn-info btn-block mt-5" >Sign up</button>
                      <Link className='link' to="/registration/true" style={{position:'absolute',top:'90px'}}>Back</Link>
                      </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
  
};

export default SignUp;