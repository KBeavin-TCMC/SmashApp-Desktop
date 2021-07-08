import React, { useContext, useState } from "react";
import { InvoiceContext } from "../../providers/InvoiceProvider";
import AppCalendar from "../layout/AppCalendar";

interface Props {
  pills: { id: string; date: Date; type: string }[];
}

const InvoiceCalendar: React.FC<Props> = ({ pills }) => {
  const [dates, setDates] = useState(new Date());
  const {screen, setRange} = useContext(InvoiceContext);
  
  return (
    <div>
      <AppCalendar value={dates} onDayChange={setDates} tileContent={pills} onMonthChange={setRange} />
    </div>
  );
};

export default InvoiceCalendar;

