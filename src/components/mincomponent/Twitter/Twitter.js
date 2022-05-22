import React, { Component } from 'react';

export default class componentName extends Component {


    
  componentDidMount()
  {
   
     this.Twitter();
     if (window.twttr) {
      window.twttr.widgets.load();
    }
}

 Twitter = () => (
  <a class="twitter-timeline" href="https://twitter.com/Azacusdb?ref_src=twsrc%5Etfw">Tweets by Azacusdb</a> 
);
  render() {



    return (
      <div>
            {this.Twitter()}
      </div>
    );
  }
}
