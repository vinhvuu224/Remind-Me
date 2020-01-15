import React, { Component } from 'react';
import './SignInAndSignUpPage.css';
import SignUp from '../SignUp/SignUp';

class SignUpPage extends Component {
  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
    this.props.signInOnClickHandle()
  }

  render() {
    let testing = "Demo open";
    if(!this.props.showForm){
      testing = "Demo"
    } 
    return (
        <div className={testing}>
          <div className="Demo__Form">
            <div className="PageSwitcher">
            <button onClick={this.handleOnClick} className="SignIn-Inactive" >Sign In</button>
                <button className="SignUp-Active">Sign Up </button>
              </div>
              <div className="FormTitle">
              <label className="SignInLabel">Sign Up</label> 
              </div>
              <SignUp updateID={this.props.updateID}/>
          </div>
        </div>           
    );
  }
}

export default SignUpPage;