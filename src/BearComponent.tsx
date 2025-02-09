import React from 'react';

export const ValentineBear = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="200"
      height="200"
      style={{ background: 'pink' }}
    >
      {/* Bear Head */}
      <circle cx="100" cy="100" r="50" fill="brown" />
      {/* Bear Ears */}
      <circle cx="70" cy="70" r="20" fill="brown" />
      <circle cx="130" cy="70" r="20" fill="brown" />
      {/* Bear Eyes */}
      <circle cx="85" cy="90" r="5" fill="white" />
      <circle cx="115" cy="90" r="5" fill="white" />
      {/* Bear Nose */}
      <ellipse cx="100" cy="110" rx="10" ry="5" fill="black" />
      {/* Bear Mouth */}
      <path
        d="M90 120 Q100 130 110 120"
        stroke="black"
        strokeWidth="2"
        fill="transparent"
      />
      {/* Heart */}
      <path
        id="heart"
        d="M100 140 Q120 120 140 140 Q120 160 100 180 Q80 160 60 140 Q80 120 100 140 Z"
        fill="red"
        transform="scale(0.5)"
        transformOrigin="100 100"
      >
        <animateTransform
          attributeName="transform"
          type="scale"
          values="0.5; 0.6; 0.5"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
  
  export default ValentineBear;