import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSchedule, AiOutlineCheckCircle } from 'react-icons/ai';
import { IoSettingsOutline, IoPeopleOutline, IoBusinessOutline } from "react-icons/io5";
import { RiHomeLine, RiAccountBoxLine, RiFileWarningLine, RiFlag2Line } from "react-icons/ri";
import { BsChatQuote, BsCardList } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Sidebar = () => {
  const [open, setOpen] = useState(window.innerWidth > 576 ? true : false);

  return (
    <div className='app-sidebar' style={open ? {left: 0} : {left: '-10.7rem'}}>
      <div className='sidebar-toggle'>
        {open ? (
          <BiChevronLeft style={{position: 'relative', right: '7px', top: '9px'}} size={25} onClick={() => setOpen(!open)}/>
        ) : (
          <BiChevronRight style={{position: 'relative', right: '5px', top: '9px'}} size={25} onClick={() => setOpen(!open)}/>
        )}
      </div>
      <div className="sidebar-item">
        <RiHomeLine />
        <Link to="/home">
            Home
        </Link>
      </div>
      <div className="sidebar-item">
        <BsChatQuote />
        <Link to="/quotes">
            Quotes
        </Link>
      </div>
      <div className="sidebar-item">
        <IoPeopleOutline />
        <Link to="/leads">
            Leads
        </Link>
      </div>
      <div className="sidebar-item">
        <RiAccountBoxLine />
        <Link to="/accounts">
            Accounts
        </Link>
      </div>
      <div className="sidebar-item">
        <HiOutlineLocationMarker />
        <Link to="/jobs">
            Jobs
        </Link>
      </div>
      <div className="sidebar-item">
        <AiOutlineSchedule />
        <Link to="/schedules">
            Schedule
        </Link>
      </div>
      <div className="sidebar-item">
        <RiFileWarningLine />
        <Link to="/invoices">
            Invoices
        </Link>
      </div>
      <div className="sidebar-item">
        <AiOutlineCheckCircle />
        <Link to="/agreements">
            Agreements
        </Link>
      </div>
      <div className="sidebar-item">
        <BsCardList />
        <Link to="/reports">
            Reports
        </Link>
      </div>
      <div className="sidebar-item">
        <IoBusinessOutline />
        <Link to="/business">
            Business Unit
        </Link>
      </div>
      <div className="sidebar-item">
        <RiFlag2Line />
        <Link to="/corporate">
            Corporate
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;