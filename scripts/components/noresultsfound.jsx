import React from 'react';

var NoResultFound = React.createClass({
  render: function(){
    return (
      <div className="no-results">
        <h4>No results Found</h4>
        <p>You can post a fresh request and we will notify you when there is a pooler avilable on the same route.</p>
      </div>
    );
  }
});

module.exports = NoResultFound;

