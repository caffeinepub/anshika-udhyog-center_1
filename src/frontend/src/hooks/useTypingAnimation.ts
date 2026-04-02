import { useEffect, useState } from "react";

const PHRASES = [
  "Empowering Women \ud83d\udcaa",
  "Building India \ud83c\uddee\ud83c\uddf3",
  "Self Reliance \ud83c\udf31",
  "\u0906\u0924\u094d\u092e\u0928\u093f\u0930\u094d\u092d\u0930 \u092d\u093e\u0930\u0924 \ud83c\udfc6",
];

export function useTypingAnimation() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(PHRASES[0]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setIsFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayText(PHRASES[phraseIndex]);
  }, [phraseIndex]);

  return { displayText, isFading };
}
