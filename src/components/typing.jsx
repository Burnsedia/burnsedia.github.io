import { TypeAnimation } from 'react-type-animation';

export const Typing = () => {
  return (
    <TypeAnimation className='text-white'
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Games in Godot',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Mobile Apps in Flutter',
        1000,
        'CLI Tools in Rust',
        1000,
        'SaaS in Django',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};
