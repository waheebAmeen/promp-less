import { useState, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';

export function useVoice() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = 'ar-SA'; // Default to Arabic, but it usually adapts or can be configured
        setRecognition(recog);
      }
    }
  }, []);

  const startListening = useCallback((initialText: string, onResult: (text: string) => void, onError?: () => void) => {
    if (!recognition) return;

    try {
      let finalTranscript = '';
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        const combinedVoice = (finalTranscript + interimTranscript).trim();
        const separator = initialText.trim() && combinedVoice ? ' ' : '';
        onResult(initialText.trim() + separator + combinedVoice);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (onError) onError();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
}
