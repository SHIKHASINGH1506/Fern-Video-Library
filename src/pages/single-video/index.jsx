import './single-video-page.css';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useData } from 'context';
import { addItemToLikedVideos, deleteItemFromLikedVideos } from 'service';

const SingleVideo = () => {
  const {videoId}  = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    loading,
  videoState:{
    videos, 
    likedVideos
  }, 
  videoDispatch
  } = useData();

  const video = videos?.find(video => video._id === videoId);

  const isVideoLiked = () => likedVideos?.find(video => video._id === videoId) === undefined ? false :  true;
  const videoLikeDislikeIcon = isVideoLiked() ? <ThumbDownOutlinedIcon className="icon"/> : <ThumbUpOutlinedIcon className="icon"/>;
  const videoLikeDislikeText = isVideoLiked() ? 'Dislike' : 'Like';

  const addToLikedVideos = async () => {
    try{
      const {data:{likes}} = await addItemToLikedVideos({video:video});
      videoDispatch({
        type: 'SET_LIKED_VIDEOS', 
        payload: {
          likedVideos: likes
      }});
    }
    catch(error){
      console.log(error.message);
    }
  }

  const deleteFromLikedVideos = async () => {
    try{
      const{data:{likes}} = await deleteItemFromLikedVideos(videoId);
      videoDispatch({
        type: 'SET_LIKED_VIDEOS', 
        payload: {
          likedVideos: likes
      }});

    }catch(error){
      console.log(error.response);
    }
  }

  const likeVideoHandler = () => {
    const token = localStorage.getItem('token');
    token
      ? isVideoLiked() ? deleteFromLikedVideos() : addToLikedVideos(video)
      : navigate('/login', {replace: true, state:{from : location.pathname}});
  }

  return video ? (
    <div className="body-section-wrapper single-video-wrapper d-flex flex-col px-8 py-8">
      <iframe 
        width="100%" 
        height="450px"
        src={`https://www.youtube.com/embed/${video._id}`} 
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="video-description">
        <p className="video-title">{video.title}</p>
        <div className="primary-info d-flex">
          <div className="primary-info-text d-flex">
            <p className="text-sm">{video.creator}</p>
            <p className="text-sm">{video.uploadedOn}</p>
          </div>
          <div className="primary-info-btn d-flex items-center">
            <button 
              className="action-button d-flex items-center justify-center"
              onClick={() => likeVideoHandler()}>
              {videoLikeDislikeIcon} <span>{videoLikeDislikeText}</span>
            </button>
            <button className="action-button d-flex items-center justify-center"><WatchLaterOutlinedIcon className="icon"/><span>Watch Later</span></button>
            <button className="action-button d-flex items-center justify-center"><FileCopyOutlinedIcon className="icon"/> <span>Copy</span></button>
            <button className="action-button d-flex items-center justify-center"><PlaylistAddIcon className="icon"/> <span>Save</span></button>
          </div>
        </div>
      </div>
      <div className="video-secondary-description">
        <p>{video.description}</p>
      </div>
    </div>

  )
  : <></>
}

export { SingleVideo };