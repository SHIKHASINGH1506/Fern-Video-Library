import { useEffect } from 'react';
import { getHistoryVideos, removeAllVideoFromHistory } from 'service';
import { useData } from 'context';  
import { VideoCard } from "component";
import { useNavigate } from 'react-router';
import { useToast } from 'custom-hook/useToast';


const History = () => {
  const navigate = useNavigate();
  const {showToast} = useToast();
  const {setLoading, drawer, videoDispatch, videoState:{history}} = useData();
  
  const getAllVideos = async () => {
    try{
    setLoading(true);
    const {data: {history}} = await getHistoryVideos();
    videoDispatch({type: 'SET_HISTORY', payload: {history: history}});
    setLoading(false);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => getAllVideos(), []);

  const clearHistoryHandler = async () => {
    try{
      const{data:{history}} = await removeAllVideoFromHistory();
      videoDispatch({type: 'SET_HISTORY', payload: {history: history}});
      showToast('History cleared', 'success');
    }catch(error){
      showToast('Could not clear history', 'error');
      console.log(error.response.data);
    }
  }

  return (
    <div className={`body-section-wrapper ${drawer ? 'disable-body' : ''} d-flex flex-col`}>
      <div className='page-title px-8 d-flex justify-between'>
        <p>History {history?.length}</p>
        {history.length>0 && <button className='bttn bttn-danger' onClick={() => clearHistoryHandler()}>Clear History</button>}
      </div>
      
      {history.length>0 ?
      <div className="video-list px-8">
        {history.map(video => {
           return <VideoCard video={video} key={video._id} />
        })}
      </div>
      : <div className="message-wrapper d-flex flex-col justify-center items-center">
          <p>You have not watched any videos yet :(</p>
          <button class="bttn bttn-primary bttn-lg" onClick={() => navigate('/')}>Explore</button>
        </div>
      }
    </div>
  )
}

export { History };