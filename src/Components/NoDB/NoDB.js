import './NoDB.css';
import React from 'react';
import ListItems from '../ListItems/ListItems'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash, faThumbtack, faFileExcel} from '@fortawesome/free-solid-svg-icons'
import Header from '../Header/Header';
import '../Header/Header.css';
import Backdrop from '../Backdrop/Backdrop'
import SignInPage from '../SignInAndSignUpPage/SignInPage'
import SignUpPage from '../SignInAndSignUpPage/SignUpPage'
import '../SignInAndSignUpPage/SignInAndSignUpPage.css'

 
library.add(faTrash);
library.add(faThumbtack);
 
export default class NoDB extends React.Component {
 
 constructor(props){
   super(props);
   this.state = {
     items:[],
     showForm: false,
     showBackDrop: false,
     signInForm: true,
     signUpForm: true,
     currentItem:{
       task:'',
       key:''
     }
   }
   this.handleInput = this.handleInput.bind(this);
   this.addItem = this.addItem.bind(this);
   this.deleteItem = this.deleteItem.bind(this);
   this.setUpdate = this.setUpdate.bind(this);
   this.toggleLoginForm = this.toggleLoginForm.bind(this);
   this.signInOnClickHandle = this.signInOnClickHandle.bind(this);
   this.signUpOnClickHandle = this.signUpOnClickHandle.bind(this);
   this.toggleBackDrop = this.toggleBackDrop.bind(this);
 }

 toggleLoginForm() {
  this.setState({
    showForm: !this.state.showForm,
    showBackDrop: !this.state.showBackDrop,
  })
  this.props.noDbItems(this.state.items);
}

 toggleBackDrop() {
  this.setState({
    showForm: !this.state.showForm,
    showBackDrop: !this.state.showBackDrop,
  })
}
 
 handleInput(e){
   this.setState({
     currentItem:{
       task: e.target.value,
       key: Date.now()
     }
   })
 }
 
 addItem(e){
   e.preventDefault();
   const newItem = this.state.currentItem;
     if(newItem.task !== ""){
     const newItems=[...this.state.items, newItem];
     this.setState({
       items: newItems,
       currentItem:{
         task:'',
         key:''
       }
     })
   }
 }
 
 deleteItem(key){
   const filteredItems = this.state.items.filter(item => item.key !== key);
   this.setState({
     items: filteredItems
   })
 }
 
 setUpdate(text, key){
   const items = this.state.items;
   items.map(item=>{
     if(item.key===key){
       item.task=text;
     }
   })
   this.setState({
     items: items
   })
 }

componentDidMount(){
    document.body.style.backgroundColor = "#66CCff";
}

signInOnClickHandle(){
  this.setState({
    signInForm: true,
    signUpForm: false,
  })
}

signUpOnClickHandle(){
  this.setState({
    signInForm: false,
    signUpForm: true
  })
}
 
 render(){
   return (
     <div>
      {this.state.showBackDrop && <Backdrop toggle={this.toggleBackDrop}></Backdrop>}
        <div className="login">
          <button className="loginButton" onClick={this.toggleLoginForm}>Login</button>
        </div>
        <p className="note">Note: This is a demo only. In order to save your progress, please signin/signup.</p>
        <div className="header">
        <Header/>
        <div className="Home">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input type="text" placeholder="Enter tasks..."
            value={this.state.currentItem.task}     
            onChange={this.handleInput}/>
            <button type="submit">Add</button>
          </form>
        <ListItems
        items = {this.state.items}
        deleteItem ={this.deleteItem}
        setUpdate = {this.setUpdate}>
        </ListItems>
        </header>
        {this.state.signUpForm && <SignUpPage updateID={this.props.updateID} showForm={this.state.showForm} signInOnClickHandle={this.signInOnClickHandle} />}
        {this.state.signInForm && <SignInPage updateID={this.props.updateID} showForm={this.state.showForm} signUpOnClickHandle={this.signUpOnClickHandle} noDbItems={this.state.items}/>}
      </div>
      </div>
     </div>
   )
}
}