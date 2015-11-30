import React from 'react';
import PoolActions from '../actions/poolactions';
import AutoComplete from './autocomplete';
import Constants from './constants';

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

	render: function(){
		return(
			<form className="thola-form search-form">
				<div className="search-elements">
					<AutoComplete name={Constants.origin} ref={Constants.origin}/>
					<AutoComplete name={Constants.destination} ref={Constants.destination}/>
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