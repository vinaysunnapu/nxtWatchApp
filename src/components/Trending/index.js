import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import Sidebar from '../Sidebar'
import TrendingVideoCard from '../TrendingVideoCard'

const apiTrendingDetailsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingApiStatus: apiTrendingDetailsConstants.initial,
    trendingVideosData: [],
  }

  componentDidMount() {
    this.trendingVideos()
  }

  onClickRetryRequest = () => {
    this.trendingVideos()
  }

  trendingVideos = async () => {
    this.setState({trendingApiStatus: apiTrendingDetailsConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channelName: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({
        trendingVideosData: updatedData,
        trendingApiStatus: apiTrendingDetailsConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiTrendingDetailsConstants.failure})
    }
  }

  renderTrendingVideosView = () => {
    const {trendingVideosData} = this.state
    return (
      <ul className="trending-list-container">
        <div className="trending-heading-container">
          <HiFire color="#ff0b37" size="30px" />
          <h1 className="trend-heading">Trending</h1>
        </div>
        {trendingVideosData.map(eachData => (
          <TrendingVideoCard
            trendingVideoDetails={eachData}
            key={eachData.id}
          />
        ))}
      </ul>
    )
  }

  renderTrendingLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="Hex: #3b82f6" height="50" width="100" />
    </div>
  )

  renderTrendingFailureView = () => (
    <div className="trending-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="trending-failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request please try again
      </p>
      <button
        type="button"
        className="trending-fail-retry-button"
        onClick={this.onClickRetryRequest}
      >
        Retry
      </button>
    </div>
  )

  renderTrendingVideos = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case apiTrendingDetailsConstants.success:
        return this.renderTrendingVideosView()
      case apiTrendingDetailsConstants.failure:
        return this.renderTrendingFailureView()
      case apiTrendingDetailsConstants.inProgress:
        return this.renderTrendingLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="trending-videos-bg-container">
          <Sidebar />
          {this.renderTrendingVideos()}
        </div>
      </>
    )
  }
}
export default Trending
