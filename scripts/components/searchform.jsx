import React from 'react';
import PoolActions from '../actions/poolactions';
import AutoComplete from './autocomplete';

var SearchForm = React.createClass({
	autoCompleteValues: [],
  	onFormSubmit: function(searchPool)  {
		PoolActions.searchPoolList(searchPool);
  	},

	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.refs.origin.getPlaceId("originId"));
		var time = this.refs.time.value;

		if(!this.refs.origin.getPlaceId("originId") || !this.refs.destination.getPlaceId("destinationId")){
			alert("submit some text");
			return; 
		}
		this.onFormSubmit({
			origin: this.refs.origin.getPlaceId("originId"),
			destination: this.refs.destination.getPlaceId("destinationId"),
			via: this.refs.via.getPlaceId("viaId")
		});
	},

	render: function(){
		return(
			<form className="thola-form search-form" onSubmit={this.handleSubmit}>
				<div className="search-elements">
					<AutoComplete name="origin" ref="origin"/>
					<AutoComplete name="destination" ref="destination"/>
					<AutoComplete name="via" ref="via"/>
			        <div className="form-group time-wrapper">
			        	<input className="form-control time-field" ref="time" type="time" />
			        </div>
			        <div className="form-group submit-button">
			        	<input className="btn btn-primary" type="submit" ref="submit" value="Search" />
			        </div>
		        </div>
		    </form>
	    )
	}
});

module.exports = SearchForm;