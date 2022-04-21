import axios from 'axios';

const getHistoryVideos = () => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.get('/api/user/history', {headers: headers});
}
const addVideoToHistory = (video) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.post('/api/user/history', video, {headers: headers});
}

const removeVideoFromHistory = (id) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.delete(`/api/user/history//${id}`, {headers: headers});
}
export { getHistoryVideos, addVideoToHistory, removeVideoFromHistory };