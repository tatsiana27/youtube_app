// result_carousel.js

var $ = require('jquery'),
  Bootstrap = require('bootstrap'),
  React = require('react'),
  Slider = require('react-slick');
  ResultVideo = require('./result_video');


module.exports = React.createClass({

  handleClick: function(video) {
   this.props.parentCallback(video);
  },

  render: function() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }

      ]
    };
    var self = this;

    return (
      <Slider {...settings}>
        {this.props.items.map(function(item, index) {
          return <ResultVideo key = {index} id = {item.id.videoId} url = {item.snippet.thumbnails.default.url} title = {item.snippet.title}  parentCallback={self.handleClick} />
        })}
      </Slider>
    );

  }
});