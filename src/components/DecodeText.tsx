import { useState, useEffect } from 'react';

/**
 * DecodeText - A cyberpunk glitch/decoding text reveal effect.
 * Slowly resolves random characters into the final provided text.
 */
export default function DecodeText({ text, speed = 40, delay = 0, className = "" }: { text: string, speed?: number, delay?: number, className?: string }) {
  const [displayText, setDisplayText] = useState('');
  const chars = '01#@$%&*!?<>_+-=/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    // Reset initial state depending on text length
    setDisplayText(Array(text.length).fill('').join(''));

    timeoutId = setTimeout(() => {
      let iteration = 0;
      
      intervalId = setInterval(() => {
        setDisplayText(() => {
          let updatedStr = '';
          for (let i = 0; i < text.length; i++) {
            // Un-glitch sequentially Left-to-Right
            if (i < iteration) {
              updatedStr += text[i];
            } else if (text[i] === ' ') {
              updatedStr += ' '; // Preserve spaces immediately
            } else {
              updatedStr += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          return updatedStr;
        });

        // The pacing controls how quickly it resolves. E.g., solve 1 char per 3 ticks.
        iteration += 1 / 3;

        // Cleanup when fully resolved
        if (iteration >= text.length) {
          clearInterval(intervalId);
          setDisplayText(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return <span className={className}>{displayText}</span>;
}
