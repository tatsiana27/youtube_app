// header.js

var $ = require('jquery'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Nav = require('./nav'),
    Logo = require('./logo');

module.exports = React.createClass({

render: function() {
    return (
      <header>
        <Logo url = '../img/logo.png'/>
        <Nav items = { ['Home', 'About Us', 'Contact Us'] }/>
      </header>
    )
  }
});