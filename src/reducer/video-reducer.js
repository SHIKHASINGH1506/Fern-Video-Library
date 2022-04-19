const initialVideoState = {
  videos: [],
  categories: [],
  likedVideos: [],
  watchlater: [],
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
      likedVideos,
      watchlater
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
    case 'SET_WATCH_LATER':
      return {
        ...state,
        watchlater
      }
  }


}
export { initialVideoState, videoReducer };