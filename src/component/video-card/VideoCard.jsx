import './video-card.css';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const VideoCard = ({video}) => {
  const navigate = useNavigate();
  const [optionModal, setOptionalModal] = useState(false);
  const optionHandler = e =>{
    e.stopPropagation();
    setOptionalModal(prevModalState => !prevModalState);
  }
  return (
    <div className="card" key={video._id} onClick={() => navigate(`/video/${video._id}`)}>
      <div className="img__container">
        <img src={`https://i.ytimg.com/vi/${video._id}/0.jpg`} className="responsive-img" />
      </div>
      <div className="card__body d-flex items-center justify-between">
        <p className="card__title">{video.title}</p>
        <MoreVertOutlinedIcon onClick={e => optionHandler(e)}/>
      </div>
     {optionModal && <div className="option-modal">
        <div className="option d-flex items-center">
          <WatchLaterOutlinedIcon style={{fontSize: "1rem"}}/>
          Add to Watch Later
        </div>
        <div className="option d-flex items-center">
          <PlayCircleOutlineOutlinedIcon style={{fontSize: "1rem"}}/>
          Add to Playlist
        </div>
      </div>}
      <div className="card__footer d-flex items-center justify-between">
        <p>{video.creator}</p>
        <p>{video.uploadedOn}</p>
      </div>
    </div>
  )
}
export { VideoCard };