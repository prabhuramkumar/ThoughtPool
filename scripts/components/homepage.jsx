import React from 'react';

var HomePage = React.createClass({
	render: function(){
		return(
			<div className="home-page">
				<div className="welcome">
					<h1> Hi, Thola!!</h1>
					<h3>We welcome you here!!</h3>
				</div>
				<div className="intro-block">
					<div className="intro">
						<h4>Own a car?</h4>
						<p>Offer a ride to your collegues by just posting your regular commute, we will connect you with people on your route.</p>
						<a href="/create" className="btn-primary btn">Offer a Ride</a>
					</div>
					<div className="intro">
						<h4>Dont own a car?</h4>
						<p>Take a ride with your collegue by just posting your regular commute, we will connect you with people on your route.</p>
						<a href="/search" className="btn-primary btn">Take a Ride</a>
					</div>
				</div>
				<h4 className="purpose">Share or Offer a ride to people and contribute to the traffic solution to your city through this small intiative. </h4>
			</div>

		);
	}
});

module.exports = HomePage;