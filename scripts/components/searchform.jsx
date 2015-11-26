import React from 'react';
import PoolActions from '../actions/poolactions';

var setAutocompleteAreaForElement = function(inputId, placeElementId){
    var inputElement = document.getElementById(inputId);
    var autocomplete = new google.maps.places.Autocomplete(inputElement);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        var placeId = place.place_id;
        document.getElementById(placeElementId).value = placeId;
    });
}

var SearchForm = React.createClass({
	getInitialState: function () {
	    return {
	      pool: '',
	      shouldHide: false,
	      provider: true
	    };
  	},
  	onFormSubmit: function(searchPool)  {
		PoolActions.searchPoolList(searchPool);
  	},
	handleSubmit: function(e){
		e.preventDefault();
		var origin = this.refs.originId.value;
		var destination = this.refs.destinationId.value;
		var via = this.refs.viaId.value;
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
	componentDidMount: function() {
    	setAutocompleteAreaForElement("from", "originId");
    	setAutocompleteAreaForElement("via", "viaId");
        setAutocompleteAreaForElement("to", "destinationId");
  	},
	render: function(){
		return(
			<form className="thola-form" onSubmit={this.handleSubmit}>
				<div className="search-elements">
					<div className="form-group">
			        	<input className="form-control" type="text" placeholder="From" ref="origin" id="from"/>
			        </div>
			        <div className="form-group">
			        	<input className="form-control" type="text" placeholder="To" ref="destination"  id="to"/>
			        </div>
			        <div className="form-group">
			        	<input className="form-control" type="text" placeholder="via" ref="via" id="via"/>
			        </div>
			        
		        	<div className="form-group time-wrapper">
			        	<input className="form-control time-field" ref="time" type="time" />
			        </div>
			        
			        <div className="form-group submit-button">
			        	<input className="btn btn-primary" type="submit" ref="submit" value="Search" />
			        </div>
			       
			        <input type="hidden" ref="originId" id="originId"/>
				    <input type="hidden" ref="destinationId" id="destinationId"/>
				    <input type="hidden" ref="viaId" id="viaId"/>
		        </div>
		    </form>
	    )
	}
});

module.exports = SearchForm;