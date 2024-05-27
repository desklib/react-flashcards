import React from 'react';

const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
        <path d="M6 2v19.54l6-5.27 6 5.27V2H6zm12-2H6C4.9 0 4 .9 4 2v22l8-7 8 7V2c0-1.1-.9-2-2-2z" />
    </svg>
);

export default BookmarkIcon;
