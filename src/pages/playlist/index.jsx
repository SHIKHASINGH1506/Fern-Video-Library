import { useData } from 'context';  
import { PlaylistCard, PlaylistModal } from "component";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Playlist = () => {
  const {
    setLoading, 
    drawer, 
    videoState:{playlists}
  } = useData();
  const navigate = useNavigate();
  const [playlistModalFocus, setPlaylistModalFocus] = useState(false);

  const hasPlaylistItems = playlists.length > 0;

  const closePlaylistModal = () => {
    setPlaylistModalFocus(false);
  }
  return(
    <div className={`body-section-wrapper ${drawer ? 'disable-body' : ''} d-flex flex-col`}>
    <div className="d-flex justify-between items-center px-8 page-title">
      <p className="">Playlist {playlists?.length}</p>
      <button className="bttn bttn-primary" onClick={() => setPlaylistModalFocus(true)}>Create Playlist</button>
    </div>
   
    {hasPlaylistItems ?
    <div className="video-list px-8">
     { playlists.map( playlist => {
        return <PlaylistCard playlist= {playlist} key={playlist._id}/>
      })}
    </div>
    : <div className="message-wrapper d-flex flex-col justify-center items-center">
        <p>You haven't created any playlist yet :(</p>
        <button class="bttn bttn-primary bttn-lg" onClick={() => navigate('/')}>Explore</button>
      </div>
    }
     {playlistModalFocus && <PlaylistModal closePlaylistModal={closePlaylistModal}/>}
  </div>
  )
}

export { Playlist };