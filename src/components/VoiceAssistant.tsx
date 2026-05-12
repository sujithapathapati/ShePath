import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useVoiceAssistant } from '../contexts/VoiceAssistantContext';

const VoiceAssistant: React.FC = () => {
  const { isEnabled, setIsEnabled, isSupported } = useVoiceAssistant();

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
          isEnabled
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
        }`}
        title={isEnabled ? 'Disable Voice Assistant' : 'Enable Voice Assistant'}
      >
        {isEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default VoiceAssistant;