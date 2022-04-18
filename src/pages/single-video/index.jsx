import './single-video-page.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useParams } from "react-router-dom";
import { useData } from 'context';


const SingleVideo = () => {
  const {videoId}  = useParams();
  const {videoState:{videos}} = useData();
  const video = videos?.find(video => video._id === videoId);

  return video ? (
    <div className="body-section-wrapper d-flex flex-col px-8 py-8">
      <iframe 
        width="100%" 
        height="450px"
        src={`https://www.youtube.com/embed/${video._id}`} 
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="video-description">
        <p className="video-title">{video.title}</p>
        <div className="primary-info d-flex justify-between items-center">
          <div className="primary-info-text d-flex">
            <p className="text-sm">{video.creator}</p>
            <p className="text-sm">{video.uploadedOn}</p>
          </div>
          <div className="primary-info-btn d-flex items-center">
            <button className="action-button d-flex items-center justify-center"><ThumbUpOutlinedIcon className="icon"/> <span>Like</span></button>
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