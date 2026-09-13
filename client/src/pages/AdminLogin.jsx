import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(username, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* ── Static Brand Header ── */}
      <header className="bg-white shadow-xs border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <img src="/assets/kalees.jpg" alt="Kaleesuwari" className="h-10 object-contain" />
            <div className="hidden sm:block border-l border-gray-200 pl-4">
              <p className="text-sm font-bold text-gray-900 leading-tight">Kaleesuwari Refinery Pvt. Ltd.</p>
              <p className="text-xs text-gray-400">Thoothukudi</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-gray-500">Admin Authentication</span>
        </div>
      </header>

      {/* ── Login Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Card header */}
            <div className="bg-gradient-to-r from-[#cc0000] to-[#e63946] px-8 py-8 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
              <p className="text-red-100 text-sm mt-1">Engineer's Day Media Management</p>
            </div>

            {/* Card body */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}
                
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
                  <input
                    id="username" type="text" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] transition text-sm"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input
                    id="password" type="password" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] transition text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#cc0000] hover:bg-[#b30000] text-white font-bold py-3 rounded-lg shadow-md shadow-red-200 hover:shadow-lg transition-all text-sm"
                >
                  Sign In →
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">Access restricted to authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
