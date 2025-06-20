// src/components/Typing.jsx
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export const Typing = () => {
  return (
    <TypeAnimation
      className="text-white text-6xl px-3"
      sequence={['Mobile', 3000, 'Web', 3000, 'AI', 3000, 'More', 3000]}
      wrapper="span"
      speed={10}
      repeat={Infinity}
    />
  );
};

