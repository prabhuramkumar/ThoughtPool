import React from 'react';
import { Link } from 'react-router';

var NoResultFound = React.createClass({
  render: function(){
    return (
      <div className="no-results">
        <h4>No results Found</h4>
        <p>You can post a fresh request using the <Link to="/create" query={{route: this.props.route}}>Post</Link> form and we will notify you when there is a pooler avilable on the same route.</p>
      </div>
    );
  }
});

module.exports = NoResultFound;