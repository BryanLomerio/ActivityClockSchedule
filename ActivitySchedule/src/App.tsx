import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import './index.css';

interface ScheduleItem {
  time: string; 
  activity: string; 
}

const scheduleData: ScheduleItem[] = [
  { time: "06:00", activity: "Wake Up" },
  { time: "07:00", activity: "Setup PC with Coffee" },
  { time: "08:00", activity: "TypeScript" },
  { time: "10:00", activity: "Break" },
  { time: "11:00", activity: "Leetcode" },
  { time: "12:00", activity: "Lunch" },
  { time: "13:00", activity: "Review and Practice" },
  { time: "14:00", activity: "Virtual Field Trip" },
  { time: "15:00", activity: "Continue Studying TypeScript" },
];

const ClockSchedule: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now().setZone('Asia/Manila'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.now().setZone('Asia/Manila'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock-schedule">
      <div className="clock-face">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="clock-hour"
            style={calculateHourPosition(index)}
          >
            {String(index).padStart(2, '0')}:00 
          </div>
        ))}

        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={`line-${index}`}
            className="clock-line"
            style={calculateLinePosition(index)}
          />
        ))}

        {scheduleData.map((item, index) => (
          <div
            key={index}
            className="clock-activity"
            style={calculatePosition(item.time)}
          >
            <span className="activity-label">{item.activity}</span>
          </div>
        ))}
        
        <div className="clock-hand hour-hand" style={calculateHourHand(currentTime)}></div>
        <div className="clock-hand minute-hand" style={calculateMinuteHand(currentTime)}></div>
        <div className="second-hand" style={calculateSecondHand(currentTime)}></div>
        
        <div className="clock-center"></div>
      </div>
      <div className="current-time">
        {currentTime.toFormat('HH:mm:ss')} 
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
    position: 'absolute' as 'absolute',
    fontSize: '1rem',
  };
}

function calculateLinePosition(hour: number) {
  const angle = (hour * 15) - 90; 
  const x1 = 50 + 50 * Math.cos((angle * Math.PI) / 180);
  const y1 = 50 + 50 * Math.sin((angle * Math.PI) / 180);
  const x2 = 50 + 60 * Math.cos((angle * Math.PI) / 180);
  const y2 = 50 + 60 * Math.sin((angle * Math.PI) / 180);

  return {
    position: 'absolute' as 'absolute',
    left: `${x1}%`,
    top: `${y1}%`,
    width: '2px',
    height: '10px',
    backgroundColor: '#333',
    transform: `rotate(${angle + 90}deg)`,
    transformOrigin: 'top',
  };
}

function calculatePosition(time: string) {
  const [hourString, minuteString] = time.split(":");
  const hour = parseInt(hourString); 
  const minute = parseInt(minuteString);
  const angle = (hour * 15) + (minute * 0.25) - 90; 

  const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
  const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);

  return {
    top: `${y}%`,
    left: `${x}%`,
    transform: 'translate(-50%, -50%)',
  };
}

function calculateHourHand(time: DateTime) {
  const hours = time.hour; 
  const minutes = time.minute; 
  const angle = (hours * 15) + (minutes * 0.25) - 360; 

/*   (hrs + 15) + (mins * 0.25) - 720
  (hrs + 15) + (mins * 0.25) - 90
 */

  return {
    transform: `rotate(${angle}deg)`,
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transformOrigin: 'bottom center',
  };
}

function calculateMinuteHand(time: DateTime) {
  const minutes = time.minute; 
  const seconds = time.second; 
  const angle = (minutes * 6) + (seconds * 0.1) - 360;

  return {
    transform: `rotate(${angle}deg)`,
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transformOrigin: 'bottom center',
  };
}

function calculateSecondHand(time: DateTime) {
  const seconds = time.second;
  const angle = seconds * 6 - 360; 

  return {
    transform: `rotate(${angle}deg)`,
    position: 'absolute', 
    bottom: '50%', 
    left: '50%',
    transformOrigin: 'bottom center',
  };
}

export default ClockSchedule;
