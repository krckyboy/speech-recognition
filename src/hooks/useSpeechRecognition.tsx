import { useEffect, useRef, useState } from 'react';

export const DEFAULT_BUTTON_TEXT = 'Start Voice Input';
export const LOADING_BUTTON_TEXT = 'Listening...';

export const BrowserSpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition;

type UseSpeechRecognitionReturn = {
  output: string;
  isListening: boolean;
  startListening: () => void;
};

export const useSpeechRecognition = (lang = 'en-US'): UseSpeechRecognitionReturn => {
  const [output, setOutput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(new (BrowserSpeechRecognition)());

  useEffect(() => {
    const currentRecognition = recognition.current;
    currentRecognition.lang = lang;

    currentRecognition.onstart = () => setIsListening(true);
    currentRecognition.onresult = (event) => setOutput(event.results[0][0].transcript);
    currentRecognition.onend = () => setIsListening(false);
    currentRecognition.onerror = (event) => {
      setOutput(`Error: ${event.error}`);
      setIsListening(false);
    };

    return () => {
      currentRecognition.onstart = null;
      currentRecognition.onresult = null;
      currentRecognition.onend = null;
      currentRecognition.onerror = null;
    };
  }, [lang]);

  const startListening = () => recognition.current.start();

  return { output, isListening, startListening };
};