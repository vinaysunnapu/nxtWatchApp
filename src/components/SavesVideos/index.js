import {Component} from 'react'
import './index.css'

import Header from '../Header'
import Sidebar from '../Sidebar'

class SavedVideos extends Component {
  state = {savedVideos: []}

  render() {
    const {savedVideos} = this.state
    const isSaved = savedVideos.length > 0
    return (
      <>
        <Header />
        <div className="saved-videos-bg-container">
          <Sidebar />
          <div className="saved-videos-container">
            {isSaved ? (
              <div>saved videos</div>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="no-saved-videos-image"
                />
                <h1>No saved videos found</h1>
                <p>You can save your videos while watching them</p>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default SavedVideos
