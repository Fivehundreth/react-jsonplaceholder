import React, { Component } from 'react';
import './App.css';
import Posts from './Posts.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Post from './Post.js';

class App extends Component {	
  render() {
    return (
      <div className="App">
        <Router>
      <div>
        <Route path="/" exact component={Posts} />
        <Route path="/posts/:id" component={Post} />
      </div>
    </Router>
      </div>
    );
  }
}

export default App;
