import './playlist-card.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';

import { useNavigate } from 'react-router-dom';
import { useData } from 'context';
import { removePlaylist } from 'service';
import { useToast } from 'custom-hook/useToast';

const PlaylistCard = ( {playlist}) => {
  const navigate = useNavigate();
  const {showToast} = useToast();
  const {videoDispatch} = useData();
  const { _id, title, videos } = playlist;

  const removePlaylistHandler = async (e, id) => {
    try{
      const {data:{playlists}} = await removePlaylist(id);
      videoDispatch({
        type: 'SET_PLAYLISTS',
        payload: {playlists: playlists}
      })
      showToast('Playlist removed', 'success');
    }catch(error){
      console.log(error.response.data);
    }
  }

  return (
    <div className="playlist-wrapper d-flex flex-col">
      <div className="playlist-card-overlay d-flex justify-center items-center"
        onClick={() => navigate(`/playlist/${_id}`)}>
        <PlayCircleOutlineOutlinedIcon style={{fontSize: "2rem"}}/>
      </div>
      <div className="playlist-body d-flex justify-start items-end"
        onClick={() => navigate(`/playlist/${_id}`)}>
        {title}
      </div>
      <footer className="playlist-footer d-flex justify-start items-center">
        <DeleteOutlineOutlinedIcon onClick = {e => removePlaylistHandler(e, _id)}/>
      </footer>
    </div>
  )
}
export { PlaylistCard };