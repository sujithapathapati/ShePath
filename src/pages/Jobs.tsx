import React, { useState, useEffect } from 'react';
import {
  Search, Filter, MapPin, Clock, Briefcase,
  Heart, BookmarkIcon, ExternalLink
} from 'lucide-react';
import { useVoiceAssistant } from '../contexts/VoiceAssistantContext';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'online' | 'offline';
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  isBookmarked?: boolean;
}

const Jobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'online' | 'offline'>('online');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { speak } = useVoiceAssistant();

  const categories = [
    'all', 'Technology', 'Education', 'Healthcare',
    'Marketing', 'Customer Service', 'Handicrafts',
    'Food Service', 'Retail'
  ];

  // Fetch jobs from backend and map correctly
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs/');
        if (!response.ok) throw new Error('Failed to fetch jobs');

        const data = await response.json();

        const formattedJobs: Job[] = data.map((job: any) => ({
          id: job.id,
          title: job.title || "No Title",
          company: job.company || "Unknown Company",
          location: job.location || "REMOTE",
          type: job.type || "online", // fallback
          category: job.tags && job.tags[0] ? job.tags[0] : "Other",
          salary: job.salary || "Not Specified",
          description: job.description || "No Description",
          requirements: Array.isArray(job.requirements)
            ? job.requirements
            : typeof job.requirements === "string"
            ? job.requirements.split(',').map((req: string) => req.trim())
            : [],
          postedDate: job.posted_date || new Date().toISOString(),
        }));

        setJobs(formattedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesTab = job.type === activeTab;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
      || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  const toggleBookmark = (jobId: string) => {
    const updated = new Set(bookmarkedJobs);
    updated.has(jobId) ? updated.delete(jobId) : updated.add(jobId);
    setBookmarkedJobs(updated);
  };

  const handleApply = (job: Job) => {
    speak(`Applying for ${job.title} at ${job.company}`);
    alert(`Application submitted for ${job.title}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
          Job Opportunities
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Discover meaningful employment opportunities designed for women's empowerment
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('online')}
            className={`px-6 py-2 rounded-md font-medium ${
              activeTab === 'online'
                ? 'bg-primary-500 text-white'
                : 'text-neutral-600 hover:text-primary-600'
            }`}
          >
            Online Jobs
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`px-6 py-2 rounded-md font-medium ${
              activeTab === 'offline'
                ? 'bg-primary-500 text-white'
                : 'text-neutral-600 hover:text-primary-600'
            }`}
          >
            Offline Jobs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="lg:w-64 relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      {loading ? (
        <div className="text-center text-lg text-neutral-500 py-20">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral-600 mb-2">No jobs found</h3>
          <p className="text-neutral-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:shadow-lg transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-800">{job.title}</h3>
                      <p className="text-primary-600">{job.company}</p>
                    </div>
                    <button
                      onClick={() => toggleBookmark(job.id)}
                      className={`p-2 rounded-full ${
                        bookmarkedJobs.has(job.id)
                          ? 'text-red-500 bg-red-50'
                          : 'text-neutral-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${bookmarkedJobs.has(job.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</div>
                    <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{new Date(job.postedDate).toLocaleDateString()}</div>
                    <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                      {job.category}
                    </span>
                  </div>
                  <p className="text-neutral-700 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium text-neutral-800 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                      {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-lg font-semibold text-neutral-800">{job.salary}</div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApply(job)}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700"
                      >
                        <span>Apply Now</span>
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(job.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                          bookmarkedJobs.has(job.id)
                            ? 'border-red-500 text-red-500 bg-red-50'
                            : 'border-neutral-300 text-neutral-600 hover:border-primary-500 hover:text-primary-600'
                        }`}
                      >
                        <BookmarkIcon className="h-4 w-4" />
                        <span>{bookmarkedJobs.has(job.id) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Alerts CTA */}
      <div className="mt-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Get Job Alerts</h3>
        <p className="mb-6 opacity-90">
          Stay updated with the latest job opportunities matching your skills and interests
        </p>
        <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-50">
          Enable Notifications
        </button>
      </div>
    </div>
  );
};

export default Jobs;
