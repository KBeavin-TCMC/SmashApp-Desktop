import React, { useContext, useState } from "react";
import { RouteContext } from "../../providers/RoutesProvider";
import AppCalendar from "../layout/AppCalendar";

interface Props {
  pills: { id: string; date: Date; type: string }[];
}

const RouteCalendar: React.FC<Props> = ({ pills }) => {
  const [dates, setDates] = useState(new Date());
  const {screen, setRange} = useContext(RouteContext);

  return (
    <div>
      <AppCalendar value={dates} onDayChange={setDates} tileContent={pills} onMonthChange={setRange} />
    </div>
  );
};

export default RouteCalendar;

