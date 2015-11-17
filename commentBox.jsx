import React from 'react';
import marked from 'marked';
import jquery from 'jquery';
var $ = jquery;

var CommentBox = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	loadCommentsFromServer: function (){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(serverData){
				this.setState({data: serverData});
			}.bind(this),
			error: function(){
				console.error(this.props.url, status);
			}.bind(this)
		})
	},

	updateNewComment: function(comment){
		//Post the comment on UI before updating the JSON
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});

		$.ajax({
		  url: this.props.url,
		  dataType: 'json',
		  type: 'POST',
		  data: comment,
		  success: function(data) {
		    this.setState({data: data});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},

	componentDidMount: function() {
		this.loadCommentsFromServer();
		//setInterval(this.loadCommentsFromServer, this.props.interval);
	},

	render: function(){
		return (
			<div className="commentBox">
				<CommentList data={this.state.data} />
				<CommentForm onPostComment={this.updateNewComment} />
			</div>

		);
	}
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});


var CommentForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.refs.author);
		var author = this.refs.author.value.trim();
		var text = this.refs.text.value.trim();

		if(!text || !author){
			alert("submit some text");
			return; 
		}

		this.props.onPostComment({author: author, text: text});
		this.refs.author.value = '';
		this.refs.text.value = '';
	},

	render: function(){
		return(
			<form className="commentForm" onSubmit={this.handleSubmit}>
		        <input type="text" placeholder="Your name" ref="author" />
		        <br></br>
		        <textarea placeholder="Say something..." ref="text" />
		        <br></br>
		        <input type="submit" value="Post" />
		    </form> 
	    )
	}
});

var Comment = React.createClass({
	rawMarkup: function(){
		var rawMarkup = marked(this.props.children.toString(), {santize: true});
		return {__html: rawMarkup};
	},
	render: function(){
		return (
			<div className="comment">
				<h3 className="author">
					{this.props.author}
				</h3>
				<span dangerouslySetInnerHTML={this.rawMarkup()}></span>
			</div>
		);
	}
});


module.exports = CommentBox;

