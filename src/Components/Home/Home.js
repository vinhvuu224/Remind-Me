import './Home.css';
import React from 'react';
import ListItems from '../ListItems/ListItems'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash, faThumbtack} from '@fortawesome/free-solid-svg-icons'
import Header from '../Header/Header';
import '../Header/Header.css';
import axios from "axios";
import '../SignIn/SignIn';
import { Link, withRouter } from 'react-router-dom';

 
library.add(faTrash);
library.add(faThumbtack);
class Home extends React.Component {
 
 constructor(props){
   super(props);
   this.state = {
     items:[],
     currentItem:{
       task:''
     }
   }
   this.handleInput = this.handleInput.bind(this);
   this.addItem = this.addItem.bind(this);
   this.deleteItem = this.deleteItem.bind(this);
   this.setUpdate = this.setUpdate.bind(this);
   this.handleOnClickLogout = this.handleOnClickLogout.bind(this);
 }
 
 handleInput(e){
   this.setState({
     currentItem:{
       task: e.target.value
     }
   })
 }
 
 addItem(e){
   e.preventDefault();
   const newItem = this.state.currentItem;
     if(newItem.task !== ""){
      axios.post('http://localhost:5001', {user: this.props.userID, task: newItem.task})
      .then(res => axios.get('http://localhost:5001')
      .then(res =>{
        const taskArr = [];
        res.data.map(task => {
          if(task.user===this.props.userID){
            taskArr.push({ task: task.task, key: task._id})
          }
        })
        this.setState({
          items: taskArr,
          currentItem:{
            task:''
          }
        })
      })
      );
   }
 }
 
 deleteItem(key){
   const filteredItems = this.state.items.filter(item => item.key !== key);
   this.setState({
     items: filteredItems
   })
   axios.delete('http://localhost:5001/'+key)
   .then(res => {console.log(res)});
 }
 
 setUpdate(text, key){
   const items = this.state.items;
   items.map(item=>{
     if(item.key===key){
       item.task=text;
       axios.put('http://localhost:5001/'+key, {
        task: item.task
      })
      .then(response => {
        console.log(response);
      });
     }
   })
   this.setState({
     items: items
   })
 }

 handleOnClickLogout(){
   this.props.history.push('/');
 }

componentDidMount(){
  document.body.style.backgroundColor = "#66CCff";
  if(this.props.noDbItems.length>0){
    this.props.noDbItems.map(item => (
        axios.post('http://localhost:5001', {user: this.props.userID, task: item.task})
        .then(res => axios.get('http://localhost:5001')
        .then(response =>{
          const taskArr = [];
          if (response.data.length>0){
            response.data.map(task => {
              if(task.user===this.props.userID){
                taskArr.push({task: task.task, key: task._id})
              }
            })
            this.setState({
              items: taskArr
            })
          }
        })
      )
    ))
}
else{
  axios.get('http://localhost:5001')
    .then(response =>{
      const taskArr = [];
      if (response.data.length>0){
        response.data.map(task => {
          if(task.user===this.props.userID){
            taskArr.push({task: task.task, key: task._id})
          }
        })
        this.setState({
          items: taskArr
        })
      }
    })
  }
}
 
 render(){  
   return (
     <div>
       <div className="login">
          <Link exact to="/" className="loginButton" onClick={this.handleOnClickLogout}>Logout</Link>
        </div>
    <div className="header">
    <Header/>
    <div className="Home">
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
  </div>
  </div>
  </div>
   )
}
}

export default withRouter(Home);