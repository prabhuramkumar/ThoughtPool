import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';

var HomePage = React.createClass({
	render: function(){
		return(
			<div className="home-page">
				<section className="welcome">
					<h1> Hi, Thola!!</h1>
					<h3>We welcome you here!!</h3>
				</section>
				<section className="intro-block">
					<div className="intro">
						<h4>Own a car?</h4>
						<p>Offer a ride to your collegues by just posting your regular commute, we will connect you with people on your route.</p>
						<Link      to="/create" className="btn-primary btn">Offer a Ride</Link>
					</div>
					<div className="intro">
						<h4>Dont own a car?</h4>
						<p>Take a ride with your collegue by just posting your regular commute, we will connect you with people on your route.</p>
						<Link to="/search" className="btn-primary btn">Take a Ride</Link>
					</div>
				</section>
				<h4 className="purpose">Share or Offer a ride to people and contribute to the traffic solution to your city through this small intiative. </h4>
			</div>

		);
	}
});

module.exports = HomePage;