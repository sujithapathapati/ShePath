import React, { useState } from 'react';
import { X, Briefcase, MapPin, DollarSign, Calendar, FileText, Tag } from 'lucide-react';
// ✅ Use EmployerContext instead of AppContext
import { useEmployer } from '../../contexts/EmployerContext';
import { Job } from '../../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface JobPostingFormProps {
  isOpen: boolean;
  onClose: () => void;
  editJob?: Job | null;
}

export default function JobPostingForm({ isOpen, onClose, editJob }: JobPostingFormProps) {
  const { state } = useEmployer(); // ✅ FIXED
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: editJob?.title || '',
    description: editJob?.description || '',
    type: (editJob?.type || 'online') as 'online' | 'offline',
    location: editJob?.location || '',
    salary: editJob?.salary || '',
    requirements: editJob?.requirements?.join('\n') || '',
    applicationDeadline: editJob?.applicationDeadline || '',
    tags: editJob?.tags?.join(', ') || '',
    status: (editJob?.status || 'active') as 'active' | 'draft',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      location: formData.location,
      salary: formData.salary,
      requirements: formData.requirements.split('\n').filter(req => req.trim()),
      company: state.employer?.companyName || 'Unknown Company',
      posted_date: new Date().toISOString(),
      application_deadline: formData.applicationDeadline,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      status: formData.status,
      employerId: state.employer?.id, // ✅ CORRECTED CONTEXT
    };

    console.log('Posting job with data:', jobData); // Debug

    try {
      if (editJob) {
        await axios.put(`http://127.0.0.1:8000/api/jobs/${editJob.id}`, jobData);
      } else {
        await axios.post('http://127.0.0.1:8000/api/jobs', jobData);
      }

      setFormData({
        title: '',
        description: '',
        type: 'online',
        location: '',
        salary: '',
        requirements: '',
        applicationDeadline: '',
        tags: '',
        status: 'active',
      });

      onClose();
      navigate('/jobs');
      window.location.reload();

    } catch (error: any) {
      console.error('Failed to post job:', error.response?.data || error.message);
      alert('Error posting job:\n' + JSON.stringify(error.response?.data || error.message));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <InputField icon={<Briefcase />} name="title" label="Job Title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Content Writer" />
            <SelectField name="type" label="Job Type" value={formData.type} onChange={handleInputChange} options={[{ value: 'online', label: 'Online/Remote' }, { value: 'offline', label: 'Offline/On-site' }]} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField icon={<DollarSign />} name="salary" label="Salary Range" value={formData.salary} onChange={handleInputChange} placeholder="e.g., ₹15,000 - ₹25,000/month" />
            <InputField icon={<MapPin />} name="location" label="Location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Hyderabad, Telangana" required={formData.type === 'offline'} />
          </div>

          <TextAreaField icon={<FileText />} name="description" label="Job Description" value={formData.description} onChange={handleInputChange} />
          <TextAreaField name="requirements" label="Requirements (One per line)" value={formData.requirements} onChange={handleInputChange} />

          <div className="grid md:grid-cols-2 gap-4">
            <InputField icon={<Calendar />} name="applicationDeadline" type="date" label="Application Deadline" value={formData.applicationDeadline} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
            <SelectField name="status" label="Status" value={formData.status} onChange={handleInputChange} options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }, { value: 'closed', label: 'Closed' }]} />
          </div>

          <InputField icon={<Tag />} name="tags" label="Tags (Comma separated)" value={formData.tags} onChange={handleInputChange} placeholder="e.g., Writing, Remote, Flexible Hours" />

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-lavender-300 text-charcoal-700 rounded-lg hover:bg-lavender-50 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-plum-500 to-ochre-500 text-white rounded-lg hover:from-plum-600 hover:to-ochre-600 transition-all font-medium">
              {editJob ? 'Update Job' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// InputField component
const InputField = ({ icon, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-charcoal-700 mb-2">{props.label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400">{icon}</div>}
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
      />
    </div>
  </div>
);

// TextAreaField component
const TextAreaField = ({ icon, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-charcoal-700 mb-2">{props.label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-3 h-5 w-5 text-charcoal-400">{icon}</div>}
      <textarea
        {...props}
        className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
        rows={4}
      />
    </div>
  </div>
);

// SelectField component
const SelectField = ({ name, label, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-medium text-charcoal-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);
