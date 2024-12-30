import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';
import Dog from './assets/dog.gif';
import Draggable from 'react-draggable';
import './index.css';

interface ScheduleItem {
  startTime: string;
  endTime?: string;
  activity: string;
  color: string; 
}

const initialScheduleData: ScheduleItem[] = [
  { startTime: "06:00 AM", activity: "Wake Up", color: "#FFB6C1" },
  { startTime: "08:00 AM", endTime: "18:00 PM", activity: "Work", color: "#ADD8E6" },
  { startTime: "12:00 PM", endTime: "01:00 PM", activity: "Lunch", color: "#90EE90" },
  { startTime: "18:00 PM", activity: "Time to Head Home", color: "#FFD700" },
  { startTime: "19:00 PM", activity: "Eat Dinner", color: "#FF6347" },
  { startTime: "20:00 PM", activity: "Study TypeScript", color: "#DA70D6" },
  { startTime: "22:00 PM", activity: "Enhance Project Features", color: "#FF8C00" },
  { startTime: "24:00 PM", endTime: "06:00 AM", activity: "sleep", color: "#B0C4DE" },
];

const ClockSchedule: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now().setZone('Asia/Manila'));
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(initialScheduleData);
  const [newActivity, setNewActivity] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');
  const [newColor, setNewColor] = useState<string>('#FFFFFF'); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.now().setZone('Asia/Manila'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Swal.fire({
      title: '<span style="font-size: 1.5rem; font-weight: bold; color: black;">Welcome!</span>',
      html: `
        <p style="font-size: 1.2rem; font-weight: bold; color: black;">
          For the best experience, zoom out your screen using 
          <kbd style="padding: 0.2rem 0.4rem; border: 1px solid #ccc; border-radius: 3px; background-color: #f7f7f7; font-size: 1rem; font-weight: bold; color: black;">Ctrl</kbd> 
          + 
          <kbd style="padding: 0.2rem 0.4rem; border: 1px solid #ccc; border-radius: 3px; background-color: #f7f7f7; font-size: 1rem; font-weight: bold; color: black; margin-top: 10px;">-</kbd>
        </p>
      `,
      icon: 'info',
      confirmButtonText: '<span style="font-size: 1rem; font-weight: bold;">Got it!</span>',
    });
  }, []);

  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewActivity(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColor(e.target.value);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newActivity && newTime) {
      setScheduleData(prevData => [
        ...prevData,
        { startTime: newTime, activity: newActivity, color: newColor }
      ]);
      setNewActivity('');
      setNewTime('');
      setNewColor('#FFFFFF'); 
    }
  };

  const handleDeleteActivity = (index: number) => {
    setScheduleData(prevData => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="clock-schedule">
      <span className='headhead'>
        <h1>배석류 백수계획표</h1>
        <h1>Inspired by Bae Seok Ryu</h1>
        <h3>TODAY'S TIME TABLE</h3>
      </span>
      <div className='innerCircle'>
        <div className="clock-face">
          <div className="inner-circle"></div>
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="clock-hour"
              style={calculateHourPosition(index + 1)}
            >
              {index + 1}
            </div>
          ))}

          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={`line-${index}`}
              className="clock-line"
              style={calculateLinePosition(index)}
            />
          ))}

          {scheduleData.map((item, index) => {
            const startPosition = calculatePosition(item.startTime);
            return (
              <div
                key={index}
                className={`clock-activity ${item.activity === "sleep" ? 'sleep-activity' : ''}`}
                style={{
                  ...startPosition,
                  color: item.activity === "sleep" ? 'transparent' : 'inherit',
                  backgroundColor: item.activity === "sleep" ? 'transparent' : item.color, // Use the color
                }}
              >
                {item.activity !== "sleep" && (
                  <span className="activity-label">
                    {item.activity}
                  </span>
                )}
                {item.activity === "sleep" && <img className='dog' src={Dog} alt="Dog sleeping" />}
              </div>
            );
          })}

          <div className="clock-hand hour-hand" style={calculateHourHand(currentTime)}></div>
          <div className="clock-hand minute-hand" style={calculateMinuteHand(currentTime)}></div>
          <div className="second-hand" style={calculateSecondHand(currentTime)}></div>

          <div className="clock-center">START</div>
        </div>
        <Draggable>
  <div className="legend" style={{ cursor: 'move' }}>
    {scheduleData.map((item, index) => (
      <div key={index} className="legend-item">
        <span className="legend-time">
          {item.startTime}{item.endTime ? ` - ${item.endTime}` : ''}
        </span>
        <span className="dot-line"></span>
        <span 
          className="legend-activity" 
          style={{ backgroundColor: item.color }} 
        >
          {item.activity}
        </span>
        <button className="delete-button" onClick={() => handleDeleteActivity(index)}>✘</button>
      </div>
    ))}
    <form onSubmit={handleAddActivity} className="add-activity-form">
      <input
        className='form-act'
        type="text"
        placeholder="Activity"
        value={newActivity}
        onChange={handleActivityChange}
        required
      />
      <input
        className='form-act'
        type="time"
        value={newTime}
        onChange={handleTimeChange}
        required
      />
      <input
        className='form-act'
        type="color"
        value={newColor} 
        onChange={handleColorChange}
      />
      <button className='add-act-form' type="submit">Add Activity</button>
    </form>
    <div className="current-time">
      {currentTime.toFormat('hh:mm:ss a')}
    </div>
  </div>
