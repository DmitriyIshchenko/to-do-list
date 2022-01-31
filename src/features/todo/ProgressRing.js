import React from 'react';

export default function ProgressRing(props) {

    const { radius, strokeWidth, progress, strokeColor } = props;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress / 100 * circumference;

    return <svg
        className='progress-ring'
        height={radius * 2}
        width={radius * 2}>
        <circle
            stroke={strokeColor}
            fill="transparent"
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 0.35s" }}
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius} />
    </svg>;
}
