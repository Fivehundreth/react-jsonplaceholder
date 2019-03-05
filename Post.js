import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

class Post extends Component {
	constructor(){
		super();
		this.state = {
			post: {title: '', body: ''}, 
			loaded: false,
			user: {},
			saved: false,
		};
		this.savePost = this.savePost.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
	}
	getPost(){
		axios.get('https://jsonplaceholder.typicode.com/posts/'+this.props.match.params.id).then(response => {
			if (response.data){
				this.setState({post: response.data});
				this.getUser();
			}
		})
	}
	getUser(){
		let userId = this.state.post.userId;
		axios.get('https://jsonplaceholder.typicode.com/users/'+userId).then(response => {
			if (response.data){
				this.setState({user: response.data, loaded: true});
			}
		})
	}
	componentDidMount(){
		this.getPost();
	}
	handleTitleChange(event){
		this.setState({
				post: {
					...this.state.post,
					title: event.target.value,
				},
		})
	}
	handleBodyChange(event){
		this.setState({
			post: {
				...this.state.post,
				body: event.target.value,
			},
		})
	}
	savePost(){
		this.setState({saved: false})
  		axios.put('https://jsonplaceholder.typicode.com/posts/'+this.props.match.params.id, this.state.post).then(response => {
  			if (response.data){
  				console.log(response);
  				this.setState({saved: true});
  			}
  		})
  	}
	render(){
		if (this.state.loaded){
			return (
				<div className="post-wrapper">
					<nav className="main-nav">
          				<ul>
            				<li>
              					<Link to="/">Home</Link>
            				</li>
          				</ul>
        			</nav>
        			{
        				this.state.saved &&
        				<h4>Post succesfully saved</h4>
        			}
        			<h4>Post author</h4>
        			<p>{this.state.user.name}</p>
					<h4>Post header</h4>
					<input type="text" value={this.state.post.title} onChange={this.handleTitleChange} className="post-header"/>
					<h4>Post body</h4>
					<textarea className="post-body" value={this.state.post.body} onChange={this.handleBodyChange} />
					<button onClick={this.savePost}>Save</button>
				</div>
				);
		} else {
			return (<div className="loading">Loading ... </div>)
		}
	}
}
export default Post;