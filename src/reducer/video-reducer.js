const initialVideoState = {
  videos: [],
  categories: [],
  likedVideos: [],
  categorizedBy: 'All',
  sortBy: false
}
const videoReducer = (state, action) => {
  const { type, 
    payload:{
      videos,
      categorizedBy,
      categories,
      sortBy,
      likedVideos
    } } = action;
  switch (type) {
    case 'INIT_VIDEOS':
      return{
        ...state,
          videos
      }
    case 'INIT_CATEGORY':
      return {
        ...state,
        categories
      };
    case 'FILTER_BY_CATEGORY':
      return {
        ...state,
        categorizedBy,
        categories
      };
    case 'SORT_BY_DATE':
      return{
        ...state,
        sortBy
      }
    case 'SET_LIKED_VIDEOS':
      return {
        ...state,
        likedVideos
      }
  }


}
export { initialVideoState, videoReducer };