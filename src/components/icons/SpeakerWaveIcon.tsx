import React from 'react';

const SpeakerWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
        <path d="M14 3.23v17.54c0 .61-.37 1.16-.92 1.4-.21.09-.43.14-.66.14-.34 0-.67-.1-.94-.3L7.82 18H4c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h3.82l4.66-4.02c.57-.5 1.42-.54 2.05-.11.55.35.87.95.87 1.59zM20 11c-.55 0-1 .45-1 1s.45 1 1 1 1 .45 1 1-.45 1-1 1-1 .45-1 1 .45 1 1 1 .45-1 1-1-1-.45-1-1 1-.45 1-1-.45-1-1-1z" />
    </svg>
);

export default SpeakerWaveIcon;
