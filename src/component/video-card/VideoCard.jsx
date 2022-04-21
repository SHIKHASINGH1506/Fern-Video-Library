import './video-card.css';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { addItemToWatchLater, removeItemFromWatchLater } from 'service';
import { useData, useAuth } from 'context';
import { useToast } from 'custom-hook/useToast';

const VideoCard = ({video}) => {
  const navigate = useNavigate();
  const { videoDispatch, videoState:{watchlater}} = useData();
  const { auth:{isAuth} } = useAuth();
  const { showToast } = useToast();
  const [optionModal, setOptionalModal] = useState(false);
  const optionHandler = e =>{
    e.stopPropagation();
    setOptionalModal(prevModalState => !prevModalState);
  }
  const isVideoInWatchLater = () => watchlater.find(item => item._id === video._id) ? true : false;
  const watchLaterIcon = isVideoInWatchLater() ? <DeleteOutlineOutlinedIcon style={{fontSize: "1rem"}}/> : <WatchLaterOutlinedIcon style={{fontSize: "1rem"}}/>;

  const addToWatchLater = async (video) => {
    try{
      const{data:{watchlater}} = await addItemToWatchLater(video);
      videoDispatch({
        type: 'SET_WATCH_LATER', 
        payload: {
          watchlater:watchlater
        }
      });
      showToast('Video added to watch later', 'success');
    }catch(error){
      showToast('Could not add to watch later!', 'error');
      console.log(error.response.data);
    }
  }
  const removeFromWatchLater = async (id) => {
    try{
      const{data:{watchlater}} = await removeItemFromWatchLater(id);
      videoDispatch({
        type: 'SET_WATCH_LATER', 
        payload: {
          watchlater:watchlater
        }
      });
      showToast('Video removed from watch later', 'success');
    }catch(error){
      showToast('Could not remove from watch later!', 'error');
      console.log(error.response.data);
    }
  }

  const watchLaterHandler = (e) => {
    e.stopPropagation();
    isAuth
      ? isVideoInWatchLater() ? removeFromWatchLater(video._id) : addToWatchLater({video: video})
      : navigate('/login', {replace: true, state:{from : location.pathname}});
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
        <div className= {`option ${isVideoInWatchLater() ? 'text-danger' : ''} d-flex items-center`} onClick={e => watchLaterHandler(e)}>
          {watchLaterIcon}
          {isVideoInWatchLater() ? 'Remove from Watch Later' : 'Add to Watch Later'}
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