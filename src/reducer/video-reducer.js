const initialVideoState = {
  videos: [],
  categories: [],
  categorizedBy: 'All',
  sortBy: false
}
const videoReducer = (state, action) => {
  const { type, 
    payload:{
      videos,
      categorizedBy,
      categories,
      sortBy
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
  }


}
export { initialVideoState, videoReducer };