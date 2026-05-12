import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, Play, CheckCircle, Award } from 'lucide-react';
import { useVoiceAssistant } from '../contexts/VoiceAssistantContext';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  thumbnail: string;
  skills: string[];
  modules: string[];
  isEnrolled?: boolean;
  progress?: number;
  status?: 'not_started' | 'ongoing' | 'completed';
  link:string[];
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const { speak } = useVoiceAssistant();

  const categories = [
    'all',
    'Digital Skills',
    'Traditional Crafts',
    'Business Skills',
    'Communication',
    'Technical Skills'
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Basic Computer Skills',
      description: 'Learn essential computer skills including typing, internet browsing, and basic software usage.',
      instructor: 'Prathap varma',
      duration: '4 weeks',
      level: 'Beginner',
      rating: 4.8,
      students: 1,
      thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Typing', 'Internet Browsing', 'Email', 'Basic Software'],
      modules: ['Introduction to Computers', 'Typing Practice', 'Internet Basics', 'Email Communication'],
      status: 'not_started',
      link:'https://youtu.be/_peDD5zOs-E?si=gJmuVsuARv8xzGvO'
    },
    {
      id: '2',
      title: 'Traditional Embroidery',
      description: 'Master the art of traditional Indian embroidery techniques and create beautiful handicrafts.',
      instructor: 'Lavanya',
      duration: '6 weeks',
      level: 'Intermediate',
      rating: 4.9,
      students: 856,
      thumbnail: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Hand Embroidery', 'Design Patterns', 'Color Theory', 'Quality Control'],
      modules: ['Basic Stitches', 'Pattern Design', 'Advanced Techniques', 'Market Preparation'],
      status: 'not_started',
      link :'https://youtu.be/2VP9yOYUGoI?si=acmein-Xd291_3BS'
    },
    {
      id: '3',
      title: 'Digital Marketing Basics',
      description: 'Start your journey in digital marketing with social media, content creation, and basic advertising.',
      instructor: 'Ravi Kiran',
      duration: '5 weeks',
      level: 'Beginner',
      rating: 4.7,
      students: 2134,
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Social Media Marketing', 'Content Creation', 'Basic Analytics', 'Online Advertising'],
      modules: ['Social Media Platforms', 'Content Strategy', 'Analytics Basics', 'Advertising Fundamentals'],
      status: 'not_started',
      link :'https://youtu.be/wWosrNn73mQ?si=_Si70jdQ4pN1FX-y'
    },
    {
      id: '4',
      title: 'Home-based Food Business',
      description: 'Learn to start and manage a successful home-based food business with proper licensing and marketing.',
      instructor: 'Lohith',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: 967,
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Food Safety', 'Business Planning', 'Marketing', 'Financial Management'],
      modules: ['Food Safety Regulations', 'Business Setup', 'Recipe Standardization', 'Marketing Strategies'],
      status: 'not_started',
      link:'https://youtu.be/9FNSwPfQPDU?si=EZWTobAT7e6yHqtF'
    },
    {
      id: '5',
      title: 'English Communication',
      description: 'Improve your English speaking and writing skills for better job opportunities and confidence.',
      instructor: 'Ganesh',
      duration: '10 weeks',
      level: 'Beginner',
      rating: 4.6,
      students: 1876,
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Speaking Confidence', 'Grammar', 'Vocabulary', 'Professional Communication'],
      modules: ['Basic Grammar', 'Conversation Practice', 'Professional Writing', 'Presentation Skills'],
      status: 'not_started',
      link :'https://youtu.be/LXbrlEFis8I?si=gs9ctc0ggFMAZlj9'
    },
    {
      id: '6',
      title: 'Tailoring & Fashion Design',
      description: 'Master professional tailoring techniques and basic fashion design principles.',
      instructor: 'Sharanya',
      duration: '12 weeks',
      level: 'Advanced',
      rating: 4.9,
      students: 543,
      thumbnail: 'https://images.pexels.com/photos/8292939/pexels-photo-8292939.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Pattern Making', 'Garment Construction', 'Fitting', 'Design Basics'],
      modules: ['Pattern Drafting', 'Cutting Techniques', 'Sewing Methods', 'Finishing Touches'],
      status: 'not_started',
      link :'https://youtu.be/JvMISocPVaw?si=oIMieEkh1P2pvFuK'
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (selectedCategory === 'all') return true;
    
    const categoryMap: Record<string, string[]> = {
      'Digital Skills': ['Basic Computer Skills', 'Digital Marketing Basics'],
      'Traditional Crafts': ['Traditional Embroidery', 'Tailoring & Fashion Design'],
      'Business Skills': ['Home-based Food Business', 'Digital Marketing Basics'],
      'Communication': ['English Communication'],
      'Technical Skills': ['Basic Computer Skills']
    };
    
    return categoryMap[selectedCategory]?.includes(course.title);
  });

   const handleEnroll = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      speak(`Enrolling in ${course.title} course`);
      const newEnrolled = new Set(enrolledCourses);
      newEnrolled.add(courseId);
      setEnrolledCourses(newEnrolled);

      // ✅ Open YouTube link in new tab
      window.open(course.link, '_blank');
    }
  };


  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
          Skill Training Programs
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Build valuable skills that open doors to new opportunities and economic independence
        </p>
      </div>

      {/* Achievement Banner */}
      {enrolledCourses.size > 0 && (
        <div className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8" />
            <div>
              <h3 className="text-lg font-semibold">Learning Journey Started!</h3>
              <p className="opacity-90">You're enrolled in {enrolledCourses.size} course{enrolledCourses.size > 1 ? 's' : ''}. Keep up the great work!</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-200'
              }`}
            >
              {category === 'all' ? 'All Courses' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-neutral-100"
          >
            {/* Course Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
              {enrolledCourses.has(course.id) && (
                <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Course Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {course.title}
              </h3>
              <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Course Meta */}
              <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(course.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{course.rating}</span>
              </div>

              {/* Skills Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {course.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 3 && (
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                      +{course.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Instructor */}
              <p className="text-sm text-neutral-600 mb-4">
                Instructor: <span className="font-medium">{course.instructor}</span>
              </p>

              {/* Action Button */}
              <div className="flex gap-2">
                {enrolledCourses.has(course.id) ? (
                  <div className="flex-1">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium">
                      <CheckCircle className="h-4 w-4" />
                      <span>Enrolled</span>
                    </button>
                    <button className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                      <Play className="h-4 w-4" />
                      <span>Continue Learning</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Enroll Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Success Stories Section */}
      <div className="mt-16 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-neutral-800 text-center mb-8">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">RS</span>
              </div>
              <div>
                <h4 className="font-semibold">Rajitha S.</h4>
                <p className="text-sm text-neutral-600">Digital Marketing Graduate</p>
              </div>
            </div>
            <p className="text-neutral-700 text-sm">
              "After completing the digital marketing course, I started my own consultancy and now earn ₹30,000+ monthly!"
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <span className="text-accent-600 font-semibold">MP</span>
              </div>
              <div>
                <h4 className="font-semibold">Meera P.</h4>
                <p className="text-sm text-neutral-600">Tailoring Expert</p>
              </div>
            </div>
            <p className="text-neutral-700 text-sm">
              "The tailoring course helped me open my own boutique. I now employ 5 other women from my community!"
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">LK</span>
              </div>
              <div>
                <h4 className="font-semibold">Lakshmi K.</h4>
                <p className="text-sm text-neutral-600">Food Business Owner</p>
              </div>
            </div>
            <p className="text-neutral-700 text-sm">
              "Started with home cooking classes and now supply to 3 restaurants. The business course was life-changing!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;