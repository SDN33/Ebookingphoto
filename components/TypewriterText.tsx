import React, { useState, useEffect } from 'react';
import { RotatingTextProps } from '../types';

const TypewriterText: React.FC<RotatingTextProps> = ({
  words,
  interval = 2000, // Durée de la pause une fois le mot écrit
  className = "",
  gradientFrom = "from-black",
  gradientTo = "to-black"
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    // Safety check
    if (!words || words.length === 0) return;

    const i = loopNum % words.length;
    const fullText = words[i];

    const handleType = () => {
      setText(current => {
        if (isDeleting) {
          return fullText.substring(0, current.length - 1);
        } else {
          return fullText.substring(0, current.length + 1);
        }
      });

      // Vitesse de frappe vs Vitesse d'effacement
      let typeSpeed = isDeleting ? 40 : 100;

      if (!isDeleting && text === fullText) {
        // Le mot est complet, on attend (interval) avant d'effacer
        typeSpeed = interval; 
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        // Le mot est effacé, on passe au suivant
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 300; // Petite pause avant de commencer à écrire le nouveau
      }

      setTypingSpeed(typeSpeed);
    };

    const timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words, interval]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span 
        className={`
          bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo}
          leading-tight pb-1
        `}
      >
        {text}
      </span>
      <span 
        className={`
          inline-block w-[3px] h-[1em] ml-1 align-middle
          bg-gradient-to-b ${gradientFrom} ${gradientTo}
          animate-cursor-blink
        `}
      ></span>
    </span>
  );
};

export default TypewriterText;

