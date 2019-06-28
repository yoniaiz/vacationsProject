import React from 'react'
 class Input extends React.Component{
    state = {
        text : ''
    }
    onFormSubmit = async e => { 
         await this.setState({ text : e.target.value })
         this.props.getText(this.state.text)
    }
    
    render(){
        return (  
        <form onSubmit={this.onFormSubmit}>
        <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className={this.props.icon}></i></span>
              </div>
              <input type={this.props.type} className="form-control"
                    value={(!this.state.text)?this.props.text:this.state.text} placeholder={this.props.placeholder}
                    onChange={this.onFormSubmit}/>         
            </div>
        </form>)
    }
}

export default Input;
