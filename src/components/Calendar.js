import React, { useState, useEffect, useContext } from 'react';
import './Calendar.css';
import AuthContext from '../context/AuthContext.js';
import axios from 'axios';

const Calendar = () => {
  const { user, currentRole, authTokens } = useContext(AuthContext);

  const [currentDate, setCurrentDate] = useState(new Date());
const [upcomingPresentations, setUpcomingPresentations] = useState([]);

  useEffect(() => {
    const fetchPresentations = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/fyp/view-presentations-user/`,
                { headers: { Authorization: `Bearer ${authTokens.access}` } }
            );

            const currentTime = new Date(); // Get the current time
            console.log("Received schedules: ", response.data);

            // Split presentations into upcoming and previous
            const upcoming = response.data.filter(presentation => new Date(presentation.scheduled_time) > currentTime);

            setUpcomingPresentations(upcoming);
        } catch (error) {
            console.error('Error fetching presentations:', error);
        }
    };

    fetchPresentations();

}, []);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // const renderDays = () => {
  //   const days = [];
  //   for (let i = 0; i < firstDayOfMonth; i++) {
  //     days.push(<div key={`empty-${i}`} className="day empty"></div>);
  //   }
  //   for (let day = 1; day <= daysInMonth; day++) {
  //     const isToday =
  //       currentDate.getDate() === day &&
  //       currentDate.getMonth() === new Date().getMonth() &&
  //       currentDate.getFullYear() === new Date().getFullYear();
  //     days.push(
  //       <div key={day} className={`day ${isToday ? 'today' : ''}`}>
  //         {day}
  //       </div>
  //     );
  //   }
  //   return days;
  // };

  const renderDays = () => {
    const days = [];
    
    const presentationDates = upcomingPresentations.map(presentation => {
      const presentationDate = new Date(presentation.scheduled_time);
      return presentationDate.toLocaleDateString('en-CA'); // Format as "YYYY-MM-DD" in local time
    });
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateISO = date.toLocaleDateString('en-CA'); // Format as "YYYY-MM-DD" in local time
      const isPresentationDay = presentationDates.includes(dateISO);
  
      const isToday =
        currentDate.getDate() === day &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();
  
      days.push(
        <div
          key={day}
          className={`day ${isToday ? 'today' : ''} ${isPresentationDay ? 'presentation-day' : ''}`}
        >
          {day}
          {isPresentationDay && <span className="mark">*</span>}
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
