import React from 'react';
import { DateTime } from 'luxon';
import Dog from '../assets/dog.gif';
import { calculateHourPosition, calculateLinePosition, calculatePosition, calculateHourHand, calculateMinuteHand, calculateSecondHand } from '../helpers/clockUtils';

const ClockFace: React.FC<{ scheduleData: any[], currentTime: DateTime }> = ({ scheduleData, currentTime }) => {
    const jsDate = currentTime.toJSDate();

    return (
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
                            backgroundColor: item.activity === "sleep" ? 'transparent' : item.color,
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

            <div className="clock-hand hour-hand" style={calculateHourHand(jsDate)}></div>
            <div className="clock-hand minute-hand" style={calculateMinuteHand(jsDate)}></div>
            <div className="second-hand" style={calculateSecondHand(jsDate)}></div>

            <div className="clock-center">START</div>
        </div>
    );
};

export default ClockFace;
