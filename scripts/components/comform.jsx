import React from 'react';


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


		if(!destination || !origin){
			alert("submit some text");
			return; 
		}
		this.props.onFormSubmit({
			'origin': origin, 
			'destination': destination, 
			'via': via, 
			'provider':this.state.provider
		});
		this.refs.origin.value = '';
		this.refs.destination.value = '';
		this.refs.via.value = '';
	},
	onPoolChanged:function(e){
		this.setState({
           provider: !(this.state.provider)
		});
	},
	render: function(){

		return(
			
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<label><input type="radio" name="poolOption" ref="provider" defaultChecked={true} onClick={this.onPoolChanged} /> Own a Car</label>
				<label><input type="radio" name="poolOption" ref="pooler"  onClick={this.onPoolChanged} /> Don&#39;t own a Car</label>
			
				<div className="form-group">
		        	<input className="form-control" type="text" placeholder="From" ref="origin" />
		        </div>
		        <div className="form-group">
		        	<input className="form-control" type="text" placeholder="To" ref="destination" />
		        </div>
		        <div className="form-group">
		        	<input className="form-control" type="text" placeholder="via" ref="via" />
		        </div>
		        
		        <div className="form-group">
		        	<input className="btn btn-primary" type="submit" value="Search" />
		        </div>
		    </form> 
	    )
	}
});

module.exports = CommentForm;