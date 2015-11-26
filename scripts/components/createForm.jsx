import React from 'react';
import PoolActions from '../actions/poolactions';
import AutoComplete from './autocomplete';
import Constants from './constants';

var CreateForm = React.createClass({
	
	handleSubmit: function(e){
		e.preventDefault();

		var originElement = this.refs[Constants.origin];
		var destinationElement = this.refs[Constants.destination];
		var viaElement = this.refs[Constants.via];

		var origin = originElement.getPlaceId(Constants.originId),
			via= viaElement.getPlaceId(Constants.viaId),
			destination = destinationElement.getPlaceId(Constants.destinationId),
			time = this.refs.time.value,
			provider = this.refs.provider.checked,
			originAddress = originElement.getPlace(Constants.origin),
			destinationAddress = destinationElement.getPlace(Constants.destination),
			viaAddress = viaElement.getPlace(Constants.via)

		if(!origin || !via || !destination || !time){
			alert("submit some text");
			return; 
		}

		var searchPool = {
			'origin': origin, 
			'destination': destination, 
			'via': via, 
			'provider': provider,
			'time': time,
			'originAddress': originAddress,
			'destinationAddress': destinationAddress,
			'viaAddress': viaAddress
		};
		PoolActions.createPool(searchPool);
	},

	render: function(){
		return(
			<form className="thola-form create-form" onSubmit={this.handleSubmit}>
			    <a className="glyphicon glyphicon-remove close-form-buttom" href="/"></a>
				<label><input type="radio" name="poolOption" ref="provider" defaultChecked={true}  /> Own a Car</label>
				<label><input type="radio" name="poolOption" ref="pooler"/> Don&#39;t own a Car</label>
				<div className="search-elements">
					<AutoComplete name={Constants.origin} ref={Constants.origin}/>
					<AutoComplete name={Constants.destination} ref={Constants.destination}/>
					<AutoComplete name={Constants.via} ref={Constants.via}/>

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