import React, { useState } from "react";
import AppCalendar from "../layout/AppCalendar";

interface Props {
  pills: { id: string; date: Date; type: string }[];
}

const OrderCalendar: React.FC<Props> = ({ pills }) => {
  const [dates, setDates] = useState(new Date());

  return (
    <div>
      <AppCalendar value={dates} onChange={setDates} tileContent={pills} />
    </div>
  );
};

export default OrderCalendar;
