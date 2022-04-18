import './video-card.css';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import {useNavigate} from 'react-router-dom';

const VideoCard = ({video}) => {
  const navigate = useNavigate();
  return (
    <div className="card" key={video._id} onClick={() => navigate(`/video/${video._id}`)}>
      <div className="img__container">
        <img src={`https://i.ytimg.com/vi/${video._id}/0.jpg`} className="responsive-img" />
      </div>
      <div className="d-flex items-center justify-between">
        <p className="card__title">{video.title}</p>
        <MoreVertOutlinedIcon />
      </div>
      <div className="card__description d-flex items-center justify-between">
        <p>{video.creator}</p>
        <p>{video.uploadedOn}</p>
      </div>
    </div>
  )
}
export { VideoCard };