import React, { useContext, useState } from 'react';
import { CrmContext } from '../../providers/CrmProvider';
import { Meeting } from '../../types/crm';
import AppCalendar from '../layout/AppCalendar';

interface Props {
  pills: {id: string, date: Date, type: string}[];
}

const CrmCalendar: React.FC<Props> = ({pills}) => {
    const [dates, setDates] = useState(new Date());
    const {screen, setRange} = useContext(CrmContext);
    
    return (
      <div>
        <AppCalendar
          value={dates}
          onDayChange={setDates}
          tileContent={pills}
          onMonthChange={setRange} 
        />
      </div>
    );
}

export default CrmCalendar;