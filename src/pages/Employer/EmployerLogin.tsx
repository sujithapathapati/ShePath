import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployer } from '../../contexts/EmployerContext';

const EmployerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');
  const [showPassword, setShowPassword] = useState(false);

  const { loginEmployer } = useEmployer();
  const navigate = useNavigate();

  // ✅ Updated with employer details (including ID)
  const registeredUsers: Record<
    string,
    { password: string; id: string; companyName: string; contactPerson: string }
  > = {
    'nihanaaz2011@gmail.com': {
      password: '123456',
      id: 'emp1',
      companyName: 'Nihan Tech',
      contactPerson: 'Nihanaaz',
    },
    'sujipathapati@gmail.com': {
      password: '123456',
      id: 'emp2',
      companyName: 'Suji Inc',
      contactPerson: 'Suji',
    },
    'krakshita987@gmail.com': {
      password: '123456',
      id: 'emp3',
      companyName: 'Rakshita Pvt Ltd',
      contactPerson: 'Rakshita',
    },
    'rohinikasarapu2110@gmail.com': {
      password: '123456',
      id: 'emp4',
      companyName: 'ShePath',
      contactPerson: 'Rohini',
    },
  };

  const displayMessage = (msg: string, type: 'error' | 'success') => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      displayMessage('Please enter both email and password.', 'error');
      return;
    }

    const employerData = registeredUsers[email];

    if (employerData && employerData.password === password) {
      displayMessage('Sign in successful! Redirecting...', 'success');

      // ✅ Save full employer info in context
      loginEmployer({
  id: employerData.id,
  email,
  companyName: employerData.companyName,
  contactPerson: employerData.contactPerson,
});


      setTimeout(() => navigate('/employer/dashboard'), 1000);
    } else {
      displayMessage('Invalid email or password. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-6">Sign in to your ShePath employer account</p>

        {message && (
          <div
            className={`p-3 rounded text-sm font-medium mb-4 text-center ${
              messageType === 'error'
                ? 'bg-red-100 text-red-600 border border-red-400'
                : 'bg-green-100 text-green-700 border border-green-400'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-3 border rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerLogin;
