import React from 'react';
import PoolActions from '../actions/poolactions';
import AutoComplete from './autocomplete';
import Constants from './constants';
import MapRenderer from '../stores/mapRenderer';




var SearchForm = React.createClass({

	handleSubmit: function(e){
		e.preventDefault();
		var time = this.refs.time.value;

		var origin = this.refs[Constants.origin].getLatLong();
		var destination = this.refs[Constants.destination].getLatLong();

		if(!origin || !destination){
			alert("submit valid input");
			return;
		}
		var searchPool = {
			origin: origin,
			destination: destination,
		};

		PoolActions.searchPoolList(searchPool);
	},
	
	resetSource: function(source){
		MapRenderer.resetSource(source);
	},

	resetDestination: function(destination){
		MapRenderer.resetDestination(destination);
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

			        <div className="form-group time-wrapper">
			        	<input className="form-control time-field" ref="time" type="time" />
			        </div>
			        <div className="form-group submit-button">
			        	<input className="btn btn-primary" type="submit" ref="submit" value="Search" onClick={this.handleSubmit} />
			        </div>
		        </div>
		        
		    </form>
	    )
	}
});

module.exports = SearchForm;