</Draggable>

      </div>
    </div>
  );
};
function calculateHourPosition(hour: number) {
  const angle = (hour * 15) - 90;
  const x = 50 + 60 * Math.cos((angle * Math.PI) / 180);
  const y = 50 + 60 * Math.sin((angle * Math.PI) / 180);

  return {
    top: `${y}%`,
    left: `${x}%`,
    transform: 'translate(-50%, -50%)',
    position: 'absolute' as const,
    fontSize: '1.50rem',
  };
}

function calculateLinePosition(hour: number) {
  const angle = (hour * 15) - 360;
  const x1 = 50 + 51.20 * Math.cos((angle * Math.PI) / 180);
  const y1 = 49 + 52 * Math.sin((angle * Math.PI) / 180);

  const lineLength = 20;
  const isAssignedHour = [0, 6, 12, 18, 24].includes(hour);

  return {
    position: 'absolute' as const,
    left: `${x1}%`,
    top: `${y1}%`,
    width: isAssignedHour ? '7px' : '3px',
    height: `${lineLength}px`,
    backgroundColor: '#333',
    transform: `rotate(${angle + 90}deg)`,
  };
}

function calculatePosition(time: string) {
  const [hourString, minuteString] = time.split(":");
  const hour = parseInt(hourString);
  const minute = parseInt(minuteString);
  const angle = (hour * 15) + (minute * 0.25) - 90;

  const radius = 30;
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

  const adjustedAngle = angle >= 90 && angle <= 270 ? angle + 180 : angle;

  return {
    top: `${y}%`,
    left: `${x}%`,
    transform: `translate(-50%, -50%) rotate(${adjustedAngle}deg)`,
    transformOrigin: 'center',
  };
}

function calculateHourHand(time: DateTime) {
  const hours = time.hour;
  const minutes = time.minute;
  const angle = (hours * 15) + (minutes * 0.25) - 360;

  return {
    transform: `rotate(${angle}deg)`,
    position: "absolute" as const,
    left: "50%",
    transformOrigin: "bottom center",
  };
}

function calculateMinuteHand(time: DateTime) {
  const minutes = time.minute;
  const seconds = time.second;
  const angle = (minutes * 6) + (seconds * 0.1) - 360;

  return {
    transform: `rotate(${angle}deg)`,
    position: "absolute" as const,
    bottom: "50%",
    left: "50%",
    transformOrigin: "bottom center",
  };
}

function calculateSecondHand(time: DateTime) {
  const seconds = time.second;
  const angle = (seconds / 60) * 360;

  return {
    transform: `rotate(${angle}deg)`,
    position: "absolute" as const,
    bottom: "50%",
    left: "50%",
    height: "40%",
    width: "5px",
    transformOrigin: "bottom center",
  };
}

export default ClockSchedule;
