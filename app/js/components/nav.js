// nav.js
var $ = require('jquery'),
    React = require('react');

module.exports  = React.createClass({
  getInitialState: function(){
    return { active: 0 };
  },

  clicked: function(index){

    // Обработчик клика обновит состояние
    // изменив индекс на сфокусированный элемент меню

    this.setState({active: index});
  },

  onClick: function(){
    event.preventDefault();
  },

  render: function() {
    var self = this;

    return (
      <ul className ="nav nav-pills">
      {this.props.items.map(function(m, index) {
        var style = '';

        if(self.state.active == index){
          style = 'active';
        }

        return <li  key={index} className={style}  role="presentation" onClick={self.clicked.bind(self, index)}><a onClick={this.onClick} href="#">{m}</a></li>
      })}

      </ul>
    );
  }
});