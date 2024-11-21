import { useEffect, useRef, useState } from 'react';

const DEFAULT_BUTTON_TEXT = 'Start Voice Input';
const LOADING_BUTTON_TEXT = 'Listening...';
const BrowserSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

function App() {
  const [output, setOutput] = useState('');
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
  const recognition = useRef(new (BrowserSpeechRecognition)());

  const handleClick = () => {
    recognition.current.start();
  };

  useEffect(() => {
    recognition.current.lang = 'en-US';

    recognition.current.onstart = () => {
      setButtonText(LOADING_BUTTON_TEXT);
      setOutput('');
    };

    recognition.current.onresult = (event) => {
      setOutput(event.results[0][0].transcript);
    };

    recognition.current.onend = () => {
      setButtonText(DEFAULT_BUTTON_TEXT);
    };

    recognition.current.onerror = (event) => {
      setOutput(`Error: ${event.error}`);
      setButtonText(DEFAULT_BUTTON_TEXT);
    };
  }, []);

  if (!BrowserSpeechRecognition) {
    return <p className="text-red-500">Your browser does not support Speech Recognition.</p>;
  }

  return (
    <div className={'w-full flex justify-center items-center p-2 h-full bg-gray-800'}>
      <div className="container mx-auto flex gap-6 flex-col justify-center items-center">
        <button
          onClick={handleClick}
          aria-live="polite"
          aria-pressed={buttonText === LOADING_BUTTON_TEXT}
          className={'bg-cyan-700 text-gray-300 flex-1 flex-grow-0 flex items-center justify-center p-2'}
        >
          {buttonText}
        </button>
        <p className={'text-gray-300 w-full text-center'}>{output}</p>
      </div>
    </div>
  );
}

export default App;
