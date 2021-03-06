import './video-card.css';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { PlaylistModal } from 'component';
import { addItemToWatchLater, removeItemFromWatchLater, addVideoToHistory, removeVideoFromHistory } from 'service';
import { removeVideoFromPlaylistHandler } from 'utils/playlistUtil';
import { useData, useAuth } from 'context';
import { useToast } from 'custom-hook/useToast';

const VideoCard = ({ video, playlistId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPlaylistCard = location.pathname.includes('playlist');
  const {
    videoDispatch, 
    videoState: { 
      watchlater, 
      history,
      playlists
     } 
  } = useData();
  const { auth: { isAuth } } = useAuth();
  const { showToast } = useToast();
  const [optionModal, setOptionalModal] = useState(false);
  const [playlistModalFocus, setPlaylistModalFocus] = useState(false); 

  const optionHandler = e => {
    e.stopPropagation();
    setOptionalModal(prevModalState => !prevModalState);
  }
  const isVideoInWatchLater = () => watchlater.find(item => item._id === video._id) ? true : false;
  const isVideoInHistory = () => history.find(item => item._id === video._id) ? true : false;
  const watchLaterIcon = isVideoInWatchLater() ? <DeleteOutlineOutlinedIcon style={{ fontSize: "1rem" }} /> : <WatchLaterOutlinedIcon style={{ fontSize: "1rem" }} />;

  const addToWatchLater = async video => {
    try {
      const { data: { watchlater } } = await addItemToWatchLater(video);
      videoDispatch({
        type: 'SET_WATCH_LATER',
        payload: {
          watchlater: watchlater
        }
      });
      showToast('Video added to watch later', 'success');
    } catch (error) {
      showToast('Could not add to watch later!', 'error');
      console.log(error.response.data);
    }
  }

  const removeFromWatchLater = async id => {
    try {
      const { data: { watchlater } } = await removeItemFromWatchLater(id);
      videoDispatch({
        type: 'SET_WATCH_LATER',
        payload: {
          watchlater: watchlater
        }
      });
      showToast('Video removed from watch later', 'success');
    } catch (error) {
      showToast('Could not remove from watch later!', 'error');
      console.log(error.response.data);
    }
  }

  const watchLaterHandler = e => {
    e.stopPropagation();
    isAuth
      ? isVideoInWatchLater() ? removeFromWatchLater(video._id) : addToWatchLater({ video: video })
      : navigate('/login', { replace: true, state: { from: location.pathname } });
  }

  const addToHistory = async video => {
    try {
      const { data: { history } } = await addVideoToHistory(video);
      videoDispatch({
        type: 'SET_HISTORY',
        payload: { history: history }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const removeFromHistoryHandler = async (e, id) => {
    e.stopPropagation();
    try {
      const { data: { history } } = await removeVideoFromHistory(id);
      videoDispatch({
        type: 'SET_HISTORY',
        payload: { history: history }
      });
      showToast('Video removed from history', 'success');
    } catch (error) {
      showToast('Could not remove from history!', 'error');
      console.log(error.response.data);
    }
  }

  const videoClickHandler = () => {
    navigate(`/video/${video._id}`);
    if (isAuth && !isVideoInHistory())
      addToHistory({ video: video })
  }

  const addToPlaylistHandler = e => {
    e.stopPropagation(); 
    if(isAuth) {
    setPlaylistModalFocus(true);
    setOptionalModal(false);
    } else{
      navigate('/login', { replace: true, state: { from: location.pathname } });
    }
  }

  const closePlaylistModal = () => {
    setPlaylistModalFocus(false);
  }

  const removeFromPlaylistHandler = () => {
    removeVideoFromPlaylistHandler(playlistId, playlists, video._id, videoDispatch, showToast);
  } 

  return (
    <div className="card" key={video._id} >
      <div className="img__container" onClick={() => videoClickHandler()}>
        <img src={`https://i.ytimg.com/vi/${video._id}/maxresdefault.jpg`} className="responsive-img" />
      </div>
      <div className="card__body d-flex items-center justify-between">
        <p className="card__title" onClick={() => videoClickHandler()}>{video.title}</p>
        <MoreVertOutlinedIcon onClick={e => optionHandler(e)} />
      </div>
      {optionModal && <div className="option-modal">
        {!isPlaylistCard && <div className={`option ${isVideoInWatchLater() ? 'text-danger' : ''} d-flex items-center`} 
          onClick={e => watchLaterHandler(e)}>
          {watchLaterIcon}
          {isVideoInWatchLater() ? 'Remove from Watch Later' : 'Add to Watch Later'}
        </div>}
        {!isPlaylistCard && <div 
          className="option d-flex items-center"
          onClick={e => addToPlaylistHandler(e)} 
        >
          <PlayCircleOutlineOutlinedIcon style={{ fontSize: "1rem" }} />
          Add to Playlist
        </div>}
       {location.pathname==='/history' && 
        <div className="option d-flex items-center text-danger" onClick={(e) => removeFromHistoryHandler(e, video._id)}>
          <DeleteOutlineOutlinedIcon style={{ fontSize: "1rem" }} />
          Remove from History
        </div>}
        {isPlaylistCard && <div className="option d-flex items-center text-danger"
          onClick={e => removeFromPlaylistHandler(e)}>
          <DeleteOutlineOutlinedIcon style={{ fontSize: "1rem" }}/>
          Remove from Playlist
        </div>}
      </div>}
      <div className="card__footer d-flex items-center justify-between">
        <p>{video.creator}</p>
        <p>{video.uploadedOn}</p>
      </div>
      {playlistModalFocus && <PlaylistModal closePlaylistModal={closePlaylistModal} video={video}/>}
    </div>
  )
}
export { VideoCard };