export function calculateHourPosition(hour: number) {
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

export function calculateLinePosition(hour: number) {
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

export function calculatePosition(time: string) {
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

export function calculateHourHand(time: Date) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const angle = (hours * 15) + (minutes * 0.25) - 360;

    return {
        transform: `rotate(${angle}deg)`,
        position: "absolute" as const,
        left: "50%",
        transformOrigin: "bottom center",
    };
}

export function calculateMinuteHand(time: Date) {
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const angle = (minutes * 6) + (seconds * 0.1) - 360;

    return {
        transform: `rotate(${angle}deg)`,
        position: "absolute" as const,
        bottom: "50%",
        left: "50%",
        transformOrigin: "bottom center",
    };
}

export function calculateSecondHand(time: Date) {
    const seconds = time.getSeconds();
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
