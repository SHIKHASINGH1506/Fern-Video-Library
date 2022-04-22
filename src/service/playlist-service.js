import axios from 'axios';

const getAllPlaylists = () => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.get('/api/user/playlists', {headers: headers});
}
const addNewPlaylist = (playlist) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.post('/api/user/playlists', playlist, {headers: headers});
}

export { getAllPlaylists, addNewPlaylist };