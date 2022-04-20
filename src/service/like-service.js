import axios from 'axios';

const addItemToLikedVideos = (video) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.post('/api/user/likes', video, {headers: headers});
}

const deleteItemFromLikedVideos = (videoId) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.delete(`/api/user/likes/${videoId}`, {headers: headers});
}
export {addItemToLikedVideos, deleteItemFromLikedVideos};