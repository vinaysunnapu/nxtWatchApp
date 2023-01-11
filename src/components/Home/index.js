import './index.css'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import NxtWatchContext from '../../context/nxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Banner from '../Banner'

const Home = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, searchInput, changeSearchInput, isShownBanner} = value

      const homeBgClassName = isDarkTheme ? 'home-bg-dark' : 'home-bg-light'

      const getHomeVideos = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const url = 'https://apis.ccbp.in/videos/all?search='
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
        }
      }

      getHomeVideos()

      return (
        <>
          <Header />
          <div className="home-main-bg-container">
            <Sidebar />
            <div className={`home-bg-container ${homeBgClassName}`}>
              {isShownBanner && <Banner isDarkTheme={isDarkTheme} />}
              <div className="Search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-element"
                />
                <button type="button" className="search-button">
                  <BiSearch />
                </button>
              </div>
            </div>
          </div>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default Home
