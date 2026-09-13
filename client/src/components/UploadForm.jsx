import React, { useState } from 'react';
import api from '../services/api';

const UploadForm = ({ themes, activeThemeSlug }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(activeThemeSlug || '');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedTheme) {
      setMessage('Please select a file and a theme.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('themeSlug', selectedTheme);
    formData.append('caption', caption);

    setUploading(true);
    setProgress(0);
    setMessage('');

    try {
      await api.post('/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });
      setMessage('File uploaded successfully!');
      setFile(null);
      setCaption('');
      // Reset file input UI
      document.getElementById('file-upload').value = '';
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Upload New Media</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Target Theme</label>
          <select
            id="theme"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
            required
          >
            <option value="" disabled>Select a theme...</option>
            {themes.map(t => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">Media will only be shown when this theme is active.</p>
        </div>

        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption (Optional)</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            placeholder="A beautiful moment..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Media File</label>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP, MP4 up to 100MB</p>
            </div>
          </div>
          {file && <p className="mt-2 text-sm text-gray-500">Selected: {file.name}</p>}
        </div>

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        
        {message && (
          <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={uploading || !file || !selectedTheme}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
