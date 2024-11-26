import { TypeAnimation } from 'react-type-animation';

export const Typing = () => {
  return (
    <TypeAnimation className='text-white text-6xl px-3'
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Mobile',
        3000,
        'Web',
        3000,
        '$997/m',
        3000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: 'text-2xl', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};
