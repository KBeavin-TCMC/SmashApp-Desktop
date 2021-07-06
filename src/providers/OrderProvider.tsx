import React, {useState, createContext, useCallback, ReactNode} from 'react';
import { useEffect } from 'react';
import useDates from '../hooks/useDates';

const initialScreen = {
    filter: {
        list: [
            { name: 'All Orders', selected: true},
            { name: 'Assigned', selected: false},
            { name: 'Unassigned', selected: false},
            { name: '+ Add View', selected: false},
            { name: 'Filter', selected: false},
            { name: 'Create Agreement', selected: false},
        ],
        calendar: [
            { name: 'Order Events', selected: true},
            { name: 'All Events', selected: false}
        ],
        map: [
            { name: 'Order Locations', selected: true},
            { name: 'All Locations', selected: false},
            { name: 'Filter', selected: false}
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

export const OrderContext = createContext({screen: initialScreen, setFilter: (newFilter: any) => {}, setTabs: (newFilter: any) => {}, setRange: (newRange: any) => {}});

const OrderProvider: React.FC<Props> = ({children}) => {
    const [screen, setScreen] = useState(initialScreen);
    const {getCalendarMonthRange} = useDates();
    const [dateRange, setDateRange] = useState(getCalendarMonthRange(new Date()));

    useEffect(() => {
        setScreen({...initialScreen, range: {gte: dateRange.gte, lt: dateRange.lt}});
    }, [])
  
    const setFilter = (newFilter: any) => {
        setScreen({...screen, ...newFilter});
    }

    const setTabs = (newTabs: any) => {
        setScreen({...screen, ...newTabs});
    }

    const setRange = (newRange: any) => {
        let dateRange = getCalendarMonthRange(newRange);
        setScreen({...screen, range: {gte: dateRange.gte, lt: dateRange.lt}});
    }
  
    return (
      <OrderContext.Provider
        value={{
          screen,
          setFilter,
          setTabs,
          setRange
        }}>
            {children}
        </OrderContext.Provider>
    );
  }
  
  export default OrderProvider;