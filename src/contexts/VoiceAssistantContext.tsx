import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VoiceAssistantContextType {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  speak: (text: string) => void;
  isSupported: boolean;
}

const VoiceAssistantContext = createContext<VoiceAssistantContextType | undefined>(undefined);

export const VoiceAssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const isSupported = 'speechSynthesis' in window;

  const speak = (text: string) => {
    if (isEnabled && isSupported) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <VoiceAssistantContext.Provider value={{
      isEnabled,
      setIsEnabled,
      speak,
      isSupported
    }}>
      {children}
    </VoiceAssistantContext.Provider>
  );
};

export const useVoiceAssistant = () => {
  const context = useContext(VoiceAssistantContext);
  if (context === undefined) {
    throw new Error('useVoiceAssistant must be used within a VoiceAssistantProvider');
  }
  return context;
};