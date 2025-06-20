import Typewriter from 'typewriter-effect';

export const Typing = () => {
  return (
    <div className="text-white text-6xl px-3">
      <Typewriter
        options={{
          strings: ['Mobile', 'Web'],
          autoStart: true,
          loop: true,
          delay: 75, // typing speed in ms
          deleteSpeed: 50,
          pauseFor: 2000, // pause before deleting
        }}
      />
    </div>
  );
};

