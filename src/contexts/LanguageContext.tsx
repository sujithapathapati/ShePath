import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.jobs': 'Jobs',
    'nav.skills': 'Skills',
    'nav.exhibition': 'Exhibition',
    'nav.support': 'Support',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.profile': 'Profile',
    
    // Homepage
    'home.title': 'Empowering Women Through Opportunities',
    'home.subtitle': 'ShePath connects women with job opportunities, skill training, and exhibition platforms',
    'home.sdg.title': 'Supporting SDG 8: Decent Work and Economic Growth',
    'home.sdg.description': 'We promote sustained, inclusive economic growth, employment and decent work for all women',
    'home.cta.jobs': 'View Jobs',
    'home.cta.skills': 'Learn Skills',
    'home.cta.exhibition': 'Register Product',
    
    // Common
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.apply': 'Apply',
    'common.enroll': 'Enroll',
    'common.register': 'Register',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.jobs': 'ఉద్యోగాలు',
    'nav.skills': 'నైపుణ్యాలు',
    'nav.exhibition': 'ప్రదర్శన',
    'nav.support': 'సహాయం',
    'nav.login': 'లాగిన్',
    'nav.register': 'రిజిస్టర్',
    'nav.profile': 'ప్రొఫైల్',
    
    // Homepage
    'home.title': 'అవకాశాల ద్వారా మహిళలను శక్తివంతం చేయడం',
    'home.subtitle': 'షీపాత్ మహిళలను ఉద్యోగ అవకాశాలు, నైపుణ్య శిక్షణ మరియు ప్రదర్శన వేదికలతో కలుపుతుంది',
    'home.sdg.title': 'SDG 8కి మద్దతు: మంచి పని మరియు ఆర్థిక వృద్ధి',
    'home.sdg.description': 'మేము అన్ని మహిళలకు స్థిర, సమ్మిళిత ఆర్థిక వృద్ధి, ఉపాధి మరియు మంచి పనిని ప్రోత్సహిస్తాము',
    'home.cta.jobs': 'ఉద్యోగాలు చూడండి',
    'home.cta.skills': 'నైపుణ్యాలు నేర్చుకోండి',
    'home.cta.exhibition': 'ఉత్పత్తిని నమోదు చేయండి',
    
    // Common
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.submit': 'సమర్పించు',
    'common.cancel': 'రద్దు చేయి',
    'common.save': 'సేవ్ చేయి',
    'common.edit': 'సవరించు',
    'common.delete': 'తొలగించు',
    'common.apply': 'దరఖాస్తు చేయి',
    'common.enroll': 'నమోదు చేయి',
    'common.register': 'రిజిస్టర్ చేయి',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'te'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};