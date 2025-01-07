import React from 'react';

// legend form

const ActivityLegend: React.FC<{
    scheduleData: any[],
    handleDeleteActivity: (index: number) => void,
    newActivity: string,
    newStartTime: string,
    newEndTime: string,
    newColor: string,
    handleActivityChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleAddActivity: (e: React.FormEvent) => void,
    currentTime: any
}> = ({
    scheduleData,
    handleDeleteActivity,
    newActivity,
    newStartTime,
    newEndTime,
    newColor,
    handleActivityChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleColorChange,
    handleAddActivity,
    currentTime
}) => {
        return (
            <div>
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
                        value={newStartTime}
                        onChange={handleStartTimeChange}
                        required
                    />
                    <input
                        className='form-act'
                        type="time"
                        value={newEndTime}
                        onChange={handleEndTimeChange}
                    />
                    <input
                        className="form-act color-input"
                        type="color"
                        value={newColor}
                        onChange={handleColorChange}
                        placeholder="Color"
                    />
                    <button className='add-act-form' type="submit">Add Activity</button>
                </form>

                {/* Display current time */}
                <div className="current-time">
                    {currentTime.toFormat('hh:mm:ss a')}
                </div>
            </div>
        );
    };


export default ActivityLegend;
