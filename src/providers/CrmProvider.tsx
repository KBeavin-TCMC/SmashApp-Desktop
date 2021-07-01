import React, {useState, createContext, useCallback, ReactNode} from 'react';

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
    ]
  };

interface Props {
    children: ReactNode;
}

export const CrmContext = createContext({screen: initialScreen, setFilter: (newFilter: any) => {}, setTabs: (newFilter: any) => {}});

const CrmProvider: React.FC<Props> = ({children}) => {
    const [screen, setScreen] = useState(initialScreen);
  
    const setFilter = (newFilter: any) => {
        setScreen({...screen, ...newFilter});
    }

    const setTabs = (newTabs: any) => {
        console.log(newTabs)
        setScreen({...screen, ...newTabs});
    }
  
    return (
      <CrmContext.Provider
        value={{
          screen,
          setFilter,
          setTabs
        }}>
            {children}
        </CrmContext.Provider>
    );
  }
  
  export default CrmProvider;