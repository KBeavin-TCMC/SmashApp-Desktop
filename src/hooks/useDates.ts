const useDates = () => {
  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const getSelectedDateRange = (date: Date) : {gte: number, lt: number} => {
    let greatThan = new Date(date.toLocaleDateString());
    let lessThan = addDays(greatThan, 1).getTime();

    let dateRangeObject = {
      gte: Math.floor(greatThan.getTime()/1000),
      lt: Math.floor(lessThan/1000)
    };
    return dateRangeObject;
  };

  const addDays = (date: Date, days: number) : Date => {
    // Add number of days to date and return new Date.
    let nextDate: Date = new Date(date);
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate;
  };

  const firstDay = (date: Date) : Date => {
    // Return the first day of month passed in.
    let nextDate: Date = new Date(date);
    nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), 1);
    return nextDate;
  };

  const lastDay = (date: Date) : Date => {
    // Return the last day of month passed in.
    let nextDate: Date = new Date(date);
    nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0);
    return nextDate;
  };

  const getCalendarMonthRange = (date: Date) : {gte: string, lt: string} => {
    let range: {gte: string, lt: string} = {gte: '', lt: ''};
    
    // Get Month
    range.gte = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString();
    range.lt = new Date(date.getFullYear(), date.getMonth() + 1, 1).toLocaleDateString();

    return range;
  }; 

  return {
    formatDate,
    getSelectedDateRange,
    addDays,
    firstDay,
    lastDay,
    getCalendarMonthRange
  };
};

export default useDates;