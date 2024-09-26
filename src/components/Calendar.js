import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        currentDate.getDate() === day &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();
      days.push(
        <div key={day} className={`day ${isToday ? 'today' : ''}`}>
          {day}
        </div>
      );
    }
    return days;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60); // Update the date every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="calendar-container">
      <div className="calendar-main">
        <h2>{`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`}</h2>
        <div className="days-of-week">
          {daysOfWeek.map(day => <div key={day} className="day-name">{day}</div>)}
        </div>
        <div className="days">
          {renderDays()}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
