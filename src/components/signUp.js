import React, { Component,useState } from 'react'

export default class SignUp extends Component {

  constructor(props){
    super(props)
    console.log(props)
    
  }

  //  authHandler = (e)=>{
  //   e.preventDefault();
  //   const elements = e.target;
  //   const formData = {};
  //       Array.from(elements).forEach(field =>{
  //           if(!field.name) return;
  //           formData[field.name] = field.value;
  //           formData["type"] = "signup";
  //       })
  //     console.log(formData) 
  // }

  // showP(e){
  //   var show = (e.target.parentElement.nextSibling.type)
  //   if(show === "password"){
  //     this.setState({inputType:"text"})
  //   } else{
  //     this.setState({inputType:"password"})
  //   }
    
  // }


  render() {
    console.log(this.props.inputType.inputType)
    return (
      <form onSubmit={this.props.authHandler}>
        <h3>Sign Up</h3>
        <input style={{"display":"none"}} name="type" value={"signup"} readOnly/>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="fname"
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" 
          placeholder="Last name" 
          name='lname'
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
          />
        </div>

        <div className="mb-3">
          <div className="label-control" >
              <label>Password </label>
              &nbsp; &nbsp; 
              <label className='pass-control' onClick={this.props.showP}> Show password</label>
          </div>
          <input
            type={this.props.inputType.inputType}
            className="form-control"
            placeholder="Enter password"
            name="password"
          />
        </div>
        <div className="mb-3">
        <div className="label-control" >
              <label>Password </label>
              &nbsp; &nbsp; 
              <label className='pass-control' onClick={this.props.showP}> Show password</label>
          </div>
          <input
            type={this.props.inputType.inputType}
            className="form-control"
            placeholder="Confirm password"
            name="password2"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}
