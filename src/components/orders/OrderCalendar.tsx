import React, { useContext, useState } from "react";
import { OrderContext } from "../../providers/OrderProvider";
import AppCalendar from "../layout/AppCalendar";

interface Props {
  pills: { id: string; date: Date; type: string }[];
}

const OrderCalendar: React.FC<Props> = ({ pills }) => {
  const [dates, setDates] = useState(new Date());
  const {screen, setRange} = useContext(OrderContext);

  return (
    <div>
      <AppCalendar value={dates} onDayChange={setDates} tileContent={pills} onMonthChange={setRange} />
    </div>
  );
};

export default OrderCalendar;
