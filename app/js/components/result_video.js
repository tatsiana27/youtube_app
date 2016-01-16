// result_video.js

var $ = require('jquery'),

  React = require('react');


module.exports = React.createClass({
  getInitialState: function () {
    return {clicked: this.props.clicked};
  },

  onPlayVideo: function(event) {
    var $video = $(event.target).parent(),
        idVideo = $video.data(('idItem')),
        titleVideo = $video.find('.title').text();

    this.props.parentCallback({
      id: idVideo,
      title: titleVideo
    });
  },

  render: function () {
    return (
      <div className="slick-slide">
        <a  href="#"  className="item" data-id-item = {this.props.id} onClick={this.onPlayVideo}>
          <img src = {this.props.url}/>
          <h2 className="title">{this.props.title}</h2>
        </a>
      </div>
    );
  }
});