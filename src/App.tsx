import { useEffect, useRef, useState } from 'react';

function App() {
  const [output, setOutput] = useState('');
  const [buttonText, setButtonText] = useState('Start Voice Input');
  const recognition = useRef(new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)());

  const handleClick = () => {
    recognition.current.start();
  };

  useEffect(() => {
    recognition.current.lang = 'en-US';

    recognition.current.onstart = () => {
      setButtonText('Listening...');
      setOutput('');
    };

    recognition.current.onresult = (event) => {
      setOutput(event.results[0][0].transcript);
    };

    recognition.current.onend = () => {
      setButtonText('Start Voice Input');
    };
  }, []);

  return (
    <div className={'w-full flex justify-center items-center p-2 h-full bg-gray-800'}>
      <div className="container mx-auto flex gap-6 flex-col justify-center items-center">
        <p className={'text-gray-300 text-left w-full'}>{output}</p>
        <button
          onClick={handleClick}
          className={'bg-cyan-700 text-gray-300 flex-1 flex-grow-0 flex items-center justify-center p-2 w-full'}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default App;
