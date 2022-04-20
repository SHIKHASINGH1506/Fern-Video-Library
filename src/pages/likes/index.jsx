import './likes.css';
import { useData } from "context";
import { VideoCard } from "component";
import { useNavigate } from 'react-router';

const LikedVideos = () => {
  const navigate = useNavigate();
  const {videoState:{likedVideos}, drawer} = useData();
  return(
    <div className={`body-section-wrapper ${drawer ? 'disable-body' : ''} d-flex flex-col`}>
      <p className="px-8">Liked Videos {likedVideos?.length}</p>
      {likedVideos.length>0 ?
      <div className="video-list title px-8">
        {likedVideos.map(video => {
           return <VideoCard video={video} key={video._id} />
        })}
      </div>
      : <div className="message-wrapper d-flex flex-col justify-center items-center">
          <p>Looks like you haven't liked anything yet :(</p>
          <button class="bttn bttn-primary bttn-lg" onClick={() => navigate('/')}>Explore</button>
        </div>
      }
    </div>
  )
}
export { LikedVideos };