import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn';
import './SignInAndSignUpPage.css';

class SignInPage extends Component {
  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
    this.props.signUpOnClickHandle();
  }

  render() {
    let testing = "Demo";
    if(this.props.showForm){
      testing = "Demo open"
    } 
    return (
        <div className={testing} >
          <div className="Demo__Form">
            <div className="PageSwitcher">
                <button className="SignIn-Active" >Sign In</button>
                <button onClick={this.handleOnClick} className="SignUp-Inactive">Sign Up </button>
              </div>
              <div className="FormTitle">
                  <label className="SignInLabel">Sign In</label> 
              </div>
              <SignIn updateID={this.props.updateID} noDbItems={this.props.noDbItems}/>
          </div>
        </div>
    );
  }
}

export default SignInPage;