import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import NxtWatchContext from '../../context/nxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Banner from '../Banner'
import VideosCard from '../VideosCard'

const homeVideosApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isShowBanner: true,
    isDarkTheme: false,
    videosData: [],
    videosApiStatus: homeVideosApiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  onRemoveBanner = () => {
    this.setState({isShowBanner: false})
  }

  onClickRetryRequest = () => {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {searchInput} = this.state
    this.setState({videosApiStatus: homeVideosApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        videosData: updatedData,
        videosApiStatus: homeVideosApiStatusConstants.success,
      })
    } else {
      this.setState({videosApiStatus: homeVideosApiStatusConstants.failure})
    }
  }

  renderHomeLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="Hex: #3b82f6" height="50" width="100" />
    </div>
  )

  renderHomeFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="home-failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request please try again
      </p>
      <button
        type="button"
        className="home-fail-retry-button"
        onClick={this.onClickRetryRequest}
      >
        Retry
      </button>
    </div>
  )

  renderHomeVideosView = () => {
    const {videosData} = this.state
    const shouldShowVideosList = videosData.length > 0

    return shouldShowVideosList ? (
      <ul className="videos-list-container">
        {videosData.map(eachVideo => (
          <VideosCard videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    ) : (
      <div className="results-not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="results-not-found-image"
        />
        <h1 className="results-not-found-heading">No Search results found</h1>
        <p className="results-not-found-para">
          Try different key words or remove search filter
        </p>
        <button type="button" className="home-retry-button">
          Retry
        </button>
      </div>
    )
  }

  onSearchButton = () => {
    this.getHomeVideos()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getHomeVideos()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderHomeVideos = () => {
    const {videosApiStatus} = this.state

    switch (videosApiStatus) {
      case homeVideosApiStatusConstants.success:
        return this.renderHomeVideosView()
      case homeVideosApiStatusConstants.failure:
        return this.renderHomeFailureView()
      case homeVideosApiStatusConstants.inProgress:
        return this.renderHomeLoadingView()
      default:
        return null
    }
  }

  render() {
    const {isShowBanner, isDarkTheme, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="home-main-bg-container">
          <Sidebar />
          <div className="home-bg-container">
            {isShowBanner && (
              <Banner
                isDarkTheme={isDarkTheme}
                onRemoveBanner={this.onRemoveBanner}
              />
            )}
            <div className="Search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-element"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSearchButton}
                data-testid="searchButton"
              >
                <BiSearch />
              </button>
            </div>
            <div className="home-videos-container">
              {this.renderHomeVideos()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
