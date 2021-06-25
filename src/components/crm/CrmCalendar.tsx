import React, { useState } from 'react';
import AppCalendar from '../layout/AppCalendar';

const CrmCalendar = () => {
    const [dates, setDates] = useState(new Date('6/1/21'));

    return (
      <div>
        <AppCalendar
          value={dates}
          onChange={setDates}
          tileContent={[{date: new Date('06/01/21'), type: 'Demo'},{date: new Date('6/10/21'), type: 'Meeting'}]} 
        />
      </div>
    );
}

export default CrmCalendar;