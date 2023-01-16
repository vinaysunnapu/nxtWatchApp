import './index.css'
import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

const TrendingVideoCard = props => {
  const {trendingVideoDetails} = props
  const {
    channelName,
    profileImageUrl,
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = trendingVideoDetails

  console.log(trendingVideoDetails)

  const publishedBy = formatDistanceToNow(new Date(publishedAt))

  return (
    <li className="trending-list-item">
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-thumbnail-image"
        />
      </Link>
      <div className="trending-content-container">
        <p className="trending-heading">{title}</p>
        <p>{channelName}</p>
        <p>{viewCount}</p>
        <p className="trending-date">{publishedBy} ago</p>
      </div>
    </li>
  )
}
export default TrendingVideoCard
