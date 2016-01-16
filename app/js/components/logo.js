// logo.js

var React = require('react');

module.exports  = React.createClass({

  render: function() {
    return (
     <div>
        <img className="logo" src={this.props.url}/>
     </div>
    );
  }
});