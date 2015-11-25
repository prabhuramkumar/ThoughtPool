import React from 'react';
import PoolActions from '../actions/poolactions';


var CommentForm = React.createClass({
	getInitialState: function () {
	    return {
	      pool: '',
	      shouldHide: false,
	      provider: true
	    };
  	},
  	onFormSubmit: function(searchPool)  {
  		if(this.props.config=="post"){
    		PoolActions.createPool(searchPool);
    	}else{
    		PoolActions.searchPoolList(searchPool);
    	}
  	},
	handleSubmit: function(e){
		e.preventDefault();
		var origin = this.refs.origin.value.trim();
		var destination = this.refs.destination.value.trim();
		var via = this.refs.via.value.trim();
		var time= this.refs.time.value;


		if(!destination || !origin){
			alert("submit some text");
			return; 
		}
		this.onFormSubmit({
			'origin': origin, 
			'destination': destination, 
			'via': via, 
			'provider':this.state.provider,
			'time': time
		});
	},
	onPoolChanged:function(e){
		this.setState({
           provider: !(this.state.provider)
		});
	},
	closeForm: function(e){
		alert("closed");
	},
	render: function(){

		return(
			
			<form className={this.props.config =='post' ? 'searchForm postForm': 'searchForm'} onSubmit={this.handleSubmit}>
			    <a className={this.props.config =='post' ? 'glyphicon glyphicon-remove close-form-buttom': 'hidden'} href="/"></a>
				<label><input type="radio" name="poolOption" ref="provider" defaultChecked={true} onClick={this.onPoolChanged} /> Own a Car</label>
				<label><input type="radio" name="poolOption" ref="pooler"  onClick={this.onPoolChanged} /> Don&#39;t own a Car</label>
				<div className="search-elements">
					<div className="form-group">
			        	<input className="form-control" type="text" placeholder="From" ref="origin" />
			        </div>
			        <div className="form-group">
			        	<input className="form-control" type="text" placeholder="To" ref="destination" />
			        </div>
			        <div className="form-group">
			        	<input className="form-control" type="text" placeholder="via" ref="via" />
			        </div>
			        
		        	<div className="form-group time-wrapper">
			        	<input className="form-control time-field" ref="time" type="time" />
			        </div>
			        
			        <div className={this.props.config =='post' ? 'hidden': 'form-group submit-button'}>
			        	<input className="btn btn-primary" type="submit" ref="submit" value="Search" />
			        </div>
			         <div className={this.props.config =='post' ? 'form-group submit-button': 'hidden'}>
			        	<input className="btn btn-primary" type="submit" ref="post" value="Post" />
			        </div>
		        </div>
		    </form> 
	    )
	}
});

module.exports = CommentForm;