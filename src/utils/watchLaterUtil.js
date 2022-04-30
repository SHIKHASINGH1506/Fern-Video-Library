import { addItemToWatchLater, removeItemFromWatchLater } from 'service';

const isVideoInWatchLater = (watchlater, id) => watchlater.find(item => item._id === id) ? true : false;

const removeFromWatchLater = async (id, videoDispatch, showToast) => {
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

const addToWatchLater = async (video, videoDispatch, showToast) => {
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

const watchLaterHandler = (e, watchlater, video, videoDispatch, navigate, location, showToast, isAuth) => {
  e.stopPropagation();
  isAuth
    ? isVideoInWatchLater(watchlater, video._id) ? removeFromWatchLater(video._id, videoDispatch, showToast) : addToWatchLater({ video: video }, videoDispatch, showToast)
    : navigate('/login', { replace: true, state: { from: location.pathname } });
}

export { watchLaterHandler };