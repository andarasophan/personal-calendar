import { createContext, useState } from 'react';

export const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentEvents, setCurrentEvents] = useState(null);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentEvents,
        setCurrentEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
