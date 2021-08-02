import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AppToast from "../layout/AppToast";

const RightHeader = () => {

  return (
    <div className='right-header'>
      <div className='toast-container'>
        <AppToast />
      </div>

        <Link to="/dashboard" className='right-header-container'>
          <IoPersonCircleOutline className='right-header-icon' />
          <label>Dashboard</label>
        </Link>
    </div>
  );
};

export default RightHeader;
