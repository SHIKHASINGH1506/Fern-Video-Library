import axios from 'axios';

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
export { addItemToWatchLater, removeItemFromWatchLater };