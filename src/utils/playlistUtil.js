import { removeVideoFromPlaylist } from 'service';

const removeVideoFromPlaylistHandler = async (playlistId, playlists, videoId, videoDispatch, showToast)  => {
  try{
    const { data: { playlist }} = await removeVideoFromPlaylist(playlistId, videoId);
    videoDispatch({
      type: 'SET_PLAYLISTS',
      payload: {
        playlists: playlists.map( item => item._id === playlistId ? playlist : item)
      }
    });
    showToast('Video removed from playlist successfully!', 'success');
  }catch(error){
    console.log(error);
  }
}

export { removeVideoFromPlaylistHandler };