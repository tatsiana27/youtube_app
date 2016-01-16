// player.js

var $ = require('jquery'),
  React = require('react');


module.exports = React.createClass({
  getInitialState: function() {
    return {

        ready: false,
        player: null,
        playerId: null,
        videoId: null,
        videoTitle: null,
        playerHeight: '360',
        playerWidth: '640',
        state: 'stopped',
        title: null
      }

  },

  componentDidMount: function() {
    var self = this;
    window.onYouTubeIframeAPIReady = function () {
      console.log('Youtube API is ready');
      self.setState({ready: true});

      self.bindPlayer(self.props.player);
      self.loadPlayer();

    };
  },

  bindPlayer: function(elementId) {
    console.log('Bind Player')
    this.setState({playerId: elementId});

  },

  loadPlayer: function() {
    console.log('Load Player')
    if (this.state.ready && this.state.playerId) {
      if (this.state.player) {
        this.state.player.destroy();
      }
      this.state.player = this.createPlayer();
    }
  },

  createPlayer: function() {
    var self = this;
    console.log('Create Player')

    return new YT.Player(self.state.playerId, {
      title: self.state.videoTitle,
      height: self.state.playerHeight,
      width: self.state.playerWidth,
      playerVars: {
        rel: 0,
        showinfo: 0
      },
      events: {
        'onReady': function() {
          self.onYoutubeReady(self);
        },
        'onStateChange': function(e) {
          self.onYoutubeStateChange(e, self);
        }
      }
    });
  },

  onYoutubeReady: function(self) {
    console.log('On Youtube Ready')
    var history = this.props.history[0];

    this.state.player.cueVideoById(history.id);
    this.setState({videoId: history.id});
    this.setState({videoTitle: history.title});

  },

  onYoutubeStateChange: function(event, self) {
    if (event.data == YT.PlayerState.PLAYING) {
      this.setState.state = 'playing';
    } else if (event.data == YT.PlayerState.PAUSED) {
      this.setState.state = 'paused';
    } else if (event.data == YT.PlayerState.ENDED) {
      this.setState.state = 'ended';
      //service.launchPlayer(upcoming[0].id, upcoming[0].title);
      //service.archiveVideo(upcoming[0].id, upcoming[0].title);
      //service.deleteVideo(upcoming, upcoming[0].id);
    }
  },

  launchPlayer: function(video) {
    this.state.player.loadVideoById(video.id);
  },

  render: function() {
    if (this.props.changed) {
      this.launchPlayer(this.props.history[0]);
    }
      return (
        <div className="col-md-12 player">
          <h2 className="title">{this.props.history[0].title}</h2>
          <div id="placeholder"></div>
        </div>
      )
  }
});