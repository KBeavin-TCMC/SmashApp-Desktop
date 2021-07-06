import React, {useState, createContext, useCallback, ReactNode} from 'react';
import useDates from '../hooks/useDates';

const initialScreen = {
    filter: {
        list: [
            { name: 'Show All', selected: true},
            { name: 'Owned By Me', selected: false},
            { name: 'Unassigned', selected: false},
            { name: '+ Add View', selected: false},
            { name: 'Schedule Demo', selected: false},
            { name: 'Create Agreement', selected: false},
        ],
        calendar: [
            { name: 'Crm Events', selected: true},
            { name: 'All Events', selected: false}
        ],
        map: [
            { name: 'All', selected: true}
        ]
    },
    tabs: [
        { name: "List", active: true },
        { name: "Calendar", active: false },
        { name: "Map", active: false },
    ],
    range: {gte: '', lt: ''},
  };

interface Props {
    children: ReactNode;
}

export const CrmContext = createContext({screen: initialScreen, setFilter: (newFilter: any) => {}, setTabs: (newFilter: any) => {}, setRange: (newRange: any) => {}});

const CrmProvider: React.FC<Props> = ({children}) => {
    const [screen, setScreen] = useState(initialScreen);
    const {getCalendarMonthRange} = useDates();
    const [dateRange, setDateRange] = useState(getCalendarMonthRange(new Date()));
  
    const setFilter = (newFilter: any) => {
        setScreen({...screen, ...newFilter});
    }

    const setTabs = (newTabs: any) => {
        setScreen({...screen, ...newTabs});
    }

    const setRange = (newRange: any) => {
        setScreen({...screen, ...newRange});
    }
  
    return (
      <CrmContext.Provider
        value={{
          screen,
          setFilter,
          setTabs,
          setRange
        }}>
            {children}
        </CrmContext.Provider>
    );
  }
  
  export default CrmProvider;