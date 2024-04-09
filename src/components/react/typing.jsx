import { TypeAnimation } from 'react-type-animation';

export const Typing = () => {
  return (
    <TypeAnimation className='text-white'
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Mobile Apps in Flutter',
        1000,
        'Beautiful Website in Astro',
        1000,
        'SaaS in Django and Vuejs',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};
