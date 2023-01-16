import {Component} from 'react'
import ReactPlayer from 'react-player'

import './index.css'

class VideoPlayer extends Component {
  render() {
    const {videoData} = this.props
    return (
      <div className="video-player-container">
        <ReactPlayer
          url={videoData.videoUrl}
          controls
          width="100%"
          height="70vh"
        />
      </div>
    )
  }
}
export default VideoPlayer
