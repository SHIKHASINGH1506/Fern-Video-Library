import axios from 'axios';

const getWatchLaterItems = () => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.get('/api/user/watchlater', {headers: headers});
}
const addItemToWatchLater = (video) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.post('/api/user/watchlater', video, {headers: headers});
}

const removeItemFromWatchLater = (id) => {
  const token = localStorage.getItem('token');
  const headers = {authorization: token};
  return axios.delete(`/api/user/watchlater/${id}`, {headers: headers});
}
export { getWatchLaterItems, addItemToWatchLater, removeItemFromWatchLater };