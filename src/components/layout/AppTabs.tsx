import React, { useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdCalendar, IoMdMap } from "react-icons/io";

interface Props {
  List: any;
  Calendar: any;
  Map: any;
  Filter: any;
}

const AppTabs: React.FC<Props> = ({List, Calendar, Map, Filter}) => {
  const [tabs, setTabs] = useState([
    { name: "London", active: true },
    { name: "Paris", active: false },
    { name: "Tokyo", active: false },
  ]);

  return (
    <div className="tabs-container">
      <div className="tabs-list">
        <button
          className={tabs[0].active ? "tablinks active" : "tablinks"}
          onClick={() =>
            setTabs([
              { name: "London", active: true },
              { name: "Paris", active: false },
              { name: "Tokyo", active: false },
            ])
          }
        >
          <FaRegListAlt className="tab-icon" />
          <h5>List</h5>
        </button>
        <button
          className={tabs[1].active ? "tablinks active" : "tablinks"}
          onClick={() =>
            setTabs([
              { name: "London", active: false },
              { name: "Paris", active: true },
              { name: "Tokyo", active: false },
            ])
          }
        >
          <IoMdCalendar className="tab-icon" />
          <h5>Calendar</h5>
        </button>
        <button
          className={tabs[2].active ? "tablinks active" : "tablinks"}
          onClick={() =>
            setTabs([
              { name: "London", active: false },
              { name: "Paris", active: false },
              { name: "Tokyo", active: true },
            ])
          }
        >
          <IoMdMap className="tab-icon" />
          <h5>Map</h5>
        </button>
      </div>

      {/* Tab Content */}
      <div className='row tab-content-container'>
        <div className='col-2 tab-filter' >
          <div>{Filter}</div>
        </div>

        <div className='col-10 tab-content'>
          <div className={tabs[0].active ? "tab-content-item active" : "tabcontent"}>{List}</div>
          <div className={tabs[1].active ? "tab-content-item active" : "tabcontent"}>{Calendar}</div>
          <div className={tabs[2].active ? "tab-content-item active" : "tabcontent"}>{Map}</div>
        </div>
      </div>
    </div>
  );
};

export default AppTabs;
