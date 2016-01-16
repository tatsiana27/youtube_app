// app.js

var $ = require('jquery'),
  React = require('react'),
  ReactDOM = require('react-dom'),
  Header = require('./header'),
  Container = require('./container');

module.exports = React.createClass({

  render: function() {
    return (
      <div id="background_holder">
        <Header/>
        <Container/>
      </div>
    )
  }
});