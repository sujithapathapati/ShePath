import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Eye, Users,
  Briefcase, TrendingUp, Calendar,
  Search, Filter
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import JobPostingForm from './JobPostingForm';
import { Job } from '../../types';

export default function EmployerDashboard() {
  const { state, dispatch } = useApp();
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'closed'>('all');

  // 🔹 Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs/');
        const data = await response.json();

        dispatch({ type: 'SET_JOBS', payload: data }); // 🔸 update global jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [dispatch]);

  const employerJobs = state.jobs.filter(job => job.employerId === state.employer?.id);

  const filteredJobs = employerJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      dispatch({ type: 'DELETE_JOB', payload: jobId });
    }
  };

  const handleCloseForm = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const stats = [
    { icon: Briefcase, value: employerJobs.length.toString(), label: 'Jobs Posted' },
    { icon: Users, value: employerJobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0).toString(), label: 'Applications' },
    { icon: TrendingUp, value: employerJobs.filter(job => job.status === 'active').length.toString(), label: 'Active Jobs' },
    { icon: Calendar, value: '15', label: 'Avg. Fill Days' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe4e6] to-[#fff7f8] px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-charcoal-900">Welcome, {state.employer?.contactPerson || 'Employer'} 👋</h1>
            <p className="text-charcoal-600 mt-1 text-lg">Manage your job postings and applications below.</p>
          </div>
          <button
            onClick={() => setShowJobForm(true)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-plum-500 to-ochre-500 text-white rounded-xl hover:from-plum-600 hover:to-ochre-600 font-medium shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-lavender-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-charcoal-900">{stat.value}</p>
                    <p className="text-sm text-charcoal-600">{stat.label}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-plum-100 to-ochre-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-plum-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-lavender-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-md border border-lavender-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-charcoal-900">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'active' ? 'bg-green-100 text-green-700' :
                        job.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.type === 'online' ? 'bg-plum-100 text-plum-700' : 'bg-ochre-100 text-ochre-700'
                      }`}>
                        {job.type === 'online' ? 'Remote' : 'On-site'}
                      </span>
                    </div>
                    <p className="text-charcoal-600 mb-2">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-charcoal-500">
                      <span>Salary: {job.salary}</span>
                      {job.location && <span>Location: {job.location}</span>}
                      <span>Applications: {job.applicationsCount || 0}</span>
                      <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleEditJob(job)} title="Edit Job"
                      className="p-2 text-plum-600 hover:bg-plum-100 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button title="View Applications"
                      className="p-2 text-charcoal-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteJob(job.id)} title="Delete Job"
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(job.tags || []).map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-lavender-100 text-lavender-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-lavender-100">
              <Briefcase className="h-16 w-16 text-charcoal-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-charcoal-600 mb-2">No jobs found</h3>
              <p className="text-charcoal-500 mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters.'
                  : 'Start by posting your first job.'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <button
                  onClick={() => setShowJobForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-plum-500 to-ochre-500 text-white rounded-lg hover:from-plum-600 hover:to-ochre-600 transition-all font-medium"
                >
                  Post Your First Job
                </button>
              )}
            </div>
          )}
        </div>

        {/* Job Form Modal */}
        <JobPostingForm
          isOpen={showJobForm}
          onClose={handleCloseForm}
          editJob={editingJob}
        />
      </div>
    </div>
  );
}
