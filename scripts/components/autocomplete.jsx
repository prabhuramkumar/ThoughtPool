import React from 'react';

var AutoComplete = React.createClass({

	setAutocompleteAreaForElement: function(inputId, placeElementId){
	    var inputElement = document.getElementById(inputId);
	    var autocomplete = new google.maps.places.Autocomplete(inputElement);
	    var component = this;
	    var name = this.props.name;

	    inputElement.addEventListener('change', function(){
	        document.getElementById(placeElementId).value = "";
	    });

	    autocomplete.addListener('place_changed', function() {
	        var place = autocomplete.getPlace();
	        var placeId = place.place_id;
	        document.getElementById(placeElementId).value = placeId;

	        if(component.props.placeChangedCallback){
	     	   component.props.placeChangedCallback(placeId);
	    	}
	    });
	},
  
	componentDidMount: function() {
		var ref = this.props.name, 
			refId=ref + "Id";
    	this.setAutocompleteAreaForElement(ref, refId);
  	},

  	getPlaceId: function(refId){
  		return this.refs[refId].value;
  	},

  	getPlace: function(ref){
  		return this.refs[ref].value;
  	},
  	
	render: function(){
		var ref = this.props.name, 
			refId=ref + "Id";
		return(
			<div className="auto-complete">
				<div className="form-group">
		        	<input className="form-control" type="text" ref={ref} id={ref} placeholder={ref}/>
		        </div>
		        
		        <input type="hidden" ref={refId} id={refId}/>
		    </div>
			      
	    )
	}
});

module.exports = AutoComplete;