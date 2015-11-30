import React from 'react';
import PoolActions from '../actions/poolactions';
import AutoComplete from './autocomplete';
import Map from './map';
import Constants from './constants';
import MapRenderer from '../stores/mapRenderer';

var CreateForm = React.createClass({
	
	resetSource: function(source){
		MapRenderer.resetSource(source);
	},

	resetDestination: function(destination){
		MapRenderer.resetDestination(destination);
	},

	handleSubmit: function(e){
		e.preventDefault();

		var originElement = this.refs[Constants.origin];
		var destinationElement = this.refs[Constants.destination];

		var time = this.refs.time.value,
			provider = this.refs.provider.checked,
			originAddress = originElement.getPlace(),
			destinationAddress = destinationElement.getPlace(),
			routeEncoded = document.getElementById("encodedRoute").value,
			origin = originElement.getLatLong(),
			destination = destinationElement.getLatLong();

		if(!origin || !destination || !time){
			alert("submit valid input");
			return; 
		}

		if(!routeEncoded){
			alert("Route doesn't exist for the given areas");
			return;
		}
		
		var pool = {
			'provider': provider,
			'time': time,
			'originAddress': originAddress,
			'destinationAddress': destinationAddress,
			'routeEncoded': routeEncoded
		};
		PoolActions.createPool(pool);
	},

	render: function(){
		return(
			<div className="create-container">
				<form className="thola-form create-form" onSubmit={this.handleSubmit}>
				    <a className="glyphicon glyphicon-remove close-form-buttom" href="/"></a>
					<label><input type="radio" name="poolOption" ref="provider" defaultChecked={true}  /> Own a Car</label>
					<label><input type="radio" name="poolOption" ref="pooler"/> Don&#39;t own a Car</label>
					<div className="search-elements">
						<AutoComplete 
							name={Constants.origin}
							ref={Constants.origin}
							placeChangedCallback={this.resetSource}/>
						<AutoComplete
							name={Constants.destination}
							ref={Constants.destination}
							placeChangedCallback={this.resetDestination}/>

						<div className="form-group time-wrapper">
				        	<input className="form-control time-field" ref="time" type="time" />
				        </div>
					    <div className="form-group submit-button">
				        	<input className="btn btn-primary" type="submit" ref="post" value="Post" />
				        </div>
			        </div>
			    </form>
			    <Map/>
		    </div>
	    )
	}
});

module.exports = CreateForm;