import axios from 'axios';

const getAllVideos = async () => {
  return await axios.get('/api/videos');
}

const getVideo = async (id) => {
  return await axios.get(`/api/video/${id}`);
}
export { getAllVideos, getVideo };