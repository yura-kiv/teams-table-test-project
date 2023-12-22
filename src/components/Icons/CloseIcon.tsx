import React from "react";

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title />
      <g id="cross">
        <line
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2px"
          x1="7"
          x2="25"
          y1="7"
          y2="25"
        />
        <line
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2px"
          x1="7"
          x2="25"
          y1="25"
          y2="7"
        />
      </g>
    </svg>
  );
};

export default CloseIcon;
