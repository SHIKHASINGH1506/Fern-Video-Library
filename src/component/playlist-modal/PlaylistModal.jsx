import './playlist.css';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addNewPlaylist, addVideoToPlaylist } from 'service';
import { removeVideoFromPlaylistHandler } from 'utils/playlistUtil';
import { useData } from 'context';
import { useToast } from 'custom-hook/useToast';

const PlaylistModal = ({closePlaylistModal, video}) => {
  const location = useLocation();
  const { showToast } = useToast();
  const [playlistName, setPlaylistName] = useState('');
  const {
    videoState: {
      playlists
    },
    videoDispatch
  } = useData();

  const isVideoInPlaylist = id => playlists.find(item => item._id === id)?.videos?.find(item => item._id === video._id) ? true : false;

  const [playlistEditor, setPlaylistEditor] = useState(
    playlists.map( playlist => ({
      ...playlist,
      isChecked: isVideoInPlaylist(playlist._id)
    }))
  );

  useEffect(() => {
    setPlaylistEditor(
      playlists.map( playlist => ({
        ...playlist,
        isChecked: isVideoInPlaylist(playlist._id)
      }))
    )
  }, [playlists]);

  const createPlaylistHandler = async e => {
    e.preventDefault();
    try {
      const { data: { playlists } } = await addNewPlaylist({playlist: {title: playlistName, desc:''}});
      setPlaylistName('');
      videoDispatch({
        type: 'SET_PLAYLISTS',
        payload: {
          playlists: playlists
        }
      });
      showToast('Playlist added successfully! ', 'success');
    } catch (error) {
      showToast('Playlist couldn"t add!', 'error');
      console.log(error.response.data);
    }

  }

  const addVideoToPlaylistHandler = async (playlistId) => {
    try{
      const { data: { playlist }} = await addVideoToPlaylist(playlistId, {video: video});
      videoDispatch({
        type: 'SET_PLAYLISTS',
        payload: {
          playlists: playlists.map( item => item._id === playlistId ? playlist : item)
        }
      });
      showToast('Video added to playlist successfully!', 'success');
    }catch(error){
      console.log(error.response.data);
    }
  }

  const videoToPlaylistHandler = playlistId => {
    setPlaylistEditor(prevPlaylist => prevPlaylist.map( playlist => 
      playlist._id === playlistId 
      ? {...playlist, isChecked: !playlist.isChecked} 
      : {...playlist}
    ));

    isVideoInPlaylist(playlistId)
      ? removeVideoFromPlaylistHandler(playlistId, playlists, video._id, videoDispatch, showToast)
      : addVideoToPlaylistHandler(playlistId)  
    }

  return (
    <div className="playlist-overlay d-flex justify-center items-center">
      <div className="playlist-modal-wrapper d-flex flex-col">
        <div className="playlist-title d-flex justify-between items-center">
          <p>Add Playlist</p>
          <button 
            className="transparent-btn text-color"
            onClick={() => closePlaylistModal()}><CloseIcon style={{ fontSize: "1.2rem" }}/></button>
        </div>
        {playlists.length > 0 && location.pathname!=='/playlist' &&
          <div className="playlist-list d-flex flex-col">
            {playlists.map(({title, _id}) => (
              <label key={_id} className="text-sm" htmlFor={title}>
                <input 
                  className='checkbox-input'
                  type="checkbox"
                  id={title}
                  name={title}
                  checked={playlistEditor.find(item => item._id === _id)?.isChecked ? true : false}
                  onChange={(e) => videoToPlaylistHandler(_id)}
                />
                {title}
              </label>
            ))}
          </div>}
        <form className="playlist-form-wrapper" onSubmit={(e) => createPlaylistHandler(e)}>
          <input
            className='input-field'
            type="text"
            placeholder="Create New Playlist"
            value={playlistName}
            onChange={e => setPlaylistName(e.target.value)}
            required
          />
          <button className='transparent-btn dark-background-btn text-color' type='submit'>
            <AddIcon style={{ fontSize: "1.2rem" }}/>
          </button>
        </form>
      </div>
    </div>
  )
}

export { PlaylistModal }