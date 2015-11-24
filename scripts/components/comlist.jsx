import React from 'react';
import CommentBox from './commentBox';

var ComList = React.createClass ({
  render() {
    return (
   	  <div> 	
      	<CommentBox url="/api/comments" config="list"/>
      </div>
    )
  }
});

module.exports = ComList;

