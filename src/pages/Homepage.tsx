import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Award, TrendingUp, Briefcase, GraduationCap, Store } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useVoiceAssistant } from '../contexts/VoiceAssistantContext';

const Homepage: React.FC = () => {
  const { t } = useLanguage();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    speak(t('home.title') + '. ' + t('home.subtitle'));
  }, []);

  const features = [
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Connect with online and offline job opportunities tailored for women',
      link: '/jobs',
      color: 'from-primary-500 to-purple-600'
    },
    {
      icon: GraduationCap,
      title: 'Skill Training',
      description: 'Learn valuable skills through our comprehensive training programs',
      link: '/skills',
      color: 'from-accent-500 to-orange-600'
    },
    {
      icon: Store,
      title: 'Product Exhibition',
      description: 'Showcase and sell your handmade products through our platform',
      link: '/exhibition',
      color: 'from-green-500 to-teal-600'
    }
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Women Empowered' },
    { icon: Briefcase, number: '5,000+', label: 'Jobs Created' },
    { icon: GraduationCap, number: '500+', label: 'Skills Trained' },
    { icon: Award, number: '1,000+', label: 'Success Stories' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-800 mb-6 animate-slide-up">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('home.subtitle')}
            </p>
            
            {/* SDG 8 Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-accent-200 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Target className="h-5 w-5 text-accent-600" />
              <span className="font-medium text-neutral-800">{t('home.sdg.title')}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/jobs"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => speak(t('home.cta.jobs'))}
              >
                {t('home.cta.jobs')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/skills"
                className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-500 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => speak(t('home.cta.skills'))}
              >
                {t('home.cta.skills')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-neutral-800 mb-2">{stat.number}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
              Empowerment Through Action
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover opportunities, build skills, and showcase your talents through our comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 mb-6">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                  onClick={() => speak(feature.title)}
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-20 bg-gradient-to-r from-accent-500 to-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-8">
              <Target className="h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                {t('home.sdg.title')}
              </h2>
            </div>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              {t('home.sdg.description')}
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Building Sustainable Futures</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Join thousands of women who have transformed their lives through ShePath
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;