import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { initialVideoState, videoReducer } from 'reducer';
import { getAllVideos, getAllCategories } from 'service';

const DataContext = createContext();
const useData = () => useContext(DataContext);

const DataProvider = ({children}) => {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoState, videoDispatch] = useReducer(videoReducer, initialVideoState);

  //get all videos
  useEffect(() => {
    (async () => {
      try{
     // setLoading(true);
      const {data:{videos}} = await getAllVideos();
      //setLoading(false);
      videoDispatch({type:'INIT_VIDEOS', payload:{videos: videos}});
      }catch(error){
        console.log(error.response.data);
      }
    })();
  }, []);
  
  //get all cateogries 
  useEffect(() => {
    (async () => {
      try{
      const {data:{categories}} = await getAllCategories();
      videoDispatch({type:'INIT_CATEGORY', 
        payload:{
          categories: categories.map(category=> 
            category.categoryName === 'All' ?  {...category, selected: true} : {...category, selected: false} 
            )
          }});
      }catch(error){
        console.log(error.response.data);
      }
    })();
  }, []);
  return (
    <DataContext.Provider value={{drawer, setDrawer, loading, setLoading, videoState, videoDispatch}}>
      {children}
    </DataContext.Provider>
  );
}
export {DataProvider, useData};