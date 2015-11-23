import React from 'react';
import CommentBox from './commentBox';

var ComForm = React.createClass({
  render() {
    return (
    	<div className="commentform">
    		<CommentBox url="../../api/comments" config="form"/>
    	</div>
    )
  }
});

module.exports = ComForm;