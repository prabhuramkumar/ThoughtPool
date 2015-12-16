import React from 'react';
import PoolActions from '../actions/poolactions';
import AutoComplete from './autocomplete';
import Constants from './constants';




var SearchForm = React.createClass({

	handleSubmit: function(e){
		e.preventDefault();

		var origin = this.refs[Constants.origin].getLatLong(),
		destination = this.refs[Constants.destination].getLatLong(),
		preferredRoute = $("#encodedRoute").val(),
		time = $("#time").val();

		if(!origin || !destination){
			alert("submit valid input");
			return;
		}
		var searchPool = {
			origin: origin,
			destination: destination,
			encodedRoute: preferredRoute,
			time: time
		};

		PoolActions.loadPools(searchPool);
	},

	resetSource: function(source){
		var newRoute = {"source": source};
		this.props.mapActions().resetRoute(newRoute);
	},

	resetDestination: function(destination){
		var newRoute = {"destination": destination};
		this.props.mapActions().resetRoute(newRoute);
	},

	resetSourceLatLng: function(sourcePosition){
		this.refs.origin.resetLatLng(sourcePosition);
	},
	resetDestinantionLatLng: function(destinationPosition){
		this.refs.destination.resetLatLng(destinationPosition);
	},

	render: function(){
		return(
			<form className="thola-form search-form">
				<div className="search-elements">
					<AutoComplete 
						name={Constants.origin} 
						ref={Constants.origin}
						placeChangedCallback={this.resetSource}/>
					<AutoComplete 
						name={Constants.destination} 
						ref={Constants.destination}
						placeChangedCallback={this.resetDestination}/>

			     
			        <div className="form-group submit-button">
			        	<input className="btn btn-primary" type="submit" ref="submit" value="Search" onClick={this.handleSubmit} />
			        </div>
		        </div>
		        
		    </form>
	    )
	}
});

module.exports = SearchForm;