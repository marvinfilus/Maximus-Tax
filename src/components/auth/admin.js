import React, { Component } from 'react'
export default class Admin extends Component {

  handleSubmit(e){
    e.preventDefault();
    const elements = e.target;
    const formData = {};
        Array.from(elements).forEach(field =>{
            if(!field.name) return;
            formData[field.name] = field.value;
        })
      console.log(formData) 
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Admin Sign In</h3>
        <input style={{"display":"none"}} name="type" value={"admin"} readOnly/>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name='email'
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}
