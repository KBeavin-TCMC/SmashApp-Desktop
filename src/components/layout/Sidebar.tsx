import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className='app-sidebar' style={open ? {left: '-10.7rem'} : {left: 0}}>
      <div className='sidebar-toggle'>
        {open ? (
          <BiChevronRight style={{position: 'relative', right: '7px', top: '9px'}} size={25} onClick={() => setOpen(!open)}/>
        ) : (
          <BiChevronLeft style={{position: 'relative', right: '5px', top: '9px'}} size={25} onClick={() => setOpen(!open)}/>
        )}
      </div>
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