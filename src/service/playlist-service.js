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

const addVideoToPlaylist = (playlistId, video) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.post(`/api/user/playlists/${playlistId}`, video, {headers: headers});
}

const removeVideoFromPlaylist = (playlistId, videoId) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, {headers: headers});
}

const removePlaylist = (playlistId) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.delete(`/api/user/playlists/${playlistId}`, {headers: headers});
}

export { getAllPlaylists, addNewPlaylist, addVideoToPlaylist, removeVideoFromPlaylist, removePlaylist };