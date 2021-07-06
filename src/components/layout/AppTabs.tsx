import React, { useContext, useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdCalendar, IoMdMap } from "react-icons/io";
import { CrmContext } from "../../providers/CrmProvider";

interface Props {
  List: any;
  Calendar: any;
  Map: any;
  Filter: any;
  context: any;
}

const AppTabs: React.FC<Props> = ({List, Calendar, Map, Filter, context}) => {
  const {screen, setTabs} = useContext(context);

  return (
    <div className="tabs-container">
      <div className="tabs-list">
        <button
          className={screen.tabs[0].active ? "tablinks active" : "tablinks"}
          onClick={() =>
            setTabs({tabs: [
              { name: "List", active: true },
              { name: "Calendar", active: false },
              { name: "Map", active: false },
            ]})
          }
        >
          <FaRegListAlt className="tab-icon" />
          <h5>List</h5>
        </button>
        <button
          className={screen.tabs[1].active ? "tablinks active" : "tablinks"}
          onClick={() =>
            setTabs({tabs:[
              { name: "London", active: false },
              { name: "Paris", active: true },
              { name: "Tokyo", active: false },
            ]})
          }
        >
          <IoMdCalendar className="tab-icon" />
          <h5>Calendar</h5>
        </button>
        <button
          className={screen.tabs[2].active ? "tablinks active" : "tablinks"}
          onClick={() =>
            setTabs({tabs: [
              { name: "London", active: false },
              { name: "Paris", active: false },
              { name: "Tokyo", active: true },
            ]})
          }
        >
          <IoMdMap className="tab-icon" />
          <h5>Map</h5>
        </button>
      </div>

      {/* Tab Content */}
      <div className='row g-0 tab-content-container'>
        <div className='col-3 tab-filter' >
          <div className='tab-filter-container'>{Filter}</div>
        </div>

        <div className='col-9 tab-content'>
          <div className={screen.tabs[0].active ? "tab-content-item active" : "tabcontent"}>{List}</div>
          <div className={screen.tabs[1].active ? "tab-content-item active" : "tabcontent"}>{Calendar}</div>
          <div className={screen.tabs[2].active ? "tab-content-item active" : "tabcontent"}>{Map}</div>
        </div>
      </div>
    </div>
  );
};

export default AppTabs;
