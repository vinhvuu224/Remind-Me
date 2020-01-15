import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./Components/Home/Home";
import NoDB from './Components/NoDB/NoDB';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      id: "",
      items:[],
    }
    this.noDbItems = this.noDbItems.bind(this);
    this.updateID = this.updateID.bind(this);

  }

  noDbItems(data){
    this.setState({
      items: data
    })
  }

  updateID(data){
    this.setState({
      id: data
    })
  }



 render(){   
   return (
     <div >
    <Router>
      <Switch>
        <Route exact path='/Home' render={(props) => (<Home {...this.props} userID = {this.state.id} updateItems={this.noDbItems} noDbItems={this.state.items}/>)}/>
        <Route exact path='/' render={(props) => (<NoDB {...this.props} passNoDbItems={this.noDbItems} updateID={this.updateID} noDbItems={this.noDbItems}/>)}/>
      </Switch>
    </Router>
    
    </div>
   );
}
}
 
export default App;
 