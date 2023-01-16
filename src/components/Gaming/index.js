import {Component} from 'react'
import './index.css'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GameCard from '../GameCard'

const gameVideosApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gamingData: [], gameApiStatus: gameVideosApiStatusConstants.initial}

  componentDidMount() {
    this.getGameVideos()
  }

  onClickRetryRequest = () => {
    this.getGameVideos()
  }

  getGameVideos = async () => {
    this.setState({gameApiStatus: gameVideosApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/gaming'
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
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({
        gamingData: updatedData,
        gameApiStatus: gameVideosApiStatusConstants.success,
      })
    } else {
      this.setState({gameApiStatus: gameVideosApiStatusConstants.failure})
    }
  }

  renderGameVideosView = () => {
    const {gamingData} = this.state
    return (
      <div className="game-bg-container">
        <div className="Game-heading-container">
          <SiYoutubegaming color="#ff0b37" size="30" />
          <h1 className="game-heading">Gaming</h1>
        </div>
        <ul className="game-list-container">
          {gamingData.map(eachGame => (
            <GameCard gameDetails={eachGame} key={eachGame.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderGameFailureView = () => (
    <div className="game-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="game-failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request please try again
      </p>
      <button
        type="button"
        className="game-fail-retry-button"
        onClick={this.onClickRetryRequest}
      >
        Retry
      </button>
    </div>
  )

  renderGameLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="Hex: #3b82f6" height="50" width="100" />
    </div>
  )

  renderGamingVideos = () => {
    const {gameApiStatus} = this.state

    switch (gameApiStatus) {
      case gameVideosApiStatusConstants.success:
        return this.renderGameVideosView()
      case gameVideosApiStatusConstants.failure:
        return this.renderGameFailureView()
      case gameVideosApiStatusConstants.inProgress:
        return this.renderGameLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="gaming-videos-bg-container">
          <Sidebar />
          {this.renderGamingVideos()}
        </div>
      </>
    )
  }
}

export default Gaming
