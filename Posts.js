import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Posts extends Component {
	constructor(){
		super();
		this.state = {
			posts: [],
			loaded: false,
		};
	}
	componentDidMount(){
		this.getPosts();
	}
	getPosts(){
  	axios.get('https://jsonplaceholder.typicode.com/posts').then(
  		response => {
  			this.setState({posts: response.data, loaded: true});
  		})
  	}
	render(){
		const {loaded, posts} = this.state;
		if (loaded){
			return (
				<div className='posts'>
				<header>
        			<h1>Posts</h1>
        		</header>
        		<nav className="main-nav">
          			<ul>
            			<li>
              				<Link to="/">Home</Link>
            			</li>
          			</ul>
        		</nav>
				{posts.map(post => (<div key={post.id} className='post'><Link to={'/posts/'+post.id}>{post.title}</Link></div>))}
					</div>
					)
		} else {
			return <div className="loading">Loading...</div>
		}
	}
}
export default Posts;