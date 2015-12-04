import React from 'react';

var AutoComplete = React.createClass({
	latlong:{},

	setAutocompleteAreaForElement: function(inputId){
	    var inputElement = document.getElementById(inputId);
	    var autocomplete = new google.maps.places.Autocomplete(inputElement);
	    var component = this;

	    inputElement.addEventListener('change', function(){
	        component.resetLatLng({});
	    });

	    autocomplete.addListener('place_changed', function() {
	        var place = autocomplete.getPlace();
	        component.resetLatLng(place.geometry.location);

	        if(component.props.placeChangedCallback){
	     	   component.props.placeChangedCallback(place.geometry.location);
	    	}
	    });
	},

	resetLatLng: function(position){
		this.latlong = position;
	},
  
	componentDidMount: function() {
    	this.setAutocompleteAreaForElement(this.props.name);
  	},

  	getPlace: function(){
  		return this.refs[this.props.name].value;
  	},
  	
  	getLatLong: function(){
  		return this.latlong;
  	},

	render: function(){
		var ref = this.props.name;

		return(
			<div className="auto-complete">
				<div className="form-group">
		        	<input className="form-control" type="text" ref={ref} id={ref} placeholder={ref}/>
		        </div>
		    </div>
			      
	    )
	}
});

module.exports = AutoComplete;