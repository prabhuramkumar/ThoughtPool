var Reflux = require('reflux');

import React from 'react';
import PoolActions from '../actions/poolactions';
import PoolStore from '../stores/poolstore';


var RequestMailer = React.createClass({

	mixins: [Reflux.connect(PoolStore, 'poolstore')],

	requestMail: function(){
		this.props.sendEmailRequest();
		
	},

	render: function(){
		return(
			<div className="modal fade bs-example-modal-sm" id="sendEmailRequest" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">

			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			        	<span aria-hidden="true">&times;</span>
			        </button>
			        <h4 className="modal-title" id="exampleModalLabel">Car Pool Request</h4>
			      </div>

			      <div className="modal-body">
			        <form>
			          <div className="form-group">
			            <label for="message-text" className="control-label">Message:</label>
		            	<p>I would like to pool with you on this route.</p>
			          </div>
			        </form>
			      </div>

			      <div className="modal-footer">
			        <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
			        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.requestMail}>Send message</button>
			      </div>

			    </div>
			  </div>
			</div>

		);
	}
});

module.exports = RequestMailer;

