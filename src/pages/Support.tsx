import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, HelpCircle, Users, FileText, Send, Clock, CheckCircle } from 'lucide-react';
import { useVoiceAssistant } from '../contexts/VoiceAssistantContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const Support: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const { speak } = useVoiceAssistant();

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      description: 'Get instant help via WhatsApp',
      action: 'Chat Now',
      color: 'from-green-500 to-green-600',
      contact: '+91 9876543210'
    },
    {
      icon: Phone,
      title: 'Call Helpline',
      description: '24/7 support hotline',
      action: 'Call Now',
      color: 'from-blue-500 to-blue-600',
      contact: '1800-123-HELP'
    },
    {
      icon: Users,
      title: 'Local Volunteer',
      description: 'Connect with community volunteers',
      action: 'Find Volunteer',
      color: 'from-purple-500 to-purple-600',
      contact: 'Find nearby'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your queries',
      action: 'Send Email',
      color: 'from-primary-500 to-primary-600',
      contact: 'support@shepath.org'
    }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I register on ShePath?',
      answer: 'Click on the "Register" button in the top navigation, fill out the form with your personal details, interests, and create an account. You will receive a welcome email with further instructions.',
      category: 'account'
    },
    {
      id: '2',
      question: 'How can I apply for jobs?',
      answer: 'Browse jobs in the Jobs section, filter by online/offline and category, then click "Apply Now" on any job that interests you. Make sure your profile is complete for better chances.',
      category: 'jobs'
    },
    {
      id: '3',
      question: 'What skills training is available?',
      answer: 'We offer courses in digital skills, traditional crafts, business skills, and communication. All courses are designed specifically for women and include practical training.',
      category: 'skills'
    },
    {
      id: '4',
      question: 'How do I register my products for exhibition?',
      answer: 'Go to the Exhibition section and click "Register Your Product". Fill out the form with product details, images, and contact information. Our team will review and list your product.',
      category: 'exhibition'
    },
    {
      id: '5',
      question: 'Is there any cost for using ShePath?',
      answer: 'ShePath is completely free for all women. There are no charges for registration, job applications, skill training enrollment, or product listings.',
      category: 'general'
    },
    {
      id: '6',
      question: 'How can I contact potential employers?',
      answer: 'When you apply for a job, your application is sent directly to the employer. They will contact you if you are shortlisted. You can also check your application status in your profile.',
      category: 'jobs'
    },
    {
      id: '7',
      question: 'Can I update my profile information?',
      answer: 'Yes, you can update your profile anytime by going to the Profile section. Keep your information updated to receive relevant job and training recommendations.',
      category: 'account'
    },
    {
      id: '8',
      question: 'How do I track my course progress?',
      answer: 'Your enrolled courses and progress are visible in the Skills section. You can also access course materials and track completion status from your profile.',
      category: 'skills'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'account', label: 'Account & Profile' },
    { value: 'jobs', label: 'Jobs & Applications' },
    { value: 'skills', label: 'Skills & Training' },
    { value: 'exhibition', label: 'Product Exhibition' },
    { value: 'general', label: 'General' }
  ];

  const filteredFAQs = faqs.filter(faq => 
    selectedCategory === 'all' || faq.category === selectedCategory
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    speak(`Support request submitted for ${contactForm.subject}`);
    alert('Your message has been sent! We will get back to you within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: 'general'
    });
    setShowContactForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupportAction = (option: any) => {
    speak(`Connecting to ${option.title}`);
    if (option.title === 'WhatsApp Support') {
      window.open(`https://wa.me/${option.contact.replace(/[^0-9]/g, '')}`, '_blank');
    } else if (option.title === 'Call Helpline') {
      window.open(`tel:${option.contact}`, '_blank');
    } else if (option.title === 'Email Support') {
      setShowContactForm(true);
    } else {
      alert('Feature coming soon! We are connecting you with local volunteers.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
          Support & Help Center
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          We're here to help you succeed. Get support through multiple channels and find answers to common questions.
        </p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 text-center border border-neutral-100"
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${option.color} rounded-xl mb-4`}>
              <option.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">{option.title}</h3>
            <p className="text-neutral-600 text-sm mb-4">{option.description}</p>
            <p className="text-xs text-neutral-500 mb-4">{option.contact}</p>
            <button
              onClick={() => handleSupportAction(option)}
              className={`w-full px-4 py-2 bg-gradient-to-r ${option.color} text-white rounded-lg hover:opacity-90 transition-opacity font-medium`}
            >
              {option.action}
            </button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-primary-600 mr-2" />
              <span className="text-2xl font-bold text-neutral-800">{'< 2 hrs'}</span>
            </div>
            <p className="text-neutral-600">Average Response Time</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-neutral-800">98%</span>
            </div>
            <p className="text-neutral-600">Issue Resolution Rate</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-accent-600 mr-2" />
              <span className="text-2xl font-bold text-neutral-800">24/7</span>
            </div>
            <p className="text-neutral-600">Support Availability</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600">
            Find quick answers to common questions about ShePath
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md border border-neutral-100">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <h3 className="font-medium text-neutral-800">{faq.question}</h3>
                  </div>
                  <div className="text-primary-500 group-open:rotate-180 transition-transform">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Button */}
      <div className="text-center">
        <p className="text-neutral-600 mb-4">
          Can't find what you're looking for?
        </p>
        <button
          onClick={() => setShowContactForm(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
        >
          <FileText className="h-5 w-5 mr-2" />
          Send us a Message
        </button>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">Contact Support</h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-neutral-500 hover:text-neutral-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      value={contactForm.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="account">Account Issues</option>
                      <option value="jobs">Job Related</option>
                      <option value="skills">Skills Training</option>
                      <option value="exhibition">Product Exhibition</option>
                      <option value="technical">Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Please describe your issue or question in detail..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;