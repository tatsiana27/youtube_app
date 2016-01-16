// popular_videos.js

var $ = require('jquery'),
  React = require('react');


module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    var self = this,
        url = this.props.source;


    $.getJSON(url, function(result){

      if(!result || !result.length){
        return;
      }

      self.setState({ data: result });

    });

  },

  render: function() {
    var data = this.state.data;

    return (
      <div className="col-md-12 popular_videos">
        <h3 className="title">{this.props.title}</h3>
        <ul className="nav">
        {data.map(function(item, index) {
         return <VideoItem  key = {index} id = {item.id.videoId} title = {item.snippet.title} img = {item.snippet.thumbnails.default.url} description = {item.snippet.description} />
        })}
        </ul>

      </div>
    )
  }
});

var VideoItem = React.createClass ({
  render: function(){
    return (
     <li className="col-sm-6 col-md-4">
       <a className="thumbnail"data-id-item={this.props.id}>
          <img src={this.props.img}/>
          <div className="caption">
            <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
          </div>
        </a>
     </li>
    )
  }
});