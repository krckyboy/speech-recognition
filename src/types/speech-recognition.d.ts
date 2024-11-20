declare global {
  interface Window {
    SpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  }

  interface SpeechRecognition {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onaudiostart: (event: Event) => void;
    onaudioend: (event: Event) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onstart: (event: Event) => void;
    onend: (event: Event) => void;
    onsoundstart: (event: Event) => void;
    onsoundend: (event: Event) => void;
    onspeechstart: (event: Event) => void;
    onspeechend: (event: Event) => void;
  }

  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }
}

// Make sure to export nothing so it's treated as a global declaration
export {};
