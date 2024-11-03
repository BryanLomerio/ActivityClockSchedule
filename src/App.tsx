import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import './index.css';

interface ScheduleItem {
  startTime: string; 
  endTime?: string; 
  activity: string; 
}

const scheduleData: ScheduleItem[] = [
  { startTime: "06:00 AM", activity: "Wake Up" },
  { startTime: "08:00 AM", endTime: "11:00 AM", activity: "Study TypeScript" },
  { startTime: "12:00 PM", endTime: "01:00 PM", activity: "Lunch" },
  { startTime: "13:00 PM", endTime: "15:00 PM", activity: "Review and Practice" },
  { startTime: "15:00 PM", endTime: "17:00 PM", activity: "LeetCode" },
  { startTime: "17:00 PM", endTime: "18:00 PM", activity: "Virtual Field Trip" },
  { startTime: "19:00 PM", activity: "Continue Studying TypeScript" },
  { startTime: "23:00 PM", endTime: "06:00 AM", activity: "Sleep" },
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
                className="clock-activity"
                style={startPosition}
              >
                <span className="activity-label">{item.activity}</span>
              </div>
            );
          })}
          
          <div className="clock-hand hour-hand" style={calculateHourHand(currentTime)}></div>
          <div className="clock-hand minute-hand" style={calculateMinuteHand(currentTime)}></div>
          <div className="second-hand" style={calculateSecondHand(currentTime)}></div>
          
          <div className="clock-center"></div>
        </div>
        <div className="current-time">
          {currentTime.toFormat('HH:mm:ss')} 
        </div>
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
    fontSize: '1rem',
  } as React.CSSProperties; 
}

function calculateLinePosition(hour: number) {
  const angle = (hour * 15) - 90; 
  const x1 = 50 + 51.20 * Math.cos((angle * Math.PI) / 180); 
  const y1 = 49 + 52 * Math.sin((angle * Math.PI) / 180); 

  const lineLength = 20; 
  /* const lineOffset = lineLength / 2;  */
  // Remove x2 and y2 since they are not used
  // const x2 = 51 + (50 + lineOffset) * Math.cos((angle * Math.PI) / 180);
  // const y2 = 50 + (50 + lineOffset) * Math.sin((angle * Math.PI) / 180);

  return {
    position: 'absolute' as 'absolute',
    left: `${x1}%`,
    top: `${y1}%`,
    width: '2px',
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
  } as React.CSSProperties; 
}

function calculateHourHand(time: DateTime) {
  const hours = time.hour; 
  const minutes = time.minute; 
  const angle = (hours * 15) + (minutes * 0.25) - 360; 

  return {
    transform: `rotate(${angle}deg)`,
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transformOrigin: 'bottom center',
  } as React.CSSProperties; 
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
  } as React.CSSProperties; 
}

function calculateSecondHand(time: DateTime) {
  const seconds = time.second;
  const angle = seconds * 6; 
  
  return {
    transform: `rotate(${angle}deg)`,
    position: 'absolute', 
    bottom: '50%', 
    left: '50%',
    height: '40%',
    width: '2px',  
    backgroundColor: 'red', 
    transformOrigin: 'bottom center',
  } as React.CSSProperties; 
}

export default ClockSchedule;
