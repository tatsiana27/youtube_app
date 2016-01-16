// search.js
var React = require('react'),
    $ = require('jquery'),
    ResultCarousel = require('./result_carousel');

module.exports  = React.createClass({
  getInitialState: function(){
    return {
      searchString: this.props.term,
      items: []
    };
  },

  handleChange: function(e){

    // Если вы закомментируете данную строку, поле ввода не изменит свое значение.
    // Это потому, что в React'е, поле не может измениться независимо от свойства
    // которое было ему присвоено. В нашем случае, это this.state.searchString.

    this.setState({searchString:e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.searchVideos();
  },

  searchVideos: function() {
    var url = this.props.url,
      params = this.props.params[0];

    url = url + '?fields=' + params.fields + '&key=' + params.key  + '&maxResults=' + params.maxResults + '&part=' + params.part + '&type=' + params.type;

    var self = this;
    $.getJSON(url + '&q=' + this.state.searchString, function(result){
      if(result.items.length > 0) {
        self.setState({items: result.items});
      }
    });
  },

  onPlayVideo: function(video) {
    this.props.callbackParent(video);
  },

  render: function() {
    this.searchVideos();
    if (this.state.items !== 0) {
      return (
        <div className="col-md-12">
          <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
            <input id="query" name="q" type="text" className="form-control" onChange={this.handleChange} placeholder="Search..."/>
            <input className="btn btn-default" id="submit" type="submit" value=""/>
          </form>
          <ResultCarousel items = {this.state.items} parentCallback = {this.onPlayVideo} />
        </div>
      );
    } else {
      return (
        <div className="col-md-12">
          <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
            <input id="query" name="q" type="text" className="form-control" onChange={this.handleChange} placeholder="Search..."/>
            <input className="btn btn-default" id="submit" type="submit" value=""/>
          </form>
        </div>
      );
    }


  }
});

