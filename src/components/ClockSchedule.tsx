import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';
import Draggable from 'react-draggable';
import '../index.css';
import ClockFace from './ClockFace';
import ActivityLegend from './ActivityLegend';

interface ScheduleItem {
    startTime: string;
    endTime?: string;
    activity: string;
    color: string;
}

// hardcoded for starter
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
    const [newStartTime, setNewStartTime] = useState<string>('');
    const [newEndTime, setNewEndTime] = useState<string>('');
    const [newColor, setNewColor] = useState<string>('#FFFFFF');
    const draggableRef = useRef<HTMLDivElement>(null);

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

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStartTime(e.target.value);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEndTime(e.target.value);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewColor(e.target.value);
    };

    const handleAddActivity = (e: React.FormEvent) => {
        e.preventDefault();
        if (newActivity && newStartTime) {
            setScheduleData(prevData => [
                ...prevData,
                { startTime: newStartTime, endTime: newEndTime, activity: newActivity, color: newColor }
            ]);
            setNewActivity('');
            setNewStartTime('');
            setNewEndTime('');
            setNewColor('#FFFFFF');
        }
    };

    const handleDeleteActivity = (index: number) => {
        setScheduleData(prevData => prevData.filter((_, i) => i !== index));
    };

    // Current time and schedule data
    return (
        <div className="clock-schedule">
            <span className='headhead'>
                <h1>배석류 백수계획표</h1>
                <h1>Inspired by Bae Seok Ryu</h1>
                <h3>TODAY'S TIME TABLE</h3>
            </span>
            <div className='innerCircle'>
                <ClockFace scheduleData={scheduleData} currentTime={currentTime} />
                <Draggable nodeRef={draggableRef}>
                    <div ref={draggableRef} className="legend" style={{ cursor: 'move' }}>
                        <ActivityLegend
                            scheduleData={scheduleData}
                            handleDeleteActivity={handleDeleteActivity}
                            newActivity={newActivity}
                            newStartTime={newStartTime}
                            newEndTime={newEndTime}
                            newColor={newColor}
                            handleActivityChange={handleActivityChange}
                            handleStartTimeChange={handleStartTimeChange}
                            handleEndTimeChange={handleEndTimeChange}
                            handleColorChange={handleColorChange}
                            handleAddActivity={handleAddActivity}
                            currentTime={currentTime}
                        />

                    </div>
                </Draggable>
            </div>
        </div>
    );
};

export default ClockSchedule;
