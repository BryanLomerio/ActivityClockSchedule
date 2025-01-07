import React from 'react';

interface FormProps {
    newActivity: string;
    newStartTime: string;
    newEndTime: string;
    newColor: string;
    onActivityChange: React.Dispatch<React.SetStateAction<string>>;
    onStartTimeChange: React.Dispatch<React.SetStateAction<string>>;
    onEndTimeChange: React.Dispatch<React.SetStateAction<string>>;
    onColorChange: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: (e: React.FormEvent) => void;
}

//form

const ActivityForm: React.FC<FormProps> = ({
    newActivity, newStartTime, newEndTime, newColor,
    onActivityChange, onStartTimeChange, onEndTimeChange, onColorChange, onSubmit
}) => {
    return (
        <form onSubmit={onSubmit} className="add-activity-form">
            <input
                className='form-act'
                type="text"
                placeholder="Activity"
                value={newActivity}
                onChange={(e) => onActivityChange(e.target.value)}
                required
            />
            <input
                className='form-act'
                type="time"
                value={newStartTime}
                onChange={(e) => onStartTimeChange(e.target.value)}
                required
            />
            <input
                className='form-act'
                type="time"
                value={newEndTime}
                onChange={(e) => onEndTimeChange(e.target.value)}
            />
            <input
                className="form-act color-input"
                type="color"
                value={newColor}
                onChange={(e) => onColorChange(e.target.value)}
                placeholder="Color"
            />
            <button className='add-act-form' type="submit">Add Activity</button>
        </form>
    );
};

export default ActivityForm;
