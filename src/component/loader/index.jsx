import loader from "asset/loader.svg";
import './loader.css';

export const Loader = () => {
  return(
    <div className="loader-wrapper d-flex justify-center items-center">
      <img src={loader} alt="Loader" className='loader'/>
    </div>
  )
}