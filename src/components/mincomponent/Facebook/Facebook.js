import React, { Component } from 'react';
import './Facebook.css';

export default class componentName extends Component {
  render() {
    return (
      <div>
        <iframe title="facebook" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnatureraisetechnologies%2F&tabs=timeline&width=400&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="400" height="500"
          scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </div>
    );
  }
}
