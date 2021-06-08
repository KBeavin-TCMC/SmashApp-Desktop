import React from 'react';
import { FaRegListAlt } from "react-icons/fa";
import { IoMdCalendar, IoMdMap } from "react-icons/io";
import Colors from '../../constants/Colors';

const AppTabs = () => {
    return (
      <div>
        {/* Tabs List */}
        <div style={{display: 'inline', paddingTop: 15, paddingBottom: 15, backgroundColor: Colors.SMT_Secondary_1_Light_1 }}>
          <div style={{ display: "inline", marginLeft: 10, marginRight: 10 }}>
              <FaRegListAlt style={{fontSize: 16, marginBottom: 5, marginRight: 5}} />
            <h5 style={{ display: "inline", fontWeight: 'bold' }}>List</h5>
          </div>
          <div style={{ display: "inline", marginLeft: 10, marginRight: 10  }}>
            <IoMdCalendar  style={{fontSize: 20, marginBottom: 5, marginRight: 5}} />
            <h5 style={{display: 'inline', fontWeight: 'bold' }}>Calendar</h5>
          </div>
          <div style={{ display: "inline", marginLeft: 10, marginRight: 10  }}>
            <IoMdMap  style={{fontSize: 20, marginBottom: 5, marginRight: 5}} />
            <h5 style={{display: 'inline', fontWeight: 'bold' }}>Map</h5>
          </div>
        </div>

        {/* Tabs Content */}
        <div></div>
      </div>
    );
}

export default AppTabs;