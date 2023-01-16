import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'
import {AiFillLike, AiFillDislike, AiFillSave} from 'react-icons/ai'
import NxtWatchContext from '../../context/nxtWatchContext'

import './index.css'

import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoPlayer from '../VideoPlayer'

const apiVideoDetailsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoData extends Component {
  state = {
    apiVideoStatus: apiVideoDetailsConstants.initial,
    videoData: {},
    isLiked: false,
    isDisLiked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  onClickRetryRequest = () => {
    this.getVideoData()
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: false,
    }))
  }

  onClickDisLike = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: false,
    }))
  }

  onClickSave = () => {
    this.setState(prevState => ({isSaved: !prevState.isSaved}))
  }

  getVideoData = async () => {
    this.setState({apiVideoStatus: apiVideoDetailsConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const d = data.video_details
      const updatedData = {
        channelName: d.channel.name,
        profileImageUrl: d.channel.profile_image_url,
        subscriberCount: d.channel.subscriber_count,
        description: d.description,
        id: d.id,
        publishedAt: d.published_at,
        thumbnailUrl: d.thumbnail_url,
        title: d.title,
        videoUrl: d.video_url,
        viewCount: d.view_count,
      }
      this.setState({
        videoData: updatedData,
        apiVideoStatus: apiVideoDetailsConstants.success,
      })
    } else {
      this.setState({apiVideoStatus: apiVideoDetailsConstants.failure})
    }
  }

  renderVideoLoadingView = () => (
    <div className="video-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="Hex: #3b82f6" height="50" width="100" />
    </div>
  )

  renderVideoFailureView = () => (
    <div className="video-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="video-failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request please try again
      </p>
      <button
        type="button"
        className="video-fail-retry-button"
        onClick={this.onClickRetryRequest}
      >
        Retry
      </button>
    </div>
  )

  renderVideoDetailsView = () => {
    const {videoData, isLiked, isDisLiked, isSaved} = this.state
    const {publishedAt} = videoData
    // const time = formatDistanceToNow(new Date(publishedAt))

    const likeColorClassName = isLiked && 'like-color'
    const disLikeColorClassName = isDisLiked && 'dis-like-color'
    const isSavedClassName = isSaved && 'like-color'
    const savedText = isSaved ? 'Saved' : 'Save'

    return (
      <div className="video-data-bg-container">
        <VideoPlayer videoData={videoData} />
        <p>{videoData.title}</p>
        <div className="views-container">
          <p>
            {videoData.viewCount}
            <span> {publishedAt}</span>
          </p>
          <div>
            <button
              type="button"
              className={`like-button ${likeColorClassName}`}
              onClick={this.onClickLike}
            >
              <AiFillLike />
              Like
            </button>
            <button
              type="button"
              className={`like-button ${disLikeColorClassName}`}
              onClick={this.onClickDisLike}
            >
              <AiFillDislike />
              Dislike
            </button>
            <button
              type="button"
              className={`like-button ${isSavedClassName}`}
              onClick={this.onClickSave}
            >
              <AiFillSave />
              {savedText}
            </button>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="bottom-container">
          <img
            src={videoData.profileImageUrl}
            alt="channel logo"
            className="profile-image"
          />
          <div>
            <p>{videoData.channelName}</p>
            <p>{videoData.subscriberCount} subscribers</p>
            <p>{videoData.description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderVideoDetails = () => {
    const {apiVideoStatus} = this.state

    switch (apiVideoStatus) {
      case apiVideoDetailsConstants.success:
        return this.renderVideoDetailsView()
      case apiVideoDetailsConstants.failure:
        return this.renderVideoFailureView()
      case apiVideoDetailsConstants.inProgress:
        return this.renderVideoLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="video-data-main-bg-container">
          <Sidebar />
          {this.renderVideoDetails()}
        </div>
      </>
    )
  }
}
export default VideoData
