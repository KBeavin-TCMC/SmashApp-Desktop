import React, { Dispatch, SetStateAction } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface TileContent {
  date: Date;
  type: string;
}

interface Props {
  value: Date | Date[];
  onChange: Dispatch<SetStateAction<Date>>;
  tileContent?: TileContent[];
  tileClassName?: () => string;
}

const AppCalendar: React.FC<Props> = ({
  value,
  onChange,
  tileContent,
  tileClassName,
}) => {

  const defaultTileContent = (date: any) => {
      // only run in month view
    if (date.view === "month") {
        // for each date find tile
        let tile = tileContent?.find(tile => isSameDay(tile.date, date.date));
      if (tile) {
          return <TileContentComponent date={tile.date} type={tile.type} />;
        }
    }
    return null;
  };

  const isSameDay = (dDate: Date, date: Date) => {
      let match = false;
      let firstDate = dDate.toLocaleDateString();
      let secondDate = date.toLocaleDateString();
      
    if (firstDate === secondDate) match = true;
    return match;
  };

  return (
    <div style={{ display: "flex" }}>
      <Calendar
        formatShortWeekday={(locale, date) => formatShortWeekday(date)}
        onChange={onChange}
        value={value}
        tileContent={defaultTileContent}
        tileClassName={tileClassName}
      />
    </div>
  );
};

const TileContentComponent: React.FC<TileContent> = ({ date, type }) => {
  return (
    <div className='app-calendar-pill' id={date.toLocaleDateString()}>
      <div>{type}</div>
    </div>
  );
};

const formatShortWeekday = (date: Date): string => {
  switch (date.getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Undefined";
  }
};

export default AppCalendar;
