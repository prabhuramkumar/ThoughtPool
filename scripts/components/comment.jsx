import React from 'react';

var Comment = React.createClass({
	rawMarkup: function(){
		var rawMarkup = marked(this.props.children.toString(), {santize: true});
		return {__html: rawMarkup};
	},
	render: function(){
		return (
			<div className="poollist">
				<ul className={this.props.provider ?'trip-panel provider' : 'trip-panel pooler'}>
					<li className="origin">
						<span>From</span>
						<strong>{this.props.origin}</strong>
					</li>
					<li className="via">
						<span>Via</span>
						<strong>{this.props.via}</strong>
					</li>
					<li className="destination">
						<span>To</span>
						<strong>{this.props.destination}</strong>
					</li>
				</ul>
				<ul className="misc-panel">
					<li>
						<h5>
							Ramesh ({this.props.provider ?'Provider' : 'Pooler'})
						</h5>
					</li>
				</ul>
				</div>
           
		);
	}
});

module.exports = Comment;