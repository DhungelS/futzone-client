import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

export class Highlights extends Component {

 

  componentDidMount() {
    this.props.getHighlightVids(this.props.matchSelected)

  }
  

  resultsEle() {
    if(this.props.highlights){

    const thumbnails = this.props.highlights.map(vid => {
      return vid.snippet.thumbnails.medium.url;
    });
    const videoIds = this.props.highlights.map(vid => {
      return vid.id.videoId;
    });

    const videos = thumbnails.map((thumbnail=thumbnails, index) => {
      return (<li className="highlights"><a href={'https://www.youtube.com/watch?v='+ videoIds[index]}><img src = {thumbnail} alt = 'youtube thumbnail'/></a></li>)
      
    });
    return videos;

    
  }
 
  }


  render() {


    return(
      <div>
      {this.resultsEle()}
      <h1>Hello</h1>
      </div>
    )
    
  }
 
}


const mapStateToProps = state => ({
  highlights: state.highlights.highlightVids
});

export default connect(mapStateToProps, actions)(Highlights);
