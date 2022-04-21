import { useEffect } from 'react';
import { getWatchLaterItems } from 'service';
import { useData } from 'context';  
import { VideoCard } from "component";
import { useNavigate } from 'react-router';

const WatchLater = () => {
  const navigate = useNavigate();
  const {setLoading, drawer, videoDispatch, videoState:{watchlater}} = useData();
  
  const getAllVideos = async () => {
    try{
    setLoading(true);
    const {data: {watchlater}} = await getWatchLaterItems();
    videoDispatch({type: 'SET_WATCH_LATER', payload: {watchlater: watchlater}});
    setLoading(false);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => getAllVideos(), []);

  return(
    <div className={`body-section-wrapper ${drawer ? 'disable-body' : ''} d-flex flex-col`}>
      <p className="page-title px-8">Watch Later {watchlater?.length}</p>
      {watchlater.length>0 ?
      <div className="video-list px-8">
        {watchlater.map(video => {
           return <VideoCard video={video} key={video._id} />
        })}
      </div>
      : <div className="message-wrapper d-flex flex-col justify-center items-center">
          <p>You have no videos to watch later :(</p>
          <button class="bttn bttn-primary bttn-lg" onClick={() => navigate('/')}>Explore</button>
        </div>
      }
    </div>
  )
}
export { WatchLater };