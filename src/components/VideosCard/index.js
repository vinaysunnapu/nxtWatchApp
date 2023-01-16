import './index.css'
import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import VideoDetails from '../VideoDetails'

const VideosCard = props => {
  const {videoDetails} = props
  const {
    name,
    profileImageUrl,
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails

  const publishTime = formatDistanceToNow(new Date(publishedAt))

  return (
    <Link to={`/videos/${id}`}>
      <li className="videos-card-list-items">
        <img
          src={thumbnailUrl}
          className="thumbnail-image"
          alt="video thumbnail"
        />
        <div className="videos-card-profile-container">
          <img
            src={profileImageUrl}
            className="profile-image"
            alt="channel logo"
          />
          <div className="profile-content-container">
            <p>{title}</p>
            <p>{name}</p>
            <p>{viewCount}</p>
            <p>{publishTime}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default VideosCard
