import React from 'react';

const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
        <path d="M9 21h6v-1H9v1zm3-20C8.14 1 5 4.14 5 8c0 2.6 1.22 4.87 3.09 6.32C8.62 15.01 9 15.96 9 17h6c0-1.04.38-1.99.91-2.68C17.78 12.87 19 10.6 19 8c0-3.86-3.14-7-7-7zm4 14h-8v-1c0-1.16.47-2.23 1.3-3.01C8.98 11.03 9 10.78 9 10.53 9 10.18 8.82 9.77 8.63 9.44 8.44 9.1 8.22 8.81 8 8.5c.78-.83 1.37-1.85 1.37-3 0-1.33 1.07-2.4 2.4-2.4 1.33 0 2.4 1.07 2.4 2.4 0 1.15-.59 2.17-1.37 3-.22.31-.44.6-.63.94-.19.33-.37.74-.37 1.09 0 .25.02.5.03.75.83.78 1.3 1.85 1.3 3v1z" />
    </svg>
);

export default LightBulbIcon;
