import React, { useState } from 'react';
import { X, Briefcase, MapPin, DollarSign, Calendar, FileText, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Job } from '../../types';

interface JobPostingFormProps {
  isOpen: boolean;
  onClose: () => void;
  editJob?: Job | null;
}

export default function JobPostingForm({ isOpen, onClose, editJob }: JobPostingFormProps) {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: editJob?.title || '',
    description: editJob?.description || '',
    type: editJob?.type || 'online' as 'online' | 'offline',
    location: editJob?.location || '',
    salary: editJob?.salary || '',
    requirements: editJob?.requirements?.join('\n') || '',
    applicationDeadline: editJob?.applicationDeadline || '',
    tags: editJob?.tags?.join(', ') || '',
    status: editJob?.status || 'active' as 'active' | 'draft'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobData: Job = {
      id: editJob?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      location: formData.location,
      salary: formData.salary,
      requirements: formData.requirements.split('\n').filter(req => req.trim()),
      company: state.employer?.companyName || 'Unknown Company',
      datePosted: editJob?.datePosted || new Date().toISOString(),
      applicationDeadline: formData.applicationDeadline,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: formData.status,
      employerId: state.employer?.id,
      applicationsCount: editJob?.applicationsCount || 0
    };

    if (editJob) {
      dispatch({ type: 'UPDATE_JOB', payload: jobData });
    } else {
      dispatch({ type: 'ADD_JOB', payload: jobData });
    }
    
    onClose();
    setFormData({
      title: '',
      description: '',
      type: 'online',
      location: '',
      salary: '',
      requirements: '',
      applicationDeadline: '',
      tags: '',
      status: 'active'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-lavender-200">
          <h2 className="text-2xl font-bold text-charcoal-900">
            {editJob ? 'Edit Job Posting' : 'Post New Job'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-charcoal-600 hover:bg-lavender-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
                  placeholder="e.g., Content Writer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
              >
                <option value="online">Online/Remote</option>
                <option value="offline">Offline/On-site</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">Salary Range</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
                  placeholder="e.g., ₹15,000 - ₹25,000/month"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Location {formData.type === 'offline' && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required={formData.type === 'offline'}
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
                  placeholder="e.g., Hyderabad, Telangana"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">Job Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-charcoal-400" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
                placeholder="Describe the job role, responsibilities, and what you're looking for..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">Requirements (One per line)</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
              placeholder="Good English writing skills&#10;Basic computer knowledge&#10;Internet connection"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">Application Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">Tags (Comma separated)</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
                placeholder="e.g., Writing, Remote, Flexible Hours"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-lavender-300 text-charcoal-700 rounded-lg hover:bg-lavender-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-plum-500 to-ochre-500 text-white rounded-lg hover:from-plum-600 hover:to-ochre-600 transition-all font-medium"
            >
              {editJob ? 'Update Job' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}