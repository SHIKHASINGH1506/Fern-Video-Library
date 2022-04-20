import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Drawer, Loader } from 'component';
import { ToastContainer } from 'react-toastify';
import { Routes } from 'route/AppRoute';
import { useTheme, useData } from 'context';

function App() {
  const {theme} = useTheme();
  const {loading} = useData();
  return (
    <div className={`App ${theme==='dark' ? 'dark-theme' : 'light-theme'}`}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Drawer />
      {loading && <Loader/>}
      <Routes />
      
    </div>  
  )
}

export default App;