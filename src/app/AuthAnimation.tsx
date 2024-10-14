import { useState, useEffect } from 'react';
import { Fingerprint, Lock, ShieldCheck, KeyRound } from 'lucide-react';


const AuthAnimation = () => {
  const [activeIcon, setActiveIcon] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const icons = [
    { Icon: Fingerprint, color: "#E26178" },
    { Icon: ShieldCheck, color: "#E26178" },
    { Icon: Lock, color: "#E26178" },
    { Icon: KeyRound, color: "#E26178" }
  ];
  
  return (
    <div className="flex justify-center items-center mb-6">
      <div className="relative w-9 h-9 flex justify-center items-center">
        {icons.map(({ Icon, color }, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-500 ${
              activeIcon === index 
                ? "opacity-100 transform scale-100" 
                : "opacity-0 transform scale-75"
            }`}
          >
            <Icon 
              size={48} 
              color={color}
              className={`animate-bounce ${
                activeIcon === index ? "animate-duration-1000" : ""
              }`}
            />
          </div>
        ))}
        <div className="absolute w-14 h-14 rounded-full border-2 border-[#E26178] animate-pulse" />
      </div>
    </div>
  );
};

export default AuthAnimation;