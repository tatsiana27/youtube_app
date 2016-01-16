// container.js

var $ = require('jquery'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Player = require('./player'),
    Search = require('./search'),
    PopularVideos = require('./popular_videos'),
    Carousel = require('./carousel');



module.exports = React.createClass({
  getInitialState: function() {
    return { clicked: false,
             currentVideo: [{
               id: 'HTL3dDsGP7M',
               title: 'Top 10 cartoons 2015!'
             }]
            };
  },
  onVideoChanged: function(video) {

    this.setState({
      clicked: true,
      currentVideo: [{
        id: video.id,
        title: video.title}]
    });
  },

  render: function() {
    var   data =  [{
          key: 'AIzaSyCw_esIizM0zULkoQlpjLUb0jQ25qBr3eI',
          type: 'video',
          maxResults: 50,
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle'
        }],
      searchTerm = 'The most popular cartoons 2015';
    return (
      <div className="container">
        <div className="row">
          <Search url = 'https://www.googleapis.com/youtube/v3/search' params = {data} term = {searchTerm} callbackParent={this.onVideoChanged}/>
        </div>
        <div className="row player">
          <Player  player = 'placeholder' history = {this.state.currentVideo} changed = {this.state.clicked}/>
        </div>
        <div className="row">
          <Carousel/>
        </div>
        <div className="row">
          <PopularVideos source = '../data/popularVideos.json' title = 'The most popular videos' callbackParent={this.onVideoChanged}/>
        </div>

      </div>
    )
  }
});