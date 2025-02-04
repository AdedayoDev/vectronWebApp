import { useEffect, useState } from "react";
import Particles from "react-tsparticles";

const FloatingParticles = () => {
  return (
    <Particles
      className="absolute inset-0 z-10" // Above overlay but below text
      options={{
        particles: {
          number: { value: 50 },
          size: { value: 3 },
          move: { speed: 2, direction: "top", outMode: "out" },
        },
      }}
    />
  );
};

export default FloatingParticles;
