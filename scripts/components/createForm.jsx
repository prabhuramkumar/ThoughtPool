import React from 'react';
import PoolActions from '../actions/poolactions';
import AutoComplete from './autocomplete';



var CreateForm = React.createClass({
	getInitialState: function () {
	    return {
	      provider: true
	    };
  	},
  	onFormSubmit: function(searchPool)  {
		PoolActions.createPool(searchPool);
  	},
	handleSubmit: function(e){
		e.preventDefault();

		var origin = this.refs.origin.getPlaceId("originId"),
			via= this.refs.via.getPlaceId("viaId"),
			destination = this.refs.destination.getPlaceId("destinationId"),
			time = this.refs.time.value,
			provider = this.state.provider,
			originAddress = this.refs.origin.getPlace("origin"),
			destinationAddress = this.refs.destination.getPlace("destination"),
			viaAddress = this.refs.via.getPlace("via")

		if(!origin || !via || !destination || !time){
			alert("submit some text");
			return; 
		}

		this.onFormSubmit({
			'origin': origin, 
			'destination': destination, 
			'via': via, 
			'provider':this.state.provider,
			'time': time,
			'originAddress': originAddress,
			'destinationAddress': destinationAddress,
			'viaAddress': viaAddress
		});
	},
	onPoolChanged:function(e){
		this.setState({
           provider: !(this.state.provider)
		});
	},

	render: function(){
		return(
			<form className="thola-form create-form" onSubmit={this.handleSubmit}>
			    <a className="glyphicon glyphicon-remove close-form-buttom" href="/"></a>
				<label><input type="radio" name="poolOption" ref="provider" defaultChecked={true}  /> Own a Car</label>
				<label><input type="radio" name="poolOption" ref="pooler"  onClick={this.onPoolChanged} /> Don&#39;t own a Car</label>
				<div className="search-elements">

					<AutoComplete name="origin" ref="origin"/>
					<AutoComplete name="destination" ref="destination"/>
					<AutoComplete name="via" ref="via"/>

					<div className="form-group time-wrapper">
			        	<input className="form-control time-field" ref="time" type="time" />
			        </div>
				    <div className="form-group submit-button">
			        	<input className="btn btn-primary" type="submit" ref="post" value="Post" />
			        </div>
		        </div>
		    </form>
	    )
	}
});

module.exports = CreateForm;