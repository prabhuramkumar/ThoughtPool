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
				console.log(serverData);
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

	renderComponent: function(){
		var component;
		if(this.props.config == 'list'){
			component =  <CommentList data={this.state.data} />;
		}else{
			component =  <CommentForm onPostComment={this.updateNewComment} />;
		}
		return component
	},

	render: function(){
		return (
			this.renderComponent()
		);
	}
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment origin={comment.origin} via={comment.via} seats={comment.seats} key={comment.id} destination={comment.destination}></Comment>
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
	getInitialState: function () {
	    return {
	      pool: '',
	      shouldHide: false,
	      provider: true
	    };
  	},
	handleSubmit: function(e){
		e.preventDefault();
		var origin = this.refs.origin.value.trim();
		var destination = this.refs.destination.value.trim();
		var via = this.refs.via.value.trim();
		var seats = this.refs.seats.value.trim();


		if(!destination || !origin){
			alert("submit some text");
			return; 
		}

		this.props.onPostComment({origin: origin, destination: destination, via: via, seats: seats, provider:this.state.provider});
	
	},
	onPoolChanged:function(e){
		this.value ="selected";
		console.log("a");
		console.log(this.refs.pooler);
		this.setState({
           provider: !(this.state.provider)
		});
		// if(this.refs == "pooler"){
		// 	pool :'pooler';
		// 	this.props.shouldHide = true;
		// }
	 //    else {
	 //    	pool :'provider';
	 //    	this.props.shouldHide = true;
	 //    }
	 //    this.setState(pool: pool);
	},
	render: function(){

		return(
			
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<label><input type="radio" name="poolOption" ref="pooler"  onClick={this.onPoolChanged} /> Pooler</label>
				<label><input type="radio" name="poolOption" ref="provider" defaultChecked={true} onClick={this.onPoolChanged} /> Provider</label>
				<div className="form-group">
		        	<input className="form-control" type="text" placeholder="From" ref="origin" />
		        </div>
		        <div className="form-group">
		        	<input className="form-control" type="text" placeholder="To" ref="destination" />
		        </div>
		        <div className="form-group" >
		        	<input className="form-control" type="text" placeholder="via" ref="via" className={this.state.provider ? '' : 'hidden'}/>
		        </div>
		        <div className="form-group">
		        	<input className="form-control" type="text" placeholder="seats" ref="seats" className={this.state.provider ? '' : 'hidden'}/>
		        </div>
		        <div className="form-group">
		        	<input className="btn btn-primary" type="submit" value="Publish" />
		        </div>
		    </form> 
	    )
	}
});

// var poolerForm = React.createClass({
// 	rawMarkup: function(){

// 	},
// 	render: function(){
// 		return (

// 		)
// 	};
// })

var Comment = React.createClass({
	rawMarkup: function(){
		var rawMarkup = marked(this.props.children.toString(), {santize: true});
		return {__html: rawMarkup};
	},
	render: function(){
		return (
			<div className="alert">
				<ul className="trip-panel">
					<li className="origin">
						Origin: <strong>{this.props.origin}</strong>
					</li>
					<li className="via">
						Via: <strong>{this.props.via}</strong>
					</li>
					<li className="destination">
						Dest: <strong>{this.props.destination}</strong>
					</li>
				</ul>
				<p className="seats">
					Seats: <strong>{this.props.seats}</strong>
				</p>
			</div>
		);
	}
});


module.exports = CommentBox;

