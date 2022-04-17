import axios from 'axios';
const getAllVideos = async () => {
  return await axios.get('/api/videos');
}
export { getAllVideos };