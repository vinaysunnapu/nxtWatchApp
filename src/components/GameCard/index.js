import {Link} from 'react-router-dom'
import './index.css'

const GameCard = props => {
  const {gameDetails} = props
  const {id, thumbnailUrl, title, viewCount} = gameDetails
  return (
    <li className="game-list-item">
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="game-thumbnail-image"
        />
      </Link>
      <p>{title}</p>
      <p>{viewCount} Watching Worldwide</p>
    </li>
  )
}
export default GameCard
