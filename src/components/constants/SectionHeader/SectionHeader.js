import React, { Component } from 'react';
import './SectionHeader.css'

export default class SectionHeader extends Component {
  render() {
    return (
      
      <div>

          <div className={this.props.about_banner}>
          <div className="about_overlay"></div>
          <div className="about_title">
            <h3>{this.props.section_title}</h3>
           <div className="about_subtitles"> <small>Home</small> <i class="fa fa-angle-right" aria-hidden="true"></i> <small>{this.props.section_subtitle}</small></div>
          </div>
        </div>
      </div>
    );
  }
}
