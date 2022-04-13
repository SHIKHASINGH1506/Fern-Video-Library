import "./App.css";
import { Navbar, Drawer } from 'component';
import { Routes } from 'route/AppRoute';
import { useTheme } from 'context';

function App() {
  const {theme} = useTheme();
  return (
    <div className={`App ${theme==='dark' ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <Drawer />
      <Routes />
      
    </div>  
  )
}

export default App;