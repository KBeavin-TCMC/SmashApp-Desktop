import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className='app-sidebar'>

      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/home">
            Home
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/quotes">
            Quotes
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/leads">
            Leads
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/accounts">
            Accounts
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/jobs">
            Jobs
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/schedules">
            Schedule
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/invoices">
            Invoices
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/agreements">
            Agreements
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/reports">
            Reports
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/business">
            Business Unit
        </Link>
      </div>
      <div className="sidebar-item">
        <IoSettingsOutline />
        <Link to="/corporate">
            Corporate
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;