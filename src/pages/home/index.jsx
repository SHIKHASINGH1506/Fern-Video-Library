import './home.css';
import SortIcon from '@mui/icons-material/Sort';

import { useData } from 'context';
import { getFilteredSotredVideos } from 'utils/getFilteredSotredVideos';
import { VideoCard } from 'component';


const Home = () => {
  const { loading, setLoading, videoState: { videos, categories, categorizedBy, sortBy }, videoDispatch } = useData();

  const pickCategoryHandler = (id, categoryName) => {
    setLoading(true);
    setTimeout(() => {
      videoDispatch({
        type: 'FILTER_BY_CATEGORY',
        payload: {
          categorizedBy: categoryName,
          categories: categories.map(cateogry => {
            return cateogry._id === id ? { ...cateogry, selected: true } : { ...cateogry, selected: false }
          }),
        }
      });
      setLoading(false);
    }, 700);
  }
  const sortedVideos = getFilteredSotredVideos(videos, categorizedBy, sortBy);
  return (
    <div className="body-section-wrapper d-flex flex-col">
      <div className="category-wrapper d-flex">
        {categories.map(({ categoryName, _id }) => {
          return (
            <span
              key={_id}
              className="badge category-badge rounded-pill"
              onClick={() => pickCategoryHandler(_id, categoryName)}>{categoryName}
            </span>)
        })}
      </div>
      <div className="sort-wrapper d-flex items-center px-8"
        onClick={() => videoDispatch({ type: 'SORT_BY_DATE', payload: { sortBy: !sortBy } })}>
        {sortBy
          ? (<>Clear</>)
          : (
            <>
              <SortIcon />
              <span>Sort by Latest</span>
            </>)}
      </div>
      <div className="video-list px-8">
        {loading
          ? "Loading..."
          : (
            <>
              {sortedVideos.map(video => {
                return <VideoCard video={video} key={video._id} />
              })}
            </>
          )
        }
      </div>
    </div>
  )
}
export { Home }