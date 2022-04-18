import "./App.css";
import { Navbar, Drawer, Loader } from 'component';
import { Routes } from 'route/AppRoute';
import { useTheme, useData } from 'context';

function App() {
  const {theme} = useTheme();
  const {loading} = useData();
  return (
    <div className={`App ${theme==='dark' ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <Drawer />
      {loading && <Loader/>}
      <Routes />
      
    </div>  
  )
}

export default App;