import React from 'react';
import Reflux from 'reflux';
import PoolStore from '../stores/poolstore';

var SuccessAlert = React.createClass({

	mixins: [Reflux.connect(PoolStore, 'poolstore')],

	init: function(){
		var page;
		if(this.state.poolstore.postSuccess){
			page = <div className="alert alert-success">
				 	Your route is Successfully created and posted.
				 </div> 
		} else {
			page = <div></div>
		}
		return page;
	},
	
	render: function(){
		return this.init();
	}
});

module.exports = SuccessAlert;