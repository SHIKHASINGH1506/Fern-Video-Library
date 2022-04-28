import { useData } from 'context';  
import { VideoCard } from "component";
import { useParams, useNavigate } from 'react-router-dom';

const PlaylistItems = () => {
  const {
    setLoading, 
    drawer, 
    videoState:{playlists}
  } = useData();
  const navigate = useNavigate();
  const {playlistId} = useParams();
  const videos = playlists.find( playlist => playlist._id === playlistId).videos;
  const hasPlaylistItems = videos?.length > 0;
  
  return(
    <div className={`body-section-wrapper ${drawer ? 'disable-body' : ''} d-flex flex-col`}>
    <p className="page-title px-8">Videos {hasPlaylistItems}</p>
    {hasPlaylistItems ?
    <div className="video-list px-8">
     { videos.map( video => {
        return <VideoCard video = {video} playlistId={playlistId} key={video._id}/>
      })}
    </div>
    : <div className="message-wrapper d-flex flex-col justify-center items-center">
        <p>You have no videos in your playlist :(</p>
        <button class="bttn bttn-primary bttn-lg" onClick={() => navigate('/')}>Explore</button>
      </div>
    }
  </div>
  )
}

export { PlaylistItems };