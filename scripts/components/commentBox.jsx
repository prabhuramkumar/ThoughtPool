import React from 'react';
import marked from 'marked';
import Reflux from 'reflux';
import PoolStore from '../stores/poolstore';
import PoolActions from '../actions/poolactions';


var CommentBox = React.createClass({
	mixins: [Reflux.connect(PoolStore, 'poolstore')],

	onFormSubmit: function(newPool) {
	  PoolActions.createPool(newPool);
	},

	renderComponent: function(){
		var component;
		if(this.props.config == 'list'){
			component =  <CommentList data={this.state.poolstore} />;
		}else{
			component =  <CommentForm onFormSubmit={this.onFormSubmit} />;
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
				<Comment 
					origin={comment.origin} 
					via={comment.via} 
					seats={comment.seats} 
					key={comment.id} 
					destination={comment.destination}
					provider={comment.provider}>
				</Comment>
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
		this.props.onFormSubmit({
			'origin': origin, 
			'destination': destination, 
			'via': via, 
			'seats': seats, 
			'provider':this.state.provider
		});
		this.refs.origin.value = '';
		this.refs.destination.value = '';
		this.refs.via.value = '';
		this.refs.seats.value = '';
	},
	onPoolChanged:function(e){
		this.value ="selected";
		this.setState({
           provider: !(this.state.provider)
		});
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
		        <div className="form-group">
		        	<input className={this.state.provider ?'form-control' : 'hidden'} type="text" placeholder="via" ref="via" />
		        </div>
		        <div className="form-group">
		        	<input className={this.state.provider ?'form-control' : 'hidden'} type="number" min="1" placeholder="seats" ref="seats" />
		        </div>
		        <div className="form-group">
		        	<input className="btn btn-primary" type="submit" value="Publish" />
		        </div>
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
			<div className="poollist">
				<ul className={this.props.provider ?'trip-panel provider' : 'trip-panel pooler'}>
					<li className="origin">
						<span>From</span>
						<strong>{this.props.origin}</strong>
					</li>
					<li className="via">
						<span>Via</span>
						<strong>{this.props.via}</strong>
					</li>
					<li className="destination">
						<span>To</span>
						<strong>{this.props.destination}</strong>
					</li>
				</ul>
				<ul className="misc-panel">
					<li>
						<h5>
							Ramesh ({this.props.provider ?'Provider' : 'Pooler'})
						</h5>
					</li>
					<li className="seats">
						<span>Avilable seats: </span>
						<strong>{this.props.seats}</strong>
					</li>
				</ul>
			</div>
		);
	}
});


module.exports = CommentBox;

