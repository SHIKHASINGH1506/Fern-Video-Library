import axios from 'axios';

const getAllCategories = async () => {
  return await axios.get('/api/categories');
}
export { getAllCategories };