import React from 'react';

var NoMyPoolsFound = React.createClass({
  render: function(){
    return (
      <div className="no-results">
        <h4>Oops! You do not have any pools created yet</h4>
      </div>
    );
  }
});

module.exports = NoMyPoolsFound;