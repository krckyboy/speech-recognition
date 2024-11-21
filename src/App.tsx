import {
  BrowserSpeechRecognition,
  DEFAULT_BUTTON_TEXT,
  LOADING_BUTTON_TEXT,
  useSpeechRecognition
} from './hooks/useSpeechRecognition.tsx';

function App() {
  const { output, isListening, startListening } = useSpeechRecognition();

  if (!BrowserSpeechRecognition) {
    return (
      <div className={'w-full flex justify-center items-center p-2 h-full bg-gray-800'}>
        <div className="container mx-auto flex gap-6 flex-col justify-center items-center">
          <div className="text-center p-4">
            <p className="text-red-500">Your browser does not support Speech Recognition.</p>
            <p className="text-white">Please use a modern browser like Chrome.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={'w-full flex justify-center items-center p-2 h-full bg-gray-800'}>
      <div className="container mx-auto flex gap-6 flex-col justify-center items-center">
        <button
          onClick={startListening}
          aria-live="polite"
          aria-pressed={isListening}
          className={'bg-cyan-700 text-white flex-1 flex-grow-0 flex items-center justify-center px-4 py-2'}
        >
          {isListening ? LOADING_BUTTON_TEXT : DEFAULT_BUTTON_TEXT}
        </button>
        <p className={'text-white w-full text-center'}>{output}</p>
      </div>
    </div>
  );
}

export default App;
