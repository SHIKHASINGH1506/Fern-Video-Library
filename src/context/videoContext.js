import {createContext, useContext, useState} from 'react';

const DataContext = createContext();
const useData = () => useContext(DataContext);

const DataProvider = ({children}) => {
  const [drawer, setDrawer] = useState(false);
  return (
    <DataContext.Provider value={{drawer, setDrawer}}>
      {children}
    </DataContext.Provider>
  );
}
export {DataProvider, useData};