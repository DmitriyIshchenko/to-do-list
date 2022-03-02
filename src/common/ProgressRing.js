import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function ProgressRing(props) {

    const { radius, strokeWidth, progress, strokeColor, icon } = props;
    const normalizedRadius = radius - strokeWidth;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress / 100 * circumference;

    return <svg
        height={radius * 2}
        width={radius * 2}>

        <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            style={{ opacity: 0.2 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius} />

        <svg height="40%" y="30%">
            <FontAwesomeIcon icon={icon} style={{ color: strokeColor }} />
        </svg>

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